/**
 * @module TokensView
 */
import { Box, Unstable_Grid2 as Grid, useTheme } from '@mui/material'

import Panel from '../../widgets/Panel'
import TokensList from './TokensList'

/**
 * The TokensView component is a view for tokens.
 * @function TokensView
 * @returns {JSX.Element}
 */
const TokensView = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: { xs: 'calc(100dvh - 6.75rem)', md: 'calc(100dvh - 6rem - 1.75rem)' },
        minHeight: '40rem',
        transition: { xs: 'height 0.2s ease-in-out', md: 'none' },
        width: '100%',
        display: 'flex',
        gap: '8px',
      }}
    >
      <Grid
        container
        flexDirection={'column'}
        gap={'0.5rem'}
        width={'100%'}
        height={'100%'}
        flexShrink={0}
        flexWrap={'nowrap'}
        bgcolor={theme.palette.background.level1}
        borderRadius={'0.5rem'}
        data-testid={'leaderbord-panel'}
      >
        <Panel
          contentToDownload={''}
          tabs={[{ name: 'Tokens', disabled: false }]}
          currentTab={'0'}
          tabBackgroundColor={theme.palette.background.level1}
          tabBorderColor={theme.palette.border?.level1}
          padding="0.5rem"
        >
          {[
            <Box key={'tokens list item tab'} height={'100%'} width={'100%'}>
              <TokensList />
            </Box>,
          ]}
        </Panel>
      </Grid>
    </Box>
  )
}

export default TokensView
