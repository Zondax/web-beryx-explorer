/**
 * @module Nats
 * @description This module provides a class for managing NATS connections and subscriptions.
 */
import { debounce } from 'lodash'
import {
  ConnectionOptions as ConnectionOptionsNats,
  Consumer,
  ConsumerCallbackFn,
  DeliverPolicy,
  NatsConnection,
  connect as connectNats,
} from 'nats.ws'

import { confirmDistinctItems } from '@/utils/arrays'
import { addBreadcrumb, captureException } from '@sentry/nextjs'

/**
 * Represents the DeliverPolicy from nats.ws
 * @enum DeliverPolicy
 */
export { DeliverPolicy } from 'nats.ws'
/**
 * Represents the JsMsg and NatsError types from nats.ws
 * @type NatsError
 */
export type { JsMsg, NatsError } from 'nats.ws'

/**
 * Represents the subscription requirements
 * @interface SubscriptionRequirement
 */
export interface SubscriptionRequirement {
  stream: string
  subject: string
  isJetStream: boolean
  deliverPolicy: DeliverPolicy
  handler: ConsumerCallbackFn
}

type Subscription = {
  subject: string
  subscription: Consumer
}

/**
 * This class is used to manage NATS connections and subscriptions.
 * @class NatsManager
 */
export class NatsManager {
  connectionOptions: ConnectionOptionsNats
  connections: NatsConnection[] = []
  subscriptions: Subscription[] = [] // normal and jetstream subcriptions
  subscriptionRequirements: SubscriptionRequirement[] = [] // track subscription and unsubscription requests

  isReconciling = false // flag to avoid running reconcile twice at the same time
  lastConnectionError?: string

  /**
   * The constructor is empty because the class does not require any parameters to be initialized.
   * @constructor
   */
  constructor(connectionOptions: ConnectionOptionsNats) {
    this.connectionOptions = connectionOptions
    this.lastConnectionError = undefined
  }

  /**
   * Connects to NATS
   * Note: Currently, this method does not support handling multiple connections. This is a potential area for future improvements.
   * @method connect
   * @returns The connection status and id
   * @throws {Error} If the connection to NATS could not be established
   */
  connect = async (): Promise<NatsConnection | undefined> => {
    try {
      addBreadcrumb({
        category: 'nats',
        message: 'Connecting',
        level: 'debug',
      })

      const conn = await connectNats(this.connectionOptions)

      addBreadcrumb({
        category: 'nats',
        message: 'Connected',
        level: 'debug',
      })

      this.connections.push(conn)

      // Call reconcile after connecting
      await this.reconcile()

      return conn
    } catch (e: unknown) {
      let message = '[nats] could not connect'

      if (typeof e === 'object' && e !== null && 'message' in e) {
        message += `: ${(e as { message: string }).message}`
      }

      captureException(new Error(message), { extra: { description: message } })
      this.lastConnectionError = message
      return undefined
    }
  }

  /**
   * Closes NATS connections.
   * @returns A promise that resolves when the operation is complete.
   */
  disconnect = async (): Promise<void> => {
    await this.clearSubscriptions()

    // Close connections
    for (const c of this.connections) {
      try {
        await c.close()
      } catch (e) {
        captureException(new Error('The connection could not be closed'), { extra: { description: e } })
      }
    }

    this.connections = []
  }

  /**
   * This method is used to subscribe to multiple channels.
   * If clean is true, the previous subscriptions will be deleted.
   * @method subscribe
   * @param requirements
   */
  subscribe = async (requirements: SubscriptionRequirement[]): Promise<void> => {
    this.subscriptionRequirements = [...this.subscriptionRequirements, ...requirements]
    await this.reconcile()
  }

  /**
   * Unsubscribes from specific channels.
   * @method unsubscribe
   * @param requirements - The array of subscription requirements to unsubscribe from
   */
  unsubscribe = async (requirements: SubscriptionRequirement[]): Promise<void> => {
    requirements.forEach(requirement => {
      this.subscriptionRequirements = this.subscriptionRequirements.filter(s => s.subject !== requirement.subject) // remove unsubscription requests from tracking
    })
    await this.reconcile()
  }

  /**
   * This method is used to create a subscription.
   * @method createSubscription
   * @param conn - The connection to use
   * @param requiredSub - The subscription requirement
   */
  private createSubscription = async (conn: NatsConnection, requiredSub: SubscriptionRequirement) => {
    if (!requiredSub.isJetStream) {
      captureException(new Error('Only JetStream subscriptions are supported'), {
        extra: { subscription: requiredSub },
      })
      return
    }

    try {
      addBreadcrumb({
        category: 'nats',
        message: `Try subscribe: ${requiredSub.subject}`,
        level: 'debug',
      })

      // Check if a subscription for the same subject already exists
      if (this.subscriptions.some(sub => sub.subject === requiredSub.subject)) {
        throw new Error(`Subscription for ${requiredSub.subject} already exists`)
      }

      const newSub = await conn.jetstream().consumers.get(requiredSub.stream, {
        deliver_policy: requiredSub.deliverPolicy,
        filterSubjects: requiredSub.subject,
      })

      this.subscriptions.push({
        subject: requiredSub.subject,
        subscription: newSub,
      })

      await newSub.consume({
        callback: requiredSub.handler,
      })

      addBreadcrumb({
        category: 'nats',
        message: `Subscribed: ${requiredSub.subject}`,
        level: 'debug',
      })
    } catch (e) {
      captureException(new Error(`[nats] cannot create ${requiredSub.subject}`), {
        extra: { subscription: requiredSub, description: e },
      })
      addBreadcrumb({
        category: 'nats',
        message: `[nats] cannot create ${requiredSub.subject}`,
        level: 'error',
      })
    }
  }

  /**
   * This method is used to delete a subscription.
   * @method deleteSubscription
   * @param subscription
   */
  private deleteSubscription = async (subscription: Subscription) => {
    try {
      addBreadcrumb({
        category: 'nats',
        message: `Unsubscribed: ${subscription.subject}`,
        level: 'debug',
        data: subscription,
      })

      await subscription.subscription.delete()

      this.subscriptions = this.subscriptions.filter(s => s !== subscription)
    } catch (e) {
      captureException(new Error(`The subscription could not be closed ${subscription.subject}`), {
        extra: { description: e },
      })
    }
  }

  /**
   * This method is used to reconcile the subscriptions with the requirements.
   * It checks that required subscriptions exist or removes the ones that are not required anymore.
   * This is done for each of the existing connections.
   * @method reconcile
   */
  reconcile = debounce(async () => {
    // Flag to avoid running this twice at the same time
    if (this.isReconciling) {
      return
    }
    this.isReconciling = true
    try {
      // Remove duplicates from the requirements
      this.subscriptionRequirements = confirmDistinctItems(this.subscriptionRequirements, r => r.subject, false)

      for (const connection of this.connections) {
        const currentSubscriptionsSubjects = this.subscriptions.map(sub => sub.subject)

        const subscriptionsToRemove: Subscription[] = []
        const subscriptionsToAdd: SubscriptionRequirement[] = []

        for (const requiredSub of this.subscriptionRequirements) {
          if (!currentSubscriptionsSubjects.includes(requiredSub.subject)) {
            // Add to the list of subscriptions to be created
            subscriptionsToAdd.push(requiredSub)
          }
        }

        for (const currentSub of this.subscriptions) {
          if (!this.subscriptionRequirements.map(req => req.subject).includes(currentSub.subject)) {
            // Add to the list of subscriptions to be removed
            subscriptionsToRemove.push(currentSub)
          }
        }

        await Promise.all(
          subscriptionsToRemove.map(subscription => {
            return this.deleteSubscription(subscription)
          })
        )

        await Promise.all(
          subscriptionsToAdd.map(subReq => {
            return this.createSubscription(connection, subReq)
          })
        )
      }
    } catch (e) {
      captureException(new Error('Error during reconciliation'), {
        extra: { description: e },
      })
    } finally {
      this.isReconciling = false
    }
  }, 300)

  /**
   * This method is used to delete the previous subscriptions.
   * @method clearSubscriptions
   */
  clearSubscriptions = async () => {
    this.subscriptionRequirements = [] // clear tracking when cleaning subscriptions
    await this.reconcile()
  }
}
