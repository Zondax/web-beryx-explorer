import { renderWithProviders } from '@/helpers/jest-react'
import { Button } from '@mui/material'
import { fireEvent, screen } from '@testing-library/react'

import BannerTile from './BannerTile'

const mockAction = jest.fn()
describe('BannerTile', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(
      <BannerTile
        id={'banner-tile'}
        title={'title'}
        description={['description']}
        buttons={
          <Button variant={'contained'} size="medium" onClick={mockAction} data-testid={'button-id'}>
            Switch network
          </Button>
        }
        image={'calibration.svg'}
        flag={'news'}
      />
    )

    expect(screen.getByText('title')).toBeInTheDocument()
    expect(screen.getByText('description')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('data-testid', 'button-id')
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'banner-tile example')

    fireEvent.click(screen.getByRole('button'))

    expect(mockAction).toHaveBeenCalled()
  })
})
