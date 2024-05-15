import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import LinkResources from 'components/widgets/Resources/LinkResources'
import { otherResources } from 'components/widgets/Resources/ResourcesData'

import { LinkCardProps } from '../LinkCard'
import ResourceTile from './ResourceTile'
import { resources } from './data'

/**
 * Interface for TOCProps
 * @interface
 * @property {LinkCardProps[]} resourcesMetaInfo - Array of metadata for resources to be displayed
 */
interface TOCProps {
  resourcesMetaInfo: LinkCardProps[]
}
/**
 * TOC component.
 * This component represents a table of contents,
 * listing a selection of available resources.
 */
const TOC = ({ resourcesMetaInfo }: TOCProps) => {
  const { t } = useTranslation()
  const setCurrentPage = useResourcesStore(s => s.setCurrentPage)

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
        height: '100%',
      }}
    >
      <Typography variant="h3" mb={'1.5rem'}>
        {t('Resources')}
      </Typography>
      <Grid
        container
        spacing={'1rem'}
        justifyContent={'center'}
        sx={{
          padding: { xs: '0 0.5rem 0 0.5rem', md: '1rem 0.5rem 0 1.25rem' },
          maxWidth: { xs: '100%', md: '70vw' },
        }}
      >
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
      <Box sx={{ maxWidth: { xs: '100%', md: '65vw' }, marginTop: '6rem', marginBottom: '4rem' }}>
        <LinkResources preview={false} resourcesMetaInfo={resourcesMetaInfo?.concat(otherResources)} hasHoverEffect={false} />
      </Box>
    </Box>
  )
}

export default TOC
