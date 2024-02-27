import { Box } from '@mui/material'

import { LinkCardProps } from '../../common/LinkCard'
import LinkResources from './LinkResources'

/**
 * Interface for ResourcesProps
 * @interface
 * @property {LinkCardProps[]} resourcesMetaInfo - Array of metadata for resources to be displayed
 */
interface ResourcesProps {
  resourcesMetaInfo: LinkCardProps[]
}

/**
 * Renders a Resources component.
 * @component
 * @param resourcesMetaInfo - Array of metadata for resources to be displayed
 * @returns - Returns a box containing resource links
 */
const Resources = ({ resourcesMetaInfo }: ResourcesProps) => {
  return (
    <Box
      width={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6rem',
        margin: { xs: '0 1rem', md: 'unset' },
      }}
    >
      <LinkResources resourcesMetaInfo={resourcesMetaInfo} />
    </Box>
  )
}

export default Resources
