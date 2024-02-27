import { useTranslation } from 'react-i18next'

import { getPaddingLeftRow } from '@/refactor/contractUtils'
import { Help } from '@carbon/icons-react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { Box, Tooltip, Typography, useTheme } from '@mui/material'

import { InternalInputProps } from '../../../../config'
import { commonRowStyles } from './Row'

/**
 * Parameters for TypeColumn component.
 */
interface TypeColumnParams {
  /** Properties of the input. */
  input: InternalInputProps

  /** Array of indexes. */
  indexes: number[]
}

/**
 * Renders TypeColumn component.
 *
 * This component displays a flex box
 * with a colored circle, a main text and helper info.
 * The color of the circle and the helper info depend on the input type.
 *
 * @param   input - properties of the input
 * @param   indexes - array of indexes
 *
 * @returns the rendered JSX element for this component.
 */
const TypeColumn = ({ input, indexes }: TypeColumnParams) => {
  // Hook to access the theme.
  const theme = useTheme()
  // Hook to access translation function.
  const { t } = useTranslation()

  // Function to render Arrow symbol.
  const renderArrow = () => {
    switch (input.open) {
      case true:
        return <KeyboardArrowUp data-testid={'arrow-up'} />
      case false:
        return <KeyboardArrowDown data-testid={'arrow-down'} />
      default:
        return null
    }
  }

  // Function to determine color of the circle.
  const getCircleColor = () => {
    switch (input.status) {
      case 'error':
        return theme.palette.error.main
      case 'completed':
        return theme.palette.success.main
      default:
        return theme.palette.text.secondary
    }
  }

  // Function to render help info.
  const renderHelp = (type: string) => {
    switch (type) {
      case 'address':
        return (
          <Tooltip title={t('The address parameter requires an Ethereum address')} arrow disableInteractive>
            <Help color={theme.palette.text.secondary} />
          </Tooltip>
        )
      default:
        return null
    }
  }

  return (
    <Box
      display={'flex'}
      gap={'0.5rem'}
      alignItems={'center'}
      padding={'0 0.5rem'}
      width={'100%'}
      borderRadius={'0.5rem 0 0 0.5rem'}
      ml={getPaddingLeftRow(indexes.length)}
      sx={{ ...commonRowStyles }}
    >
      {/* Circle */}
      <Box
        display={'flex'}
        alignItems={'center'}
        m={'0 0.5rem'}
        height={'0.65rem'}
        width={'0.65rem'}
        bgcolor={getCircleColor()}
        borderRadius={'50%'}
      />
      {/* Type */}
      <Typography variant="h5" fontWeight={400}>
        {input.type}
      </Typography>
      {renderHelp(input.type)}
      {renderArrow()}
    </Box>
  )
}

export default TypeColumn
