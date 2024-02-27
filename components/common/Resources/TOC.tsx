import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import ResourceTile from './ResourceTile'
import { resources } from './data'

/**
 * TOC component.
 * This component represents a table of contents,
 * listing a selection of available resources.
 */
const TOC = () => {
  const { t } = useTranslation()
  const setCurrentPage = useResourcesStore(s => s.setCurrentPage)
  const isDesktop = useMediaQuery(useTheme().breakpoints.up('md'))

  /**
   * Handles clicks on resource tiles.
   *
   * @param page - The identifier of the selected resource.
   */
  const handleTileClick = useCallback(
    (page: string) => {
      setCurrentPage(page)
    },
    [setCurrentPage]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: isDesktop ? '5rem' : '2rem',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h3" mb={'2.5rem'}>
        {t('Resources')}
      </Typography>
      <Grid container spacing={'1rem'} justifyContent={'center'}>
        {resources.map(item => (
          <Grid xs={12} md={6} lg={4} key={`resources-tile-${item.title}`}>
            <ResourceTile
              title={item.title}
              id={item.page}
              description={item.description}
              handleTileClick={handleTileClick}
              image={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TOC
