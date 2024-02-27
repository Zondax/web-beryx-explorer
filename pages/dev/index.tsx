import { NatsConnection } from 'nats.ws'
import { useEffect, useState } from 'react'

import { Networks } from '@/config/networks'
import { useSubscribeNats } from '@/nats/useSubscribeNats'
import { useNatsStore } from '@/store/data/nats'
import { NoSsr } from '@mui/base'
import { Grid } from '@mui/material'

/**
 * This is a development only page.
 * Not every field is updated automatically via the store
 */
export default function DevOnlyPage() {
  const { natsManager, getConnections, ...nats } = useNatsStore(s => s)

  useSubscribeNats(Networks.mainnet, 'home')

  /**
   * ConnectionInfo component displays the connection information.
   * @param props - The properties object
   * @param props.connection - The NATS connection
   * @returns The ConnectionInfo component
   */

  const ConnectionInfo = ({ connection }: { connection: NatsConnection }) => {
    if (!connection?.info) {
      return <pre>Empty</pre>
    }
    return <pre style={{ fontSize: 'small' }}>Info: {JSON.stringify(connection.info, null, 2)}</pre>
  }

  /**
   * useConnectionStats is a custom hook that provides the connection stats.
   * @param connection - The NATS connection
   * @returns The connection stats
   */
  const useConnectionStats = (connection: NatsConnection) => {
    const [stats, setStats] = useState(connection?.stats())

    useEffect(() => {
      const interval = setInterval(() => {
        setStats(connection?.stats())
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }, [connection])

    return stats
  }

  /**
   * ConnectionStats component displays the connection stats.
   * @param props - The properties object
   * @param props.connection - The NATS connection
   * @returns The ConnectionStats component
   */
  const ConnectionStats = ({ connection }: { connection: NatsConnection }) => {
    const stats = useConnectionStats(connection)

    if (!stats) {
      return <pre>No Stats</pre>
    }
    return <pre style={{ fontSize: 'small' }}>Stats: {JSON.stringify(stats, null, 2)}</pre>
  }

  /**
   * Subscriptions component displays the subscriptions.
   * @returns The Subscriptions component or null
   */
  const Subscriptions = () => {
    if (!natsManager.subscriptions) {
      return null
    }

    return <pre style={{ fontSize: 'small' }}>Subscribed: {JSON.stringify(Object.keys(natsManager.subscriptions), null, 2)}</pre>
  }

  /**
   * SubscriptionRequirements component displays the subscription requirements.
   * @returns The SubscriptionRequirements component or null
   */
  const SubscriptionRequirements = () => {
    if (!natsManager.subscriptionRequirements) {
      return null
    }

    return (
      <pre style={{ fontSize: 'small' }}>
        Required:{' '}
        {JSON.stringify(
          natsManager.subscriptionRequirements.map(req => req.subject),
          null,
          2
        )}
      </pre>
    )
  }

  return (
    <div>
      <h1>[dev] NATS</h1>
      <NoSsr fallback={<div>Loading...</div>}>
        <p>Status: {nats.status}</p>
        <Grid container spacing={2}>
          {getConnections().map(connection => (
            <>
              <Grid item xs={4}>
                <ConnectionInfo connection={connection} />
              </Grid>
              <Grid item xs={4}>
                <ConnectionStats connection={connection} />
                <Subscriptions />
                <SubscriptionRequirements />
              </Grid>
              <Grid item xs={4}>
                <div>Placeholder</div>
              </Grid>
            </>
          ))}
        </Grid>
      </NoSsr>
    </div>
  )
}
