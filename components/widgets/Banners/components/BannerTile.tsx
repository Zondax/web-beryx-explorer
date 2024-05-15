import Image from 'next/image'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { themePath } from '@/theme/utils'
import { Box, Chip, Unstable_Grid2 as Grid, Grow, Typography, useTheme } from '@mui/material'

/**
 * Component for interacting with different networks.
 *
 * @returns The rendered component
 */
const BannerTile = ({
  id,
  title,
  description,
  buttons,
  image,
  flag,
}: {
  id: string
  title: React.ReactNode
  description: string[]
  buttons: React.ReactNode
  flag: string
  image: string
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const renderDescription = useCallback(() => {
    return description.map((elem: string, index: number) => (
      <Typography key={elem} variant="body1" component={'p'} mb={index === 0 ? '1rem' : 0}>
        {elem}
      </Typography>
    ))
  }, [description])

  return (
    <Grow in>
      <Grid
        container
        direction={{ xs: 'column-reverse', md: 'row' }}
        flexWrap={'nowrap'}
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          height: { xs: '40rem', md: '28rem' },
          margin: { xs: '0 1rem', md: 'unset' },
          border: `1px solid ${theme.palette.border?.level0}`,
        }}
      >
        <Grid
          container
          direction={'column'}
          justifyContent="space-between"
          height={{ xs: '25rem', md: '100%' }}
          gap={{ xs: '3rem', md: '4rem' }}
          md={7}
          bgcolor="background.level0"
          sx={{ padding: { xs: '1rem', md: '2rem' } }}
        >
          <Grid>
            <Chip label={t(flag)} size="small" sx={{ marginBottom: '0.5rem' }} />
            <Typography variant="h3" component={'h2'} mb={'1.5rem'} fontWeight={600} maxWidth={'25ch'}>
              {title}
            </Typography>
            {renderDescription()}
          </Grid>
          {buttons}
        </Grid>
        <Grid
          container
          bgcolor="background.level2"
          md={5}
          sx={{ overflow: 'hidden' }}
          alignItems="center"
          justifyContent="center"
          height={{ xs: '15rem', md: '100%' }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Image
              src={themePath(image)}
              alt={`${id} example`}
              fill
              sizes={'100vh'}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grow>
  )
}

export default BannerTile
