import TermsOfServiceController from 'pages/terms-of-service'

import { renderWithProviders } from '@/helpers/jest-react'
import { screen } from '@testing-library/react'

describe('Terms Of Service Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<TermsOfServiceController />)
    const articleView = screen.getByTestId('article-view')
    expect(articleView).toBeInTheDocument()
  })
})
