import { Networks } from '@/config/networks'
import { renderWithProviders } from '@/helpers/jest-react'
import { newDateFormat } from '@/utils/dates'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import TransactionTile from './TransactionTile'

const network = Networks.mainnet

const mempoolTx = {
  first_seen: '2023-08-31T09:37:17.470585574Z',
  last_seen: '2023-08-31T09:37:17.539952121Z',
  deleted_at: '0001-01-01T00:00:00Z',
  nonce: 4119,
  amount: '0',
  gas_fee_cap: 115917495,
  gas_premium: 931366,
  gas_limit: 1290138810,
  method_name: 'Send',
  method: 0,
  tx_cid: 'bafy2bzacea5mumxjol6gw2svcyrxaeu4du4rjnp7tiz4fm76gb3jyqwrl6232',
  tx_from: 'f3rezf4yoymxuwkmfmlkrkbsvwutu2cfcpbbfivvasu6igz4cxw5lg4g2q6hcb4kv3ty3uoqv7u2vwcwaploiq',
  tx_to: 'f05',
  id: '0',
}

const incomingTx = {
  amount: 0,
  block_cid: 'bafy2bzaceawbehreu3okpdf67wk2th4aqqxfpz4p2z5xbc2cmoeoh54pkcgxo',
  canonical: false,
  gas_used: 592410436,
  height: 3172274,
  id: '0a20ee32-def1-5831-bd2e-dfd4820c5c53',
  level: 0,
  parent_id: '00000000-0000-0000-0000-000000000000',
  search_id:
    'MzE3MjI3NC9iYWZ5MmJ6YWNlYjc1cDU1bjdwZW1sNGFhY3I2eHZrbGNmc2JlN3RvdHB4ZXNvZWtqa3pyY3luaTVicTdvYy9iYWZ5MmJ6YWNlYXdiZWhyZXUzb2twZGY2N3drMnRoNGFxcXhmcHo0cDJ6NXhiYzJjbW9lb2g1NHBrY2d4by9iYWZ5MmJ6YWNlZHprd3kzd2tuNHBvcG52M3JqMjZleWpra3BneHplMjY0dG9rZGVmdnoyejV3ajdiZXI3eS8wYTIwZWUzMi1kZWYxLTU4MzEtYmQyZS1kZmQ0ODIwYzVjNTM=',
  status: 'Ok',
  tipset_cid: 'bafy2bzaceb75p55n7peml4aacr6xvklcfsbe7totpxesoekjkzrcyni5bq7oc',
  tx_cid: 'bafy2bzacedzkwy3wkn4popnv3rj26eyjkkpgxze264tokdefvz2z5wj7ber7y',
  tx_from: 'f02359290',
  tx_timestamp: '2023-08-31T09:37:00Z',
  tx_to: 'f05',
  tx_type: 'PublishStorageDeals',
}

const outgoingTx = {
  amount: 0,
  block_cid: 'bafy2bzacedrsz6bztkqtmenie3tv73cpzgtv3hk6qpwltuwilkg3jcr6wicge',
  canonical: false,
  gas_used: 5185829453,
  height: 3172275,
  id: '45403df2-df68-5cdb-b291-20b3b9671b79',
  level: 0,
  parent_id: '00000000-0000-0000-0000-000000000000',
  search_id:
    'MzE3MjI3NS9iYWZ5MmJ6YWNlYzdpbGNwZGpkNmlwc29qZmxyeW52d3g1ZjU0cmo0YWFtZWh1NHZpN253ZHg3YzJid3N0Zy9iYWZ5MmJ6YWNlZHJzejZienRrcXRtZW5pZTN0djczY3B6Z3R2M2hrNnFwd2x0dXdpbGtnM2pjcjZ3aWNnZS9iYWZ5MmJ6YWNlZHYzdGVtNjVyZGdrNTU1NGJjY21qYXYyeDZubnp5d2p2Z3V3cnl3ZGt6dGRoa2Ztc3B0eS80NTQwM2RmMi1kZjY4LTVjZGItYjI5MS0yMGIzYjk2NzFiNzk=',
  status: 'Ok',
  tipset_cid: 'bafy2bzacec7ilcpdjd6ipsojflrynvwx5f54rj4aamehu4vi7nwdx7c2bwstg',
  tx_cid: 'bafy2bzacedv3tem65rdgk5554bccmjav2x6nnzywjvguwrywdkztdhkfmspty',
  tx_from: 'f02249152',
  tx_timestamp: '2023-08-31T09:37:30Z',
  tx_to: 'f05',
  tx_type: 'PublishStorageDeals',
}

describe('TransactionTile', () => {
  it('renders correctly when status is mempool', async () => {
    await renderWithProviders(
      <TransactionTile
        type={'mempool'}
        status={'mempool'}
        hash={mempoolTx.tx_cid}
        amount={mempoolTx.amount}
        unit={'FIL'}
        direction={'from'}
        method={mempoolTx.method_name}
        timestamp={mempoolTx.first_seen}
        network={network}
      />
    )
    expect(screen.getByText('bafy2bza...qwrl6232')).toBeInTheDocument()
    expect(screen.getByText(`${newDateFormat(mempoolTx.first_seen, undefined, false)}`)).toBeInTheDocument()
    expect(screen.getByText(`• ${mempoolTx.method_name}`)).toBeInTheDocument()
    expect(screen.getByText('-0.00 FIL')).toBeInTheDocument()
  })

  it('renders correctly when direction is to', async () => {
    await renderWithProviders(
      <TransactionTile
        type={'receive'}
        status={incomingTx.status}
        hash={incomingTx.tx_cid}
        amount={incomingTx.amount.toString()}
        unit={'FIL'}
        direction={'to'}
        method={incomingTx.tx_type}
        timestamp={incomingTx.tx_timestamp}
        network={network}
      />
    )

    expect(screen.getByText('bafy2bza...wj7ber7y')).toBeInTheDocument()
    expect(screen.getByText(`${newDateFormat(incomingTx.tx_timestamp, undefined, false)}`)).toBeInTheDocument()
    expect(screen.getByText(`• ${incomingTx.tx_type}`)).toBeInTheDocument()
    expect(screen.getByText('+0.00 FIL')).toBeInTheDocument()
  })

  it('renders correctly when direction is from', async () => {
    await renderWithProviders(
      <TransactionTile
        type={'send'}
        status={outgoingTx.status}
        hash={outgoingTx.tx_cid}
        amount={outgoingTx.amount.toString()}
        unit={'FIL'}
        direction={'from'}
        method={outgoingTx.tx_type}
        timestamp={outgoingTx.tx_timestamp}
        network={network}
      />
    )
    expect(screen.getByText('bafy2bza...hkfmspty')).toBeInTheDocument()
    expect(screen.getByText(`${newDateFormat(incomingTx.tx_timestamp, undefined, false)}`)).toBeInTheDocument()
    expect(screen.getByText(`• ${outgoingTx.tx_type}`)).toBeInTheDocument()
    expect(screen.getByText('-0.00 FIL')).toBeInTheDocument()
  })
})
