import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

import { boxShadow, hoverEffect } from '@/theme/hoverEffect'
import { ArrowUpRight } from '@carbon/icons-react'
import { Box, useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { LinkCardProps } from './types'

/**
 * CardImage
 * @returns The CardImage component.
 */
const CardImage: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => {
  const theme = useTheme()
  return (
    <CardMedia
      sx={{
        position: 'relative',
        flex: '0 0 auto',
        width: { xs: '30%', sm: theme.spacing(18), md: theme.spacing(19) },
        backgroundColor: 'background.level2',
        border: 'none',
      }}
      title={title}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes={'100vh'}
        style={{
          objectFit: 'cover',
        }}
      />
    </CardMedia>
  )
}

/**
 * @function CardContentSection
 * @param props - The properties of the CardContentSection component.
 * @param props.domain - The domain of the card.
 * @param props.title - The title of the card.
 * @param props.upMd - The upMd of the card.
 * @returns The CardContentSection component.
 */
const CardContentSection: React.FC<{ domain: string; title: string; upMd: string }> = ({ domain, title, upMd }) => {
  const theme = useTheme()

  return (
    <CardContent>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
          <Typography
            variant="caption"
            component="p"
            color="text.secondary"
            sx={{
              pointerEvents: upMd ? 'none' : 'auto',
              textTransform: 'uppercase',
            }}
          >
            {domain}
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              pointerEvents: upMd ? 'none' : 'auto',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              lineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
        </Box>
        <ArrowUpRight size={20} style={{ flex: '0 0 auto', color: theme.palette.text.secondary }} />
      </Box>
    </CardContent>
  )
}
/**
 * LinkCardSmall
 * @returns The LinkCardSmall component.
 */
const LinkCardSmall: React.FC<LinkCardProps> = ({ title, url, imageUrl, domain }: LinkCardProps): JSX.Element => {
  const theme = useTheme()
  const cardRef = useRef<HTMLDivElement | null>(null)
  const upMd = theme.breakpoints.up('md')

  useEffect(() => {
    const el = cardRef.current

    if (el) {
      const cardHalo = el.querySelector('.card-halo') as HTMLElement
      el.style.zIndex = 'auto'

      hoverEffect(el, cardHalo, el.clientHeight, el.clientWidth, theme.palette.mode)
    }
  }, [theme.palette.mode, upMd])

  return (
    <Link href={url} target="_blank">
      <Card
        variant={'outlined'}
        elevation={0}
        ref={cardRef}
        component={'div'}
        sx={{
          position: 'relative',
          display: 'flex',
          background: theme.palette.background.level1,
          height: { xs: theme.spacing(9), sm: theme.spacing(10) },
          width: '100%',
          cursor: 'pointer',
          ':hover': {
            boxShadow: boxShadow(theme.palette.mode),
          },
        }}
      >
        <CardImage imageUrl={imageUrl} title={title} />
        <Box
          className="card-halo"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderLeft: `1px solid ${theme.palette.tableBorder}`,
          }}
        >
          <CardContentSection domain={domain} title={title} upMd={upMd} />
        </Box>
      </Card>
    </Link>
  )
}

export default LinkCardSmall
