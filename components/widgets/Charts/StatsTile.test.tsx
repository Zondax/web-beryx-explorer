import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import StatsTile from './StatsTile'

const mockData = { value: 23232, unit: 'attoFIL' }
const mockDescription = 'mock description'
describe('StatsTile component', () => {
  it('renders with loading status', async () => {
    await renderWithProviders(<StatsTile data={mockData} description={mockDescription} showOriginal={false} />)

    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent(mockData.value.toString())
    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent(mockData.unit.toString())
    expect(screen.getByTestId('stats-tile-description')).toHaveTextContent(mockDescription)
  })

  it('renders with a float value and showOriginal in true', async () => {
    await renderWithProviders(<StatsTile data={{ value: 23232.12143 }} showOriginal />)

    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent('23232.12')
  })

  it('renders with an enter value and showOriginal in true', async () => {
    await renderWithProviders(<StatsTile data={{ value: 23232 }} showOriginal />)

    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent('23232')
  })

  it('renders a float number without unit and showOriginal in false', async () => {
    await renderWithProviders(<StatsTile data={{ value: 232320000.23 }} showOriginal={false} />)

    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent(/^232.32M$/)
  })

  it('renders a float number without unit and showOriginal in false', async () => {
    await renderWithProviders(<StatsTile data={{ value: 2320.2386 }} showOriginal={false} />)

    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent(/^2.32K$/)
  })

  it('renders a float number with unit and showOriginal in false', async () => {
    await renderWithProviders(<StatsTile data={{ value: 2320.2386, unit: 'attoFil' }} showOriginal={false} />)

    expect(screen.getByTestId('stats-tile-container')).toHaveTextContent(/^2320.24attoFil$/)
  })
})
