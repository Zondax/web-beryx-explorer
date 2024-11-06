/**
 * @file This module contains the HeroSection component which is used to display the hero section of the application.
 * It includes the import statements for the required modules and components, the interface for the props of the HeroSection component,
 * and the definition of the HeroSection component itself.
 */
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Parallax } from 'react-scroll-parallax'

import { themePath } from '@/theme/utils'
import { Box, Unstable_Grid2 as Grid, Typography, useMediaQuery, useTheme } from '@mui/material'

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

  const DevelopedByZondax = (
    <Grid container justifyContent="center" alignItems="center" sx={{ transition: 'opacity 500ms', ':hover': { opacity: 0.7 } }}>
      <Typography
        variant="subtitle2"
        color={'#0090FF'}
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
            filter: 'invert(48%) sepia(95%) saturate(1352%) hue-rotate(188deg) brightness(99%) contrast(101%)',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </Grid>
  )

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 'fit-content',
        maxHeight: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '78rem',
          marginTop: { xs: '0.25rem', md: '2rem' },
          marginBottom: '4rem',
          backgroundColor: '#E8FF44',
          borderRadius: '18px',
          overflow: 'hidden',
          height: { xs: '89dvh', md: 'fit-content' },
          maxHeight: { xs: '45rem', md: 'fit-content' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: { xs: undefined, md: '-8rem' },
            bottom: { xs: '-7rem', md: undefined },
            right: { xs: '50%', md: '-2rem' },
            transform: { xs: 'translateX(50%)', md: 'none' },
            width: { xs: '30rem', md: '60rem' },
            height: { xs: '30rem', md: '60rem' },
          }}
        >
          <Parallax
            easing={'easeIn'}
            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '18px' }}
            startScroll={0}
            endScroll={500}
            speed={-1.5}
            shouldAlwaysCompleteAnimation
          >
            <Image
              src={themePath('madrid-shape.svg')}
              fill
              sizes={'100vw'}
              quality={60}
              loading={'lazy'}
              alt={'background image'}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Parallax>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '1rem', md: '1.5rem' },
            right: { xs: '1rem', md: '1.5rem' },
            width: { xs: '3.5rem', md: '7rem' },
            height: { xs: '4rem', md: '8rem' },
          }}
        >
          <Image
            src={themePath('madrid-year-2.svg')}
            fill
            sizes={'100vw'}
            quality={60}
            loading={'lazy'}
            alt={'background image'}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              filter: 'brightness(1.1) contrast(100%) saturate(100%)',
            }}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '-10rem', md: '-14rem' },
            right: { xs: '50%', md: '-10rem', lg: '-2rem' },
            transform: { xs: 'translateX(50%)', md: 'none' },
            width: { xs: '30rem', md: '45rem' },
            height: { xs: '30rem', md: '40rem' },
          }}
        >
          <Parallax
            easing={'easeInOut'}
            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '18px' }}
            startScroll={0}
            endScroll={500}
            speed={1.5}
            shouldAlwaysCompleteAnimation
          >
            <Image
              src={themePath('corgi.svg')}
              fill
              sizes={'100vw'}
              quality={60}
              loading={'lazy'}
              alt={'background image'}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Parallax>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            padding: { xs: '4rem 1.5rem', md: '10rem 2rem 6rem 3.5rem', lg: '8rem 4rem 8.5rem 5rem' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: { xs: '0.65rem', md: '0' },
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              mb: { xs: '1.5rem', md: '2rem' },
            }}
          >
            <BeryxLogo size={upMd ? 36 : 20} color={'#0090FF'} />
            {DevelopedByZondax}
          </Box>
          <Box width={'100%'} mb={'0.5rem'} maxWidth={'70ch'} sx={{ marginBottom: { xs: '2rem', md: '4rem' } }}>
            <Typography
              data-testid="hero-section-title"
              variant="h1"
              component={'h1'}
              fontSize={{ xs: '1.75rem', sm: '2.5rem', md: '3rem' }}
              lineHeight={1}
              fontWeight={700}
              color={'#0090FF'}
            >
              {t('Explore and Interact with Filecoin Ecosystem')}
            </Typography>
          </Box>
          <SearchBar hero />
          <SearchExamples properties={{ width: isTablet ? '100%' : undefined }} />
        </Box>
      </Box>
    </Box>
  )
}

export default HeroSection
