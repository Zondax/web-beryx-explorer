import { act } from 'react'

import { Networks } from '@/config/networks'
import { hookHelper } from '@/helpers/jest'
import { renderWithProviders } from '@/helpers/jest-react'
import { ObjectType } from '@/routes/parsing'
import { useLatestStore } from '@/store/data/latest'
import { useSearchStore } from '@/store/data/search'
import { screen } from '@testing-library/react'

import { SearchItemType } from '../ResultsView/GeneralView/types'
import NotFoundView from './NotFoundView'

beforeEach(() => {
  const searchStore = hookHelper(useSearchStore)
  const latestStore = hookHelper(useLatestStore)

  act(() => {
    searchStore().setSearchInputNetwork(Networks.calibraiton)
    searchStore().setSearchInputValue('test')
    searchStore().setSearchItemType(SearchItemType.ADDRESS)
    searchStore().setSearchType(ObjectType.ADDRESS)
    searchStore().setFoundInAnotherNetwork(false)
    latestStore().setNatsLatestTipsets([{ height: '3213175' }], Networks.mainnet)
  })
})

/**
 * Test suite for NotFoundView component.
 */
describe('NotFoundView', () => {
  /**
   * Test case: should render NotFoundView component.
   * Testing library (React Testing Library) utility methods are used for rendering and assertions.
   */
  it('should render ', async () => {
    await renderWithProviders(<NotFoundView />)
    const title = screen.getByTestId('title-not-found-view')
    expect(title).toBeDefined()
  })
})
