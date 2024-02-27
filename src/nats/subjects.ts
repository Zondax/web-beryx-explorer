import { NetworkType, Networks } from '@/config/networks'
import { useLatestStore } from '@/store/data/latest'
import { useMempoolStore } from '@/store/data/mempool'
import { addBreadcrumb } from '@sentry/nextjs'

import { DeliverPolicy, JsMsg, SubscriptionRequirement } from './natsManager'

// @deprecated This is too coupled with the UI
// The base Subscription Group is related to the essential subscriptions required for all pages.
export type SubscriptionGroup = 'home' | 'mempool' | 'recent_activity' | 'base'

/**
 * Enum for MempoolSubjects
 * @readonly
 * @enum {string}
 */
export const Subjects = {
  MEMPOOL_SNAPSHOT: 'data.fil.*network*.mempool.main.snapshot',
  MEMPOOL_STATISTICS: 'data.fil.*network*.mempool.main.statistics',
  MEMPOOL_ADD_ITEM: 'data.fil.*network*.mempool.main.add',
  MEMPOOL_DELETE_ITEM: 'data.fil.*network*.mempool.main.del',
  MEMPOOL_MISSING_ITEM: 'data.fil.*network*.mempool.main.miss',
  LATEST_10_TRANSACTIONS: 'push.fil.*network*.notifier.main.txs.recent.10',
  LATEST_10_TIPSETS: 'push.fil.*network*.notifier.main.tipsets.recent.10',
  LATEST_10_INVOKES: 'push.fil.*network*.notifier.main.invokes.recent.10',
  LATEST_500_INVOKES: 'push.fil.*network*.notifier.main.invokes.recent.500',
  LATEST_500_TRANSACTIONS: 'push.fil.*network*.notifier.main.txs.recent.500',
  LATEST_500_CANONICAL_TIPSETS: 'push.fil.*network*.notifier.main.tipsets.canonical.500',
  LATEST_500_TIPSETS: 'push.fil.*network*.notifier.main.tipsets.recent.500',
  LATEST_CURRENCY_RATES: 'push.fil.mainnet.notifier.main.currency.rates',
}

export const StreamNames = {
  MEMPOOL: 'data_fil_*network*_mempool_main',
  LATEST: 'push_fil_*network*_notifier_main',
}

/**
 * Prehandles NATS messages.
 * @param handler - The handler function to process the message.
 * @returns A function that takes an error and a message, and processes the message with the handler if it exists.
 */
export const prehandleNATSMessage =
  <T>(handler: (msg: T, network?: NetworkType) => void, network?: NetworkType) =>
  (msg: JsMsg | null) => {
    if (msg) {
      addBreadcrumb({
        category: 'data',
        message: `${msg?.subject}`,
        level: 'debug',
      })

      handler(msg.json<T>(), network)
      msg.ack()
    }
  }

/**
 * Get subscription requirements
 * @param network
 * @param page - The page to get subscription requirements for
 * @returns Subscription requirements
 */
export function getSubscriptionRequirements(network: NetworkType, page: SubscriptionGroup): SubscriptionRequirement[] {
  switch (page) {
    case 'home':
      return [
        {
          subject: Subjects.LATEST_10_TRANSACTIONS.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestTransactions, network),
        },
        {
          subject: Subjects.LATEST_10_TIPSETS.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestTipsets, network),
        },
        {
          subject: Subjects.LATEST_10_INVOKES.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestContracts, network),
        },
      ]
    case 'mempool':
      return [
        {
          subject: Subjects.MEMPOOL_SNAPSHOT.replace('*network*', network.name),
          stream: StreamNames.MEMPOOL.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useMempoolStore.getState().updateSnapshot, network),
        },
        {
          subject: Subjects.MEMPOOL_ADD_ITEM.replace('*network*', network.name),
          stream: StreamNames.MEMPOOL.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useMempoolStore.getState().addItem, network),
        },
        {
          subject: Subjects.MEMPOOL_DELETE_ITEM.replace('*network*', network.name),
          stream: StreamNames.MEMPOOL.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useMempoolStore.getState().removeItem, network),
        },
        {
          subject: Subjects.MEMPOOL_MISSING_ITEM.replace('*network*', network.name),
          stream: StreamNames.MEMPOOL.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useMempoolStore.getState().updateItem, network),
        },
        {
          subject: Subjects.MEMPOOL_STATISTICS.replace('*network*', network.name),
          stream: StreamNames.MEMPOOL.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useMempoolStore.getState().setStatistics, network),
        },
        {
          subject: Subjects.LATEST_10_TIPSETS.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestTipsets, network),
        },
      ]
    case 'recent_activity':
      return [
        {
          subject: Subjects.LATEST_500_TRANSACTIONS.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestTransactions, network),
        },
        {
          subject: Subjects.LATEST_500_TIPSETS.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestTipsets, network),
        },
        {
          subject: Subjects.LATEST_500_CANONICAL_TIPSETS.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestCanonicalTipsets, network),
        },
        {
          subject: Subjects.LATEST_500_INVOKES.replace('*network*', network.name),
          stream: StreamNames.LATEST.replace('*network*', network.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestContracts, network),
        },
      ]
    case 'base':
      return [
        {
          subject: Subjects.LATEST_CURRENCY_RATES,
          stream: StreamNames.LATEST.replace('*network*', Networks.mainnet.name),
          isJetStream: true,
          deliverPolicy: DeliverPolicy.Last,
          handler: prehandleNATSMessage(useLatestStore.getState().setNatsLatestCurrencyRates),
        },
      ]
    default:
      return []
  }
}

/**
 * Resets the subscriptions and associated state for the specified page in the SubscriptionGroup.
 *
 * @param page - The page within the SubscriptionGroup for which subscriptions and state need to be reset.
 */
export function resetSubscription(page: SubscriptionGroup): void {
  switch (page) {
    case 'home':
      useLatestStore.getState().reset({ latestTransactions: [], latestTipsets: [], latestContracts: [] })
      break
    case 'mempool':
      useLatestStore.getState().reset({ latestTipsets: [] })
      useMempoolStore.getState().reset()
      break
    case 'recent_activity':
      useLatestStore.getState().reset({ latestTransactions: [], latestTipsets: [], latestContracts: [] })
      break
    case 'base':
      useLatestStore.getState().reset({ latestCurrencyRates: [] })
      break
    default:
      return
  }
}
