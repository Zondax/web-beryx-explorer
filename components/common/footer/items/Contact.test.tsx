import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import Contact from './Contact'

/*
 * Test suit for Contact component
 */
describe('<Contact />', () => {
  /*
   * Test if Contact component can be rendered without crashing.
   */
  it('renders without crashing', async () => {
    await renderWithProviders(<Contact />)
  })

  /*
   * Test to check if the Contact component contains the expected copyright text.
   */
  it('contains the expected copyright text', async () => {
    const currentYear = new Date().getFullYear().toString()
    await renderWithProviders(<Contact />)
    const copyrightText = screen.getByText(`©${currentYear} Zondax AG`)
    // Check if the expected text is in the document
    expect(copyrightText).toBeInTheDocument()
  })

  /*
   * Test to verify if the Contact component renders the correct contact email link.
   */
  it('renders the correct contact email link', async () => {
    await renderWithProviders(<Contact />)
    const contactLink = screen.getByText('beryx@zondax.ch')
    // Check if the link is in the document
    expect(contactLink).toBeInTheDocument()
    // Check if the contactLink has the expected href attribute
    expect(contactLink.closest('a')).toHaveAttribute('href', 'mailto:beryx@zondax.ch')
  })
})
