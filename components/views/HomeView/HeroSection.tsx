/**
 * @file This module contains the HeroSection component which is used to display the hero section of the application.
 * It includes the import statements for the required modules and components, the interface for the props of the HeroSection component,
 * and the definition of the HeroSection component itself.
 */
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Parallax } from 'react-scroll-parallax'

import { themePath } from '@/theme/utils'
import { Box, Unstable_Grid2 as Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

import { DynamicFontSizeText } from 'components/common/DynamicFontSizeText'
import { BeryxLogo } from 'components/common/Icons'
import SearchExamples from 'components/widgets/SearchExamples'

import SearchBar from '../../common/SearchBar'

/**
 * @function HeroSection
 * @description The HeroSection component.
 * @returns The JSX code for the HeroSection component.
 */
const HeroSection = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'xl'))

  const [fontSize, setFontSize] = useState<string>('3rem')
  const ref = useRef<HTMLDivElement | null>(null)

  const DevelopedByZondax = (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ textShadow: '1px -1px 12px #331401', transition: 'opacity 500ms', ':hover': { opacity: 0.7 } }}
    >
      <Typography
        variant="subtitle2"
        color={theme.palette.text.primary}
        sx={{
          marginRight: '0.25rem',
        }}
      >
        {t('by')}
      </Typography>
      <Link href="https://zondax.ch/" style={{ height: 'fit-content' }}>
        <Image
          src={themePath('zondax_text.svg')}
          alt="zondax-logo"
          height={11}
          width={51}
          style={{
            filter: 'contrast(2)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </Grid>
  )

  const imageHeight = theme.palette.mode === 'light' ? (upMd ? '28rem' : '55rem') : upMd ? '30.5rem' : '55rem'
  const imageWidth = theme.palette.mode === 'light' ? '110vw' : '105vw'
  const imageTransform = theme.palette.mode === 'light' ? 'translateX(calc(-50% - 3.9rem))' : 'translateX(calc(-50% - 1rem))'

  return (
    <Grid
      container
      justifyContent={'space-between'}
      maxHeight={{ xs: 'fit-content', md: '95vh', lg: '90vh', xl: '80vh' }}
      sx={{ position: 'relative', maxWidth: '78rem' }}
    >
      {upMd ? (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Parallax
            easing={'easeIn'}
            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '18px' }}
            startScroll={5}
            endScroll={50}
            shouldAlwaysCompleteAnimation
            scale={[1.1, 1]}
            opacity={[0, 1]}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '0rem',
                left: 0,
                border: `1.5px solid ${theme.palette.tableBorder}`,
                borderRadius: '18px',
                width: '100%',
                height: '100%',
                zIndex: 300,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '-3.6rem',
                left: '50%',
                transform: imageTransform,
                width: imageWidth,
                height: imageHeight,
                zIndex: 10,
                background: theme.palette.background.level0,
              }}
            >
              <Image
                src={themePath('new-year.webp')}
                fill
                sizes={'100vh'}
                loading={'eager'}
                alt={'background image'}
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'bottom 0 left 18%',
                  maxWidth: '100%',
                  mixBlendMode: theme.palette.mode === 'light' ? 'darken' : 'lighten',
                }}
              />
            </Box>
          </Parallax>
        </Box>
      ) : null}

      <Grid
        xs={12}
        md={7}
        container
        direction="column"
        sx={{
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          zIndex: 200,
          padding: { xs: '4rem 2rem', md: '10rem 2rem 6rem 3.5rem', lg: '11rem 4rem 6rem 5.5rem' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            gap: { xs: '0.65rem', md: '0' },
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            mb: { xs: '1.5rem', md: '3rem' },
          }}
        >
          <BeryxLogo size={upMd ? 36 : 20} color={theme.palette.text.primary} />
          {DevelopedByZondax}
        </Box>
        <Box width={'100%'} ref={ref} mb={'1rem'}>
          <DynamicFontSizeText
            refContainer={ref}
            text={t('Cheers to a year full of accomplishments')}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        </Box>
        <Typography
          variant="body1"
          component={'h2'}
          color={theme.palette.text.primary}
          sx={{
            maxWidth: '50ch',
            textAlign: 'left',
            marginBottom: '4rem',
            opacity: 0.8,
          }}
        >
          {t('Start exploring the Filecoin Network.')}
        </Typography>
        <SearchBar hasSearchButton={false} border properties={{ width: isTablet ? '100%' : undefined }} />
        <SearchExamples properties={{ width: isTablet ? '100%' : undefined }} />
      </Grid>
    </Grid>
  )
}

export default HeroSection
