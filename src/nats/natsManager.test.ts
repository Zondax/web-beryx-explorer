import { act } from 'react'

import { advanceTimersByTimeHelper } from '@/helpers/jest'
import { DEBOUNCE_TIME } from '@/store/data/mempool'

import { DeliverPolicy, NatsManager, SubscriptionRequirement } from './natsManager'

jest.useFakeTimers()

// Mocking the 'nats.ws' module
jest.mock('lodash/debounce', () => jest.fn(fn => fn))
jest.mock('nats.ws', () => ({
  connect: jest.fn().mockReturnValue({
    jetstream: jest.fn().mockReturnValue({
      consumers: {
        get: jest.fn().mockReturnValue({
          consume: jest.fn(),
          delete: jest.fn(),
        }),
      },
    }),
  }),
}))

describe('NatsManager', () => {
  let natsManager: NatsManager

  beforeEach(() => {
    jest.clearAllMocks()
    natsManager = new NatsManager({ servers: 'nats://localhost:4222' })
  })

  it('should subscribe and unsubscribe correctly', async () => {
    const requirements: SubscriptionRequirement[] = [
      {
        subject: 'test',
        stream: 'streamTest',
        isJetStream: true,
        deliverPolicy: 'last' as DeliverPolicy,
        handler: jest.fn(),
      },
    ]
    await natsManager.subscribe(requirements)
    expect(natsManager.subscriptionRequirements).toContainEqual(requirements[0])

    await natsManager.unsubscribe(requirements)
    expect(natsManager.subscriptionRequirements).not.toContainEqual(requirements[0])
  })

  // Clears all subscriptions correctly

  it('should clear all subscriptions correctly', async () => {
    const requirements: SubscriptionRequirement[] = [
      {
        subject: 'test',
        stream: 'streamTest',
        isJetStream: true,
        deliverPolicy: 'last' as DeliverPolicy,
        handler: jest.fn(),
      },
    ]
    await natsManager.subscribe(requirements)
    expect(natsManager.subscriptionRequirements).toContainEqual(requirements[0])

    await natsManager.clearSubscriptions()
    expect(natsManager.subscriptionRequirements).toEqual([])
  })

  it('should only add unique subscriptions', async () => {
    const requirements: SubscriptionRequirement[] = [
      {
        subject: 'test',
        stream: 'streamTest',
        isJetStream: true,
        deliverPolicy: 'last' as DeliverPolicy,
        handler: jest.fn(),
      },
    ]
    await natsManager.subscribe(requirements)
    await natsManager.subscribe(requirements)

    // keep in mind that the store is debounced
    act(() => {
      advanceTimersByTimeHelper(DEBOUNCE_TIME * 2)
    })

    expect(natsManager.subscriptionRequirements).toEqual(requirements)
  })

  it('should only contain the correct subscriptions', async () => {
    const firstRequirement: SubscriptionRequirement = {
      subject: 'test1',
      stream: 'streamTest',
      isJetStream: true,
      deliverPolicy: 'last' as DeliverPolicy,
      handler: jest.fn(),
    }
    const secondRequirement: SubscriptionRequirement = {
      subject: 'test2',
      stream: 'streamTest',
      isJetStream: true,
      deliverPolicy: 'last' as DeliverPolicy,
      handler: jest.fn(),
    }

    await natsManager.connect()

    await natsManager.subscribe([firstRequirement])
    expect(natsManager.subscriptionRequirements).toContainEqual(firstRequirement)
    expect(natsManager.subscriptions.map(sub => sub.subject)).toContain(firstRequirement.subject)

    await natsManager.unsubscribe([firstRequirement])
    expect(natsManager.subscriptionRequirements).not.toContainEqual(firstRequirement)
    expect(natsManager.subscriptions.map(sub => sub.subject)).not.toContain(firstRequirement.subject)

    await natsManager.subscribe([secondRequirement])
    expect(natsManager.subscriptionRequirements).toContainEqual(secondRequirement)
    expect(natsManager.subscriptions.map(sub => sub.subject)).toContain(secondRequirement.subject)
    expect(natsManager.subscriptionRequirements).not.toContainEqual(firstRequirement)
    expect(natsManager.subscriptions.map(sub => sub.subject)).not.toContain(firstRequirement.subject)
  })
})
