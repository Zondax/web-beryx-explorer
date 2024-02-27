import { LoadingStatus } from '@/config/config'
import { renderWithProviders } from '@/helpers/jest-react'
import { Typography } from '@mui/material'
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ItemTile from './ItemTile'

const titleMock = 'title mock'
describe('ItemTile component', () => {
  it('renders with loading status', async () => {
    await renderWithProviders(
      <ItemTile title={titleMock} loading={LoadingStatus.Loading}>
        40
      </ItemTile>
    )

    expect(screen.getByTestId('item-tile-heading')).toBeVisible()
    expect(screen.getByTestId('item-tile-heading')).toHaveTextContent(titleMock)
    expect(screen.getByTestId('loading-view-text')).toBeVisible()
  })

  it('renders with error status', async () => {
    await renderWithProviders(
      <ItemTile title={titleMock} loading={LoadingStatus.Error}>
        40
      </ItemTile>
    )
    expect(screen.getByTestId('item-tile-heading')).toBeVisible()
    expect(screen.getByTestId('item-tile-heading')).toHaveTextContent(titleMock)
    expect(screen.getByTestId('item-tile-no-information')).toBeVisible()
    expect(screen.getByTestId('item-tile-no-information')).toHaveTextContent("We couldn't find the data. Please try later.")
  })

  it('renders with success status', async () => {
    await renderWithProviders(
      <ItemTile title={titleMock} loading={LoadingStatus.Success}>
        <Typography variant={'subtitle2'} data-testid={'description'}>
          mock description
        </Typography>
      </ItemTile>
    )
    expect(screen.getByTestId('item-tile-heading')).toBeVisible()
    expect(screen.getByTestId('item-tile-heading')).toHaveTextContent(titleMock)
    expect(screen.getByTestId('description')).toBeVisible()
    expect(screen.getByTestId('description')).toHaveTextContent('mock description')
  })

  it('renders download icon', async () => {
    await renderWithProviders(
      <ItemTile title={titleMock} loading={LoadingStatus.Success} downloadIcon>
        <Typography variant={'subtitle2'} data-testid={'description'}>
          mock description
        </Typography>
      </ItemTile>
    )
    expect(screen.getByTestId('item-tile-heading')).toBeVisible()
    expect(screen.getByTestId('item-tile-heading')).toHaveTextContent(titleMock)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Download')
  })

  it('render range actions', async () => {
    const mockAction = jest.fn()

    await renderWithProviders(
      <ItemTile title={titleMock} loading={LoadingStatus.Success} selectorAction={mockAction}>
        <Typography variant={'subtitle2'} data-testid={'description'}>
          mock description
        </Typography>
      </ItemTile>
    )
    expect(screen.getByTestId('item-tile-heading')).toBeVisible()
    expect(screen.getByTestId('item-tile-heading')).toHaveTextContent(titleMock)
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('value', 'seven_days')
    expect(screen.getAllByRole('button')[1]).toHaveAttribute('value', 'thirty_days')
    expect(screen.getAllByRole('button')[2]).toHaveAttribute('value', 'one_year')
    expect(screen.getAllByRole('button')[3]).toHaveAttribute('value', 'all')

    await act(async () => {
      await userEvent.click(screen.getAllByRole('button')[0])
    })

    expect(mockAction).toHaveBeenCalled()
  })
})
