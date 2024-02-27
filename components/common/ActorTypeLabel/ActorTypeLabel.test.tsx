import React from 'react'

import { renderWithProviders } from '@/helpers/jest-react'
import { getThemeOptions } from '@/theme/theme'
import { createTheme } from '@mui/material'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import ActorTypeLabel from './ActorTypeLabel'
import { actorTypeColor } from './MethodDefinitions'

const theme = createTheme(getThemeOptions('light'))

/**
 * Test suite for ActorTypeLabel component
 */
describe('ActorTypeLabel', () => {
  /**
   * Test if the label text is rendered correctly
   */
  it('renders the label text', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" />)

    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  /**
   * Test if the default level is applied for the background color
   */
  it('renders with default level', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" />)

    const gridElement = screen.getByTestId('actor-type-label-grid')
    expect(gridElement).toHaveStyle(`background-color: ${theme.palette.background.level2}`)
  })

  /**
   * Test if the specified level is applied for the background color
   */
  it('renders with specified level', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" level={2} />)

    const gridElement = screen.getByTestId('actor-type-label-grid')
    expect(gridElement).toHaveStyle(`background-color: ${theme.palette.tableBorder}`)
  })

  /**
   * Test if the level 3 is applied for the background color
   */
  it('renders with level 3', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" level={3} />)

    const gridElement = screen.getByTestId('actor-type-label-grid')
    expect(gridElement).toHaveStyle(`background-color: ${theme.palette.tableParentRowBackgroundFocused}`)
  })

  /**
   * Test if the negative level is applied for the background color
   */
  it('renders with negative level', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" level={-1} />)
  })

  /**
   * Test if the text color matches the color corresponding to the label
   */
  it('renders with label color', () => {
    renderWithProviders(<ActorTypeLabel label="Test Label" />)

    const labelElement = screen.getByText('Test Label')
    expect(labelElement).toHaveStyle(`color: ${actorTypeColor(theme.palette.mode, 'Test Label')}`)
  })
})
