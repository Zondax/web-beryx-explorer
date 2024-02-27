import { horizontalFadingBorder } from '@/theme/hoverEffect'
import { Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import SourceCodeTab from 'components/widgets/SourceCodeTab'

import TwoPanelHorizontal from '../../../../../Layout/variants/TwoPanelHorizontal'
import ContractFilesPanel from './ContractFilePanel'

/**
 * ContractFilesDesktop Component.
 * This is a presentational component which uses a horizontal, 2-panel layout
 * to display the desktop version of the Contract Files view.
 *
 * @returns The rendered component
 */
const ContractFilesDesktop = () => {
  /**
   * get current theme related properties
   */
  const theme = useTheme()

  return (
    /**
     * Creating a Two-panel layout
     * 1st panel: sizes[25], minSizes[300]
     * 2st panel: sizes[75], minSizes[400]
     */
    <TwoPanelHorizontal sizes={[25, 75]} minSizes={[300, 400]}>
      <Grid
        container
        height={'100%'}
        width={'100%'}
        sx={{
          overflow: 'auto',
          paddingRight: '0.5rem',
          ...horizontalFadingBorder(theme),
        }}
      >
        <SourceCodeTab />
      </Grid>

      <Grid container height={'100%'} sx={{ border: `1px solid ${theme.palette.info.main}`, borderRadius: '6px' }}>
        <ContractFilesPanel />
      </Grid>
    </TwoPanelHorizontal>
  )
}

/**
 * Exporting ContractFilesDesktop component to allow use in other parts
 * of the application.
 */
export default ContractFilesDesktop
