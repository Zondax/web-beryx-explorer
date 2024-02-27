import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

import NoRows from './NoRows'

describe('NoRows', () => {
  it('should render correctly', async () => {
    // Act
    await renderWithProviders(<NoRows text="someText" position="center" />)

    // Assert
    expect(screen.getByText('someText')).toBeInTheDocument()
    expect(screen.getByText('someText')).toHaveStyle('text-align: center')
  })
})
