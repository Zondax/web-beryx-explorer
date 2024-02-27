import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { StepsParams } from '../config'
import { Tutorial } from './Tutorial'

/**
 * Tests to verify the functionality of Tutorial component
 **/
describe('Tutorial Component', () => {
  // Declare steps to be used throughout the tests
  const steps: StepsParams[] = [
    {
      label: 'Step 1',
      description: 'This is step 1',
      options: [
        {
          label: 'Option 1',
          description: 'This is option 1',
        },
      ],
    },
    {
      label: 'Step 2',
      description: 'This is step 2',
      options: [
        {
          label: 'Option 2',
          description: 'This is option 2',
        },
      ],
    },
  ]

  // Test to check the component renders without any crash
  it('renders without crashing', async () => {
    await renderWithProviders(<Tutorial steps={steps} />)
  })

  // Test to check the rendering of the correct number of steps
  it.skip('renders correct number of steps', async () => {
    const { container } = await renderWithProviders(<Tutorial steps={steps} />)

    const stepDots = container.getElementsByClassName('.MuiStep-root')
    expect(stepDots.length).toBe(steps.length)
  })

  // Test to check the correct rendering of step labels and descriptions
  it('renders correct step labels and descriptions', async () => {
    await renderWithProviders(<Tutorial steps={steps} />)
    steps.forEach(step => {
      expect(screen.getByText(step.label as string)).toBeInTheDocument()
      expect(screen.getByText(step.description as string)).toBeInTheDocument()
    })
  })

  // Test to check the correct rendering of the options for each step
  it('renders correct options for each step', async () => {
    await renderWithProviders(<Tutorial steps={steps} />)
    steps.forEach(step => {
      step.options?.forEach(option => {
        expect(screen.getByText(option.label as string)).toBeInTheDocument()
        expect(screen.getByText(option.description)).toBeInTheDocument()
      })
    })
  })
})
