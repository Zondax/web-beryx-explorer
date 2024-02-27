/**
 * @module LinkResources
 */
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@mui/material'

import LinkCard, { LinkCardProps } from '../../common/LinkCard'
import { otherResources } from './ResourcesData'

/**
 * LinkResourcesProps is the required props for the LinkResources Component.
 * resourcesMetaInfo - An array of objects where each object contains
 * the metadata (LinkCardProps) for a resource card.
 *
 * @interface LinkResourcesProps
 */
interface LinkResourcesProps {
  resourcesMetaInfo: LinkCardProps[]
}

/**
 * LinkResources is a component which renders a set of resource cards on the screen.
 * It makes use of the LinkCard component to render each individual card.
 *
 * @param { resourcesMetaInfo }
 * @return {*}
 */
const LinkResources = ({ resourcesMetaInfo }: LinkResourcesProps) => {
  const { t } = useTranslation()

  return (
    <Box width={'100%'}>
      <Grid container direction={'column'} alignItems={'center'} justifyContent="center" display={'flex'} marginBottom={'3rem'}>
        <Typography variant="h3" component={'h2'}>
          {t('Developer Resources')}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {resourcesMetaInfo?.map((item: LinkCardProps) => (
          <Grid item xs={12} sm={6} md={4} key={`link card - ${item.title}`}>
            <LinkCard title={item.title} description={item.description} url={item.url} imageUrl={item.imageUrl} domain={item.domain} />
          </Grid>
        ))}
        {otherResources?.map((item: LinkCardProps) => (
          <Grid item xs={12} sm={6} md={4} key={`link card - ${item.title}`}>
            <LinkCard title={item.title} description={item.description} url={item.url} imageUrl={item.imageUrl} domain={item.domain} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

/**
 * Exporting the LinkResources Component
 */
export default LinkResources
