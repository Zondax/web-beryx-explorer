/**
 * A React component that displays information about contract verification along with a verification button.
 *
 * @component
 * @return {React.Component} The React component that displays the information block and verification button.
 *
 * The element sizes are adjusted according to the current screen size.
 * The text within the component is rendered depending on the current language setting.
 */
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { WarningAlt } from '@carbon/icons-react'
import { Box, Grid, IconButton, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'

import GoToVerifyButton from './GoToVerifyButton'

const imageSize = 54

const ItemInformation = () => {
  /**
   * @type {boolean} upMd A boolean value that represents whether the current screen width is 'medium' or higher based on material-UI breakpoints.
   */
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))
  const { t } = useTranslation()

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.25rem',
            width: { lg: '60%' },
          }}
        >
          <Box display={'flex'} gap={'0.5rem'} alignItems={'center'}>
            <Typography variant="h5">{t('Verify your Smart Contract')}</Typography>

            <Tooltip
              title={t('We currently do not offer support for upgradable and proxy contracts.')}
              arrow
              disableInteractive
              color="warning"
              enterTouchDelay={100}
            >
              <IconButton color="warning" aria-label="Download" sx={{ width: '2.25rem' }}>
                <WarningAlt color={'warn'} />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body2" lineHeight={1.25}>
            {t('Source code verification provides transparency for users interacting with smart contracts.')}
          </Typography>
        </Box>
      </Box>

      {/* Verify button */}
      <Grid container width={{ xs: '100%', md: '25rem' }} alignItems={'flex-end'}>
        <GoToVerifyButton />
      </Grid>
    </Grid>
  )
}

export default ItemInformation
