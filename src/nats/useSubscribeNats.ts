import { useEffect } from 'react'

import { NetworkType } from '@/config/networks'
import { SubscriptionGroup, getSubscriptionRequirements, resetSubscription } from '@/nats/subjects'
import { useNatsStore } from '@/store/data/nats'
import useAppSettingsStore from '@/store/ui/settings'

import { NatsManager, SubscriptionRequirement } from './natsManager'

/**
 * @function unsubscribeNats
 * @description This function unsubscribes from a NATS connection.
 * @param natsManager
 * @param network
 * @param page
 */
export const unsubscribeNats = async (natsManager: NatsManager, network: NetworkType, page: SubscriptionGroup) => {
  const requiredSubs: SubscriptionRequirement[] = getSubscriptionRequirements(network, page)
  await natsManager.unsubscribe(requiredSubs)
}

/**
 * @function subscribeNats
 * @description This function subscribes to a NATS connection.
 * @param natsManager
 * @param network
 * @param page
 */
export const subscribeNats = async (natsManager: NatsManager, network: NetworkType, page: SubscriptionGroup) => {
  const requiredSubs: SubscriptionRequirement[] = getSubscriptionRequirements(network, page)

  await natsManager.subscribe(requiredSubs)
}

/**
 * A hook that subscribes to NATS.
 * @param network - The network to subscribe to.
 * @param page - The page for the subscription.
 */
export const useSubscribeNats = (network: NetworkType, page: SubscriptionGroup) => {
  const { checkConnection, natsManager } = useNatsStore()

  useEffect(() => {
    ;(async () => {
      await checkConnection()
      await subscribeNats(natsManager, network, page)
    })()

    return () => {
      ;(async () => {
        if (network.uniqueId !== useAppSettingsStore.getState().network.uniqueId) {
          resetSubscription(page)
        }
        await unsubscribeNats(natsManager, network, page)
      })()
    }
  }, [network, page, checkConnection, natsManager])
}

/**
 * This function subscribes to NATS synchronously.
 * @param network - The network to subscribe to.
 * @param page - The page for the subscription.
 */
export const subscribeNatsSync = (network: NetworkType, page: SubscriptionGroup) => {
  ;(async () => {
    const natsManager = useNatsStore.getState().natsManager
    await subscribeNats(natsManager, network, page)
  })()
}
