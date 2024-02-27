/**
 * @file This file contains the genesis component which displays information about the genesis block and network parameters for different networks.
 * @module components/widgets/Genesis/Genesis
 */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getNetworkMetadata } from '@/config/data'
import { NetworkType } from '@/config/networks'
import { Box, Divider, Unstable_Grid2 as Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

// Importing custom icons
import GenesisTextIcon from '../../common/Icons/GenesisTextIcon'
import NetworkParametersTextIcon from '../../common/Icons/NetworkParametersTextIcon'

/**
 * Function to render header based on the header string and color
 * @param header - The header string
 * @param color - The color
 * @returns - The JSX Element or null
 */
const renderHeader = (header: string, color: string) => {
  switch (header) {
    // Case when header is 'genesis'
    case 'genesis':
      return <GenesisTextIcon size={21} color={color} />
    // Case when header is 'networkParameters'
    case 'networkParameters':
      return <NetworkParametersTextIcon size={21} color={color} />

    // Default case
    default:
      return null
  }
}

/**
 * genesis component
 * @param props - The props
 * @param props.network - The network type
 * @returns - The genesis component
 */
const Genesis = ({ network }: { network: NetworkType }) => {
  // Using translation hook
  const { t } = useTranslation()
  // Using theme hook
  const theme = useTheme()

  // Using media query hook to check if the screen size is up medium
  const upMd = useMediaQuery(theme.breakpoints.up('md'))

  // Using useMemo hook to optimize performance
  const networkMetadata = useMemo(() => getNetworkMetadata(network), [network])

  // Memoizing valueBorder based on screen size and theme palette
  const valueBorder = useMemo(() => {
    if (upMd) {
      return theme.palette.mode === 'light'
        ? `linear-gradient(45deg, ${theme.palette.text.tertiary} 0%, ${theme.palette.background.level0} 100%)`
        : `linear-gradient(45deg, ${theme.palette.background.level3} 0%, ${theme.palette.background.level0} 100%)`
    }

    return theme.palette.mode === 'light'
      ? `linear-gradient(45deg, ${theme.palette.background.level0} 0%, ${theme.palette.text.tertiary} 1rem, ${theme.palette.background.level0} 100%)`
      : `linear-gradient(45deg, ${theme.palette.background.level0} 0%, ${theme.palette.background.level3} 1rem, ${theme.palette.background.level0} 100%)`
  }, [upMd, theme.palette])

  // Memoizing labelBorder based on screen size and theme palette
  const labelBorder = useMemo(() => {
    if (upMd) {
      return theme.palette.mode === 'light'
        ? `linear-gradient(45deg, ${theme.palette.background.level0} 0%, ${theme.palette.text.tertiary} 100%)`
        : `linear-gradient(45deg, ${theme.palette.background.level0} 0%, ${theme.palette.background.level3} 100%)`
    }
    return undefined
  }, [upMd, theme.palette])

  // Rendering Network Metadata
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: '1rem',
        width: '100%',
        padding: { xs: '0 1rem', md: '0 1rem' },
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        fontSize={'1.25rem'}
        maxWidth={'25ch'}
        lineHeight={1.3}
        textTransform={'capitalize'}
        marginBottom={'2rem'}
        marginLeft={{ xs: '1.5rem', md: undefined }}
      >
        {t(`${network.project}-${network.name}`)} {upMd ? null : <br />}
        {t('Network Information')}
      </Typography>
      <Grid container gap={'3.5rem'} direction={'column'} alignItems={'center'} width={'100%'}>
        {Object.keys(networkMetadata).map(subSection => (
          <Grid xs={12} key={subSection} sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: { xs: 'none', md: 'inline-block' },
                position: 'absolute',
                top: '1.75rem',
                left: 'calc(50% - 1px)',
                width: '1px',
                height: '100%',
                borderLeft: '1px solid transparent',
                borderImage:
                  theme.palette.mode === 'light'
                    ? `linear-gradient(45deg, rgba(0,0,0,0) 0%, ${theme.palette.text.tertiary} 50%)`
                    : `linear-gradient(45deg, rgba(0,0,0,0) 0%, ${theme.palette.background.level3} 50%)`,
                borderImageSlice: 1,
              }}
            />
            <Divider
              sx={{
                marginBottom: '-0.125rem',
                ':before ': {
                  width: { xs: '1rem', md: '100%' },
                  borderTop: '1px solid transparent',
                  borderImage:
                    theme.palette.mode === 'light'
                      ? `linear-gradient(45deg, ${theme.palette.background.level0} 0%, ${theme.palette.text.tertiary} 100%)`
                      : `linear-gradient(45deg, ${theme.palette.background.level0} 0%, ${theme.palette.background.level3} 100%)`,
                  borderImageSlice: 1,
                },
                ':after ': {
                  borderTop: '1px solid transparent',
                  borderImage:
                    theme.palette.mode === 'light'
                      ? `linear-gradient(45deg, ${theme.palette.text.tertiary} 0%, ${theme.palette.background.level0} 100%)`
                      : `linear-gradient(45deg, ${theme.palette.background.level3} 0%, ${theme.palette.background.level0} 100%)`,
                  borderImageSlice: 1,
                },
              }}
            >
              {renderHeader(subSection, theme.palette.text.primary)}
            </Divider>

            <Grid container xs={12}>
              {Object.entries(networkMetadata[subSection]).map(([key, value], index) => (
                <React.Fragment key={key}>
                  <Grid
                    xs={12}
                    md={6}
                    sx={{
                      padding: { xs: '0.85rem 1.5rem 0.125rem 1.5rem', md: '0.85rem 1.5rem' },
                      borderBottom:
                        index < Object.entries(networkMetadata[subSection]).length - 1 ? '1px solid transparent' : '0px solid transparent',
                      borderImage: labelBorder,
                      borderImageSlice: 1,
                    }}
                  >
                    <Typography variant="body1" component={'p'}>
                      {t(key)}
                    </Typography>
                  </Grid>
                  <Grid
                    xs={12}
                    md={6}
                    sx={{
                      padding: { xs: '0.125rem 1.5rem 0.85rem 1.5rem', md: '0.85rem 1.5rem' },
                      borderBottom:
                        index < Object.entries(networkMetadata[subSection]).length - 1 ? '1px solid transparent' : '0px solid transparent',
                      borderImage: valueBorder,
                      borderImageSlice: 1,
                    }}
                  >
                    <Typography
                      variant="captionMono"
                      component={'p'}
                      color={theme.palette.text.primary}
                      sx={{
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {value}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// Exporting genesis component
export default Genesis
