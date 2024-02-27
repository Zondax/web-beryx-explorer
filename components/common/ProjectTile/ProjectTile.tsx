import { ArrowForward } from '@mui/icons-material'
import { Card, CardContent, Grid, Typography } from '@mui/material'

/**
 * Interface for the Project tiles
 */
export interface ProjectInterface {
  title: string
  description: string
  linkDesc: string
  linkUrl: string
}

/**
 * Interface for the Projects
 */
export interface ProjectsInterface {
  title: string
  cards: ProjectInterface[]
}

/**
 * Component to display a Project tile
 *
 * @param The data for the Project tile
 *
 * @returns The Project tile as a JSX.Element
 */
const ProjectTile = ({ title, description, linkDesc, linkUrl }: ProjectInterface): JSX.Element => {
  const linkDescription = linkDesc && (
    <Grid container alignItems={'center'} justifySelf={'flex-end'}>
      <Typography variant="body1" color="primary.main">
        {linkDesc}
      </Typography>
      <ArrowForward sx={{ fontSize: 'small', marginLeft: '0.75rem', color: 'text.secondary' }} />
    </Grid>
  )

  const titleElement = (
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
  )

  const descriptionElement = (
    <Typography
      color="text.secondary"
      variant="body1"
      sx={{
        marginBottom: '1rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '3',
        lineClamp: '3',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {description}
    </Typography>
  )

  return (
    <Card
      sx={{
        boxShadow: 'none',
      }}
    >
      <CardContent
        sx={{
          minHeight: { xs: '152px', md: '210px', lg: '150px', xl: '150px' },
          padding: '16px !important',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        component={'a'}
        href={linkUrl}
      >
        <Grid>
          {titleElement}
          {descriptionElement}
        </Grid>
        {linkDescription}
      </CardContent>
    </Card>
  )
}

export default ProjectTile
