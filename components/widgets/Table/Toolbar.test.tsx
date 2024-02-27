import { renderWithProviders } from '@/helpers/jest-react'
import { DataGridPro } from '@mui/x-data-grid-pro'
import { screen } from '@testing-library/react'

import Toolbar from './Toolbar'

describe('Toolbar', () => {
  it('should render correctly', async () => {
    // Act
    await renderWithProviders(
      <DataGridPro
        rows={[]}
        columns={[]}
        slots={{
          toolbar: () => {
            return (
              <div data-testid="toolbar" className="MuiToolbar-root">
                <Toolbar />
              </div>
            )
          },
        }}
      />
    )
    // Assert
    const toolbarElement = screen.getByTestId('toolbar')
    expect(toolbarElement).toBeInTheDocument()
    expect(toolbarElement).toHaveClass('MuiToolbar-root')
  })
})
