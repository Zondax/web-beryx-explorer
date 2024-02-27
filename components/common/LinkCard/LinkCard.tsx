import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

import { boxShadow, hoverEffect } from '@/theme/hoverEffect'
import { useTheme } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { LinkCardProps } from './types'

/**
 * LinkCard is a functional component that renders a card with a link.
 * It uses the Material UI theme for styling.
 *
 * @returns The rendered JSX element.
 */
const LinkCard: React.FC<LinkCardProps> = ({ title, description, url, imageUrl, domain }: LinkCardProps) => {
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

  /**
   * CardContentSection is a functional component that renders the content section of the card.
   * It uses the Material UI theme for styling.
   *
   * @returns The rendered JSX element.
   */
  const CardContentSection = () => (
    <CardContent sx={{ minHeight: '10rem', borderTop: `1px solid ${theme.palette.tableBorder}` }}>
      <Typography variant="caption" component="p" color="text.secondary" sx={{ marginBottom: '0.25rem', textTransform: 'uppercase' }}>
        {domain}
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          pointerEvents: upMd ? 'none' : 'auto',
          marginBottom: '1rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          lineClamp: '1',
          WebkitBoxOrient: 'vertical',
          ':hover': {
            textDecoration: upMd ? 'none' : 'underline',
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        color="text.secondary"
        sx={{
          pointerEvents: 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          lineClamp: '2',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description}
      </Typography>
    </CardContent>
  )

  /**
   * CardMediaComponent is a functional component that renders the media section of the card.
   * It uses the Material UI theme for styling.
   *
   * @returns The rendered JSX element.
   */
  const CardMediaComponent = () => (
    <CardMedia className="card-image" sx={{ height: 160, backgroundColor: 'background.level2', position: 'relative' }} title="image alt">
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

  return (
    <Link href={url} target="_blank">
      <Card
        variant={'outlined'}
        elevation={0}
        ref={cardRef}
        component={'div'}
        sx={{
          position: 'relative',
          background: theme.palette.background.level1,
          transition: 'box-shadow 0.1s, transform 0.1s',
          cursor: 'pointer',
          ':hover': {
            boxShadow: boxShadow(theme.palette.mode),
          },
        }}
      >
        <div className="card-halo" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <CardMediaComponent />
        <CardContentSection />
      </Card>
    </Link>
  )
}

export default LinkCard
