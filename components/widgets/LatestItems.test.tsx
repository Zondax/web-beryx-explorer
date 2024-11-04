import { act } from 'react'

import { Networks } from '@/config/networks'
import { renderWithProviders } from '@/helpers/jest-react'
import { useLatestStore } from '@/store/data/latest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LatestItems from './LatestItems'

// Start tests for LatestItems component
describe('LatestItems', () => {
  test('renders LatestItems correctly', async () => {
    // Renders the LatestItems component passing the mock router and store
    await renderWithProviders(<LatestItems />)

    // Asserts that certain elements appear correctly in the document
    expect(screen.getByRole('heading', { name: /Latest Tipsets and Transactions/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Go to Recent Activity/i })).toBeInTheDocument()

    // Simulates a user clicking on an element
    await act(async () => {
      await userEvent.click(screen.getByRole('tab', { name: /Latest Tipsets/i }))
    })

    expect(screen.getByRole('link', { name: /View More/i })).toBeInTheDocument()

    // Simulates a user clicking on another element
    await act(async () => {
      await userEvent.click(screen.getByRole('tab', { name: /Latest Transactions/i }))
    })
  })

  test('mocks tipsets in the search store and checks their presence', async () => {
    const mocks = {
      latestTipsets: [
        {
          base_fee: 100,
          blocks_cid: ['bafy2bzaced6cgpsepl5zwc3v5ui52ouae5gfpip4jd7vlrd663d7vdflxlhfs'],
          blocks_info: [],
          canonical: false,
          height: 3659557,
          id: '2403b62f-968b-52b7-a866-c0d9e047266e',
          parent_tipset_cid: 'bafy2bzaceaagcd3ruus6il3ek76jdwbusnsyae6y2qo2ymwkoqt37s3evdqpe',
          tipset_cid: 'bafy2bzacectzxxwbeldma4vdm3fs7mo6ojpxyg7uzhduadk7kelyy5lgg46te',
          tipset_timestamp: '2024-02-16T14:18:30Z',
        },
      ],
      latestTransactions: [],
      latestContracts: [],
    }

    useLatestStore.getState().setNatsLatestTipsets(mocks.latestTipsets, Networks.mainnet)
    useLatestStore.getState().setNatsLatestTransactions(mocks.latestTransactions, Networks.mainnet)
    useLatestStore.getState().setNatsLatestContracts(mocks.latestContracts, Networks.mainnet)

    await renderWithProviders(<LatestItems />)

    // Check that the tabs for Latest Tipsets and Latest Transactions are present
    expect(screen.getByRole('tab', { name: /Latest Tipsets/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /Latest Transactions/i })).toBeInTheDocument()
  })
})
