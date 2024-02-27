import { Typography, useTheme } from '@mui/material'

/**
 * Defines the properties for a BooleanColumn component
 */
interface BooleanColumnProps {
  /** Represents a boolean value to be displayed in the component */
  value: boolean
}

/**
 * A React component that translates boolean values into visual markup.
 * It uses the success color theme for true and the warning color theme for false
 *
 * @param props An object containing:
 * @param props.value A boolean that determines the color to be used and the text to be displayed.
 *
 * @returns A React element that represents a boolean value
 */
const BooleanColumn = ({ value }: BooleanColumnProps) => {
  const theme = useTheme()

  if (value) {
    return <Typography sx={{ color: theme.palette.success.main }}>True</Typography>
  }
  return <Typography sx={{ color: theme.palette.warning.main }}>False</Typography>
}

export default BooleanColumn
