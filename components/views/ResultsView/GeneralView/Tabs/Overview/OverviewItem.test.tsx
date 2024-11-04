import { renderWithProviders } from '@/helpers/jest-react'
import { GasStationFilled } from '@carbon/icons-react'
import { screen } from '@testing-library/react'

import OverviewItem from './OverviewItem'

describe('OverviewItem', () => {
  const label = 'Test Label'
  const content = 'Test Content'
  const icon = <GasStationFilled width={16} height={16} color={'#f00'} data-testid={'overview-item-icon'} />

  it('should render the label, content, and icon correctly', async () => {
    await renderWithProviders(<OverviewItem label={label} content={content} icon={icon} />)

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText(content)).toBeInTheDocument()
    expect(screen.getByTestId('overview-item-icon')).toBeInTheDocument()
  })

  it('should render the label and "-" if the content is undefined', async () => {
    const label = 'Test Label'
    const localContent = undefined

    await renderWithProviders(<OverviewItem label={label} icon={icon} content={localContent} />)

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
  })

  it('should render a loading spinner if isLoading is true', async () => {
    const isLoading = true

    await renderWithProviders(<OverviewItem label={label} isLoading={isLoading} content={content} />)

    expect(screen.getByTestId('overview-item-loading-spinner')).toBeInTheDocument()
  })

  it('should render a tooltip icon if the description is defined', async () => {
    const label = 'Test Label'
    const description = 'Test Description'

    await renderWithProviders(<OverviewItem label={label} description={description} content={content} />)

    expect(screen.getByTestId('overview-item-tooltip')).toBeInTheDocument()
  })

  it('should render only the label if the content is undefined and isLoading is false', async () => {
    const label = 'Test Label'

    await renderWithProviders(<OverviewItem label={label} content={content} />)

    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.queryByText('-')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })

  it('should render only the icon if the content is undefined and isLoading is false', async () => {
    await renderWithProviders(<OverviewItem icon={icon} label={label} content={content} />)

    expect(screen.queryByText('-')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
    expect(screen.getByTestId('overview-item-icon')).toBeInTheDocument()
  })
})
