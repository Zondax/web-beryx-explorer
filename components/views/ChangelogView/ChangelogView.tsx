/**
 * @file This file contains the ChangelogView component which is used to convert addresses between Filecoin and Ethereum.
 */
import { useTranslation } from 'react-i18next'

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

import RecapList from '../HomeView/RecapList'

/**
 * ChangelogView is a component that allows users to convert addresses between Filecoin and Ethereum.
 * It provides a user interface for inputting an address, selecting the conversion direction, and displaying the converted address.
 * It also includes a section for frequently asked questions.
 */
const ChangelogView = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box
      data-testid="article-view"
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        height: upMd ? 'calc(100dvh - 2.25rem - 4rem)' : 'fit-content',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.level1,
          borderRadius: '8px',
          width: 'fit-content',
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: '0 2rem 4rem 2rem', md: '0 3rem 5rem 3rem' },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: theme.palette.background.level1,
            zIndex: 1,
            padding: { xs: '3rem 0', md: '4rem 0' },
            boxShadow: `0 10px 20px ${theme.palette.background.level1}`,
          }}
        >
          <Typography variant="h3" mb={{ xs: '0.5rem' }} textAlign={{ md: 'center', xs: 'left' }}>
            {t('Changelog')}
          </Typography>
          <Typography variant={'subtitle1'} component={'p'} color={'text.secondary'} mt={0.5} textAlign={{ md: 'center', xs: 'left' }}>
            {t('Unveiling the Evolution of Beryx')}
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '75ch' },
          }}
        >
          <RecapList />
        </Box>
      </Box>
    </Box>
  )
}
export default ChangelogView
