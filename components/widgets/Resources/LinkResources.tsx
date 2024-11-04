/**
 * @module LinkResources
 */
import { useTranslation } from 'react-i18next'

import { compareByPriority } from '@/utils/resources'
import { Box, Button, Grid, Link, Typography } from '@mui/material'

import { LinkCardCategory } from 'components/common/LinkCard/types'

import LinkCard, { LinkCardProps } from '../../common/LinkCard'

/**
 * LinkResourcesProps is the required props for the LinkResources Component.
 * resourcesMetaInfo - An array of objects where each object contains
 * the metadata (LinkCardProps) for a resource card.
 *
 * @interface LinkResourcesProps
 */
interface LinkResourcesProps {
  resourcesMetaInfo: LinkCardProps[]
  hasHoverEffect?: boolean
  preview: boolean
}

/**
 * LinkResources is a component which renders a set of resource cards on the screen.
 * It makes use of the LinkCard component to render each individual card.
 *
 * @param { resourcesMetaInfo }
 * @return {*}
 */
const LinkResources = ({ resourcesMetaInfo, hasHoverEffect = false, preview = false }: LinkResourcesProps) => {
  const { t } = useTranslation()

  /**
   * Renders resources by category.
   *
   * @returns The JSX element representing the resource cards.
   */
  const renderLinkCardsByCategory = () => {
    const categories = Object.values(LinkCardCategory)
    return categories.map(category => (
      <div key={category} style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" component="h3" gutterBottom marginBottom={'2rem'}>
          {t(`${category.toString()}`)}
        </Typography>
        <Grid container spacing={2}>
          {resourcesMetaInfo
            ?.sort(compareByPriority)
            .filter(item => item.category === category)
            .map(filteredItem => (
              <Grid item xs={12} sm={6} md={4} key={`link card - ${filteredItem.title}`}>
                <LinkCard
                  hasHoverEffect={hasHoverEffect}
                  title={filteredItem.title}
                  description={filteredItem.description}
                  url={filteredItem.url}
                  imageUrl={filteredItem.imageUrl}
                  domain={filteredItem.domain}
                  category={filteredItem.category}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    ))
  }

  /**
   * Renders 2 rows of resources.
   *
   * @returns The JSX element representing either the preview or the full view of the resource cards.
   */
  const renderLinkCardsPreview = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" component="h3" gutterBottom marginBottom={'2rem'}>
          {t('Resources')}
        </Typography>
        <Grid container spacing={2} mb={4}>
          {resourcesMetaInfo
            ?.sort(compareByPriority)
            .filter(item => item.category === LinkCardCategory.ECOSYSTEM || item.category === LinkCardCategory.DEVELOPERS || item.priority)
            .slice(0, 6)
            .map(filteredItem => (
              <Grid item xs={12} sm={6} md={4} key={`link card - ${filteredItem.title}`}>
                <LinkCard
                  hasHoverEffect={hasHoverEffect}
                  title={filteredItem.title}
                  description={filteredItem.description}
                  url={filteredItem.url}
                  imageUrl={filteredItem.imageUrl}
                  domain={filteredItem.domain}
                  category={filteredItem.category}
                />
              </Grid>
            ))}
        </Grid>
        <Button variant="contained" LinkComponent={Link} href="/resources">
          {t('View more')}
        </Button>
      </div>
    )
  }

  return <Box width={'100%'}>{preview ? renderLinkCardsPreview() : renderLinkCardsByCategory()}</Box>
}

/**
 * Exporting the LinkResources Component
 */
export default LinkResources
