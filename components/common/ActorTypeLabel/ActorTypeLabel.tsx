import { Unstable_Grid2 as Grid, Typography, useTheme } from '@mui/material'

import { actorTypeColor } from './MethodDefinitions'

/**
 * ActorTypeLabelProps Interface
 * @interface ActorTypeLabelProps
 * @param label - Label for actor
 * @param [level=1] - The level of label (optional)
 */
interface ActorTypeLabelProps {
  label: string

  level?: number
}

/**
 * ActorTypeLabel Component
 * @component ActorTypeLabel
 * @param props - Props for ActorTypeLabel
 * @returns - Rendered Component
 */
const ActorTypeLabel = ({ label, level = 1 }: ActorTypeLabelProps): JSX.Element => {
  const theme = useTheme()
  let bgColor = theme.palette.background.level2

  if (level === 1) {
    bgColor = theme.palette.background.level2
  }

  if (level === 3) {
    bgColor = theme.palette.background.level1
  }

  return (
    <Grid
      container
      data-testid="actor-type-label-grid"
      sx={{
        padding: '0.125rem 0.5rem 0.1rem 0.5rem',
        borderRadius: '4px',
        alignItems: 'center',
        backgroundColor: bgColor,
        width: 'fit-content',
        height: '1.5rem',
      }}
    >
      <Typography
        variant={'caption'}
        component={'p'}
        fontSize={'0.85rem'}
        lineHeight={1}
        color={actorTypeColor(theme.palette.mode, label)}
        fontWeight={600}
      >
        {label.replace(/[^a-zA-Z -]/g, '')}
      </Typography>
    </Grid>
  )
}
export default ActorTypeLabel
