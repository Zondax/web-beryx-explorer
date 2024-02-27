import { createRef } from 'react'

import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'

import { DynamicTextValue } from './DynamicTextValue'

/**
 * Begin suite of tests for the BeryxLink component
 */
describe('DynamicTextValue', () => {
  /**
   * Test if BeryxLink renders without crashing when passed both network and inputType params
   */
  it('renders without crashing', () => {
    const parentContainerRef = createRef<HTMLDivElement>()
    renderWithProviders(
      <div ref={parentContainerRef}>
        <DynamicTextValue value={'some long text goes here'} parentContainerRef={parentContainerRef} />
      </div>
    )
  })
})
