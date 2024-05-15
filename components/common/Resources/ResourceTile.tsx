/**
 * A tile component that represents a resource.
 *
 * @component
 *
 * @param props The properties object.
 * @param props.image The url of the image to show in the tile. Optional.
 * @param props.title The title of the tile (also used as image alt text).
 * @param props.id The unique identifier of the tile (used when clicked).
 * @param props.description A brief description of the tile's content.
 * @param props.handleTileClick The function to call when the tile is clicked. It receives the tile id as the argument.
 *
 * @returns The ResourceTile component.
 */
import Image from 'next/image'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ArrowRight } from '@carbon/icons-react'
import { Box, Typography, useTheme } from '@mui/material'

/**
 * ResourceTile component.
 *
 * @param props - The properties object.
 * @param props.image - The url of the image to show in the tile. Optional.
 * @param props.title - The title of the tile (also used as image alt text).
 * @param props.id - The unique identifier of the tile (used when clicked).
 * @param props.description - A brief description of the tile's content.
 * @param props.handleTileClick - The function to call when the tile is clicked. It receives the tile id as the argument.
 *
 * @returns The ResourceTile component.
 */
const ResourceTile = ({
  image,
  title,
  id,
  description,
  handleTileClick,
}: {
  image?: string
  title: string
  id: string
  description: string
  handleTileClick: (contractName: string) => void
}) => {
  const theme = useTheme()
  const { t } = useTranslation()

  /**
   * Handles the click event on the tile.
   * Calls the handleTileClick function passed in the props with the id of the tile.
   *
   * @returns {void}
   */
  const handleClick = useCallback(() => {
    handleTileClick(id)
  }, [id, handleTileClick])

  return (
    <Box
      data-testid="resource-tile"
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        border: `1px solid ${theme.palette.border?.level0}`,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '12px',
        minWidth: '14.5rem',
        height: image ? '22rem' : '10rem',
        contain: 'paint',
        ':hover': {
          background: theme.palette.background.level0,
          '& .resource-tile-image': {
            filter: 'brightness(1.05) contrast(1.05) saturate(1.05)',
          },
        },
      }}
    >
      {image ? (
        <Box
          className="resource-tile-image"
          sx={{
            display: 'flex',
            height: '13rem',
            backgroundColor: 'background.level2',
            position: 'relative',
            filter: 'brightness(0.9) contrast(1) saturate(1)',
          }}
        >
          <Image
            src={image}
            alt={title}
            sizes="20rem"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Box>
      ) : null}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          height: image ? '9rem' : '10rem',
        }}
      >
        <Box>
          <Typography variant="h5" component={'p'} gutterBottom>
            {t(title)}
          </Typography>
          <Typography
            variant="caption"
            color={'text.secondary'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              lineClamp: '3',
              WebkitBoxOrient: 'vertical',
              flex: '1 1 auto',
            }}
          >
            {t(description)}
          </Typography>
        </Box>

        <Box
          sx={{
            justifySelf: 'flex-end',
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <ArrowRight />
        </Box>
      </Box>
    </Box>
  )
}

export default ResourceTile
