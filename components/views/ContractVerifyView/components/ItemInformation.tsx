import Image from 'next/image'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { Construction } from '@carbon/icons-react'
import { Box, Grid, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import GoToVerifyButton from './GoToVerifyButton'

const imageSize = 54

/**
 * A React component that displays information about contract verification along with a verification button.
 *
 * @component
 * @return {React.Component} The React component that displays the information block and verification button.
 */
const ItemInformation = () => {
  const theme = useTheme()
  /**
   * @type {boolean} upMd A boolean value that represents whether the current screen width is 'medium' or higher based on material-UI breakpoints.
   */
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation()

  const infoLabel = useMemo(
    () => (
      <Tooltip title={t('If you have a bug to report, please use the feedback tool in the navbar.')} arrow>
        <Grid
          container
          wrap="nowrap"
          gap={{ xs: '0.5rem', md: '0.25rem' }}
          bgcolor={'background.level2'}
          sx={{ borderRadius: { xs: '6px', md: '1rem' }, padding: '0rem 0.75rem', width: 'fit-content' }}
        >
          <Box width={20} pt={{ xs: '0.4rem', md: '0.25rem' }}>
            <Construction size={16} color={theme.palette.text.secondary} />
          </Box>
          <Typography variant="caption" p={'0.25rem 0'} color={'text.secondary'} lineHeight={1.25}>
            {t('Support for upgradable and proxy contracts in beta phase.')}
          </Typography>
        </Grid>
      </Tooltip>
    ),
    [theme, t]
  )

  return (
    <Grid
      container
      height={'fit-content'}
      minHeight={'7rem'}
      justifyContent={'space-between'}
      padding={upMd ? '1rem 1rem 1rem 1.5rem' : '1rem 0.5rem 1rem 0.5rem'}
      alignItems={'flex-start'}
      gap={{ xs: '0.5rem', md: '1.5rem' }}
    >
      {/* Information */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%', lg: 'fit-content' },
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Image
          src={themePath('verified_contract.svg')}
          alt={'warp'}
          height={imageSize}
          width={imageSize}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Grid container flexDirection={'column'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.25rem',
              width: { lg: '60%' },
              mb: '0.5rem',
            }}
          >
            <Box display={'flex'} gap={'1rem'} alignItems={'center'}>
              <Typography variant="h5" component={'h1'}>
                {t('Verify your Smart Contract')}
              </Typography>
            </Box>
            <Typography variant="body2" component={'p'} lineHeight={1.25}>
              {t('Source code verification provides transparency for users interacting with smart contracts.')}
            </Typography>
          </Box>
          <Grid container>{infoLabel}</Grid>
        </Grid>
      </Box>
      {/* Verify button */}
      <Grid container width={{ xs: '100%', md: '25rem' }} alignItems={'flex-end'}>
        <GoToVerifyButton />
      </Grid>
    </Grid>
  )
}

export default ItemInformation
