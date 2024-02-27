import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import { InternalInputProps } from '../../../../config'
import TypeColumn from './TypeColumn'

describe('TypeColumn', () => {
  const mockInput: InternalInputProps = {
    components: [
      {
        components: undefined,
        internalType: '',
        name: 'position0',
        type: 'bytes',
        parsedType: {
          type: 'bytes',
        },
      },
      {
        components: undefined,
        internalType: '',
        name: 'data2',
        type: 'tuple',
        open: false,
        parsedType: {
          type: 'object',
        },
      },
    ],
    internalType: '',
    name: 'data',
    type: 'bytes[]',
    open: false,
    parsedType: {
      type: 'object',
    },
  }
  const mockIndexs = [0, 1]

  it('renders arrow down', async () => {
    await renderWithProviders(<TypeColumn input={mockInput} indexes={mockIndexs} />)
    const arrowIcon = screen.getByTestId('arrow-down')
    expect(arrowIcon).toBeInTheDocument()
  })

  it('renders arrow up', async () => {
    const newMockInput = { ...mockInput }
    newMockInput.open = true
    await renderWithProviders(<TypeColumn input={newMockInput} indexes={mockIndexs} />)
    const arrowIcon = screen.getByTestId('arrow-up')
    expect(arrowIcon).toBeInTheDocument()
  })
})
