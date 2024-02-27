import { Box, Typography, useTheme } from '@mui/material'

/**
 * Properties for the BooleanLabel component.
 */
interface BooleanLabelProps {
  /**
   * A boolean value that represents some state,
   * undefined if the state is unknown or not set.
   */
  value?: boolean
}

/**
 * Component that returns a label depicting a boolean value.
 * It returns 'Yes' if the value is true, 'No' if the value is false,
 * and null if the value is undefined.
 */
const BooleanLabel = ({ value }: BooleanLabelProps) => {
  const theme = useTheme()

  // if boolean value is not set return null
  if (value === undefined) {
    return null
  }

  const color = value ? theme.palette.success.main : theme.palette.error.main

  return (
    <Box
      /* Styling for the Box */
      sx={{
        padding: '0.125rem 0.5rem 0.1rem 0.5rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.tableBorder,
        width: 'fit-content',
        height: '1.5rem',
      }}
    >
      <Typography variant={'caption'} component={'p'} fontSize={'0.85rem'} lineHeight={1} color={color} fontWeight={600}>
        {value ? 'Yes' : 'No'}
      </Typography>
    </Box>
  )
}

export default BooleanLabel
