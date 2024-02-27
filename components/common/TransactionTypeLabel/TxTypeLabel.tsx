import { useMemo } from 'react'

import { Box, Unstable_Grid2 as Grid, Tooltip, Typography, useTheme } from '@mui/material'

import { txTypeColor } from './MethodDefinitions'

/**
 * TxTypeLabelProps interface
 * Used to type check props for the TxTypeLabel component
 */
interface TxTypeLabelProps {
  /** Holds the transaction's type */
  label: string
  /** The height for the label */
  height?: string
}

/**
 * TxTypeLabel functional component
 * Creates a Label with specific styles for a certain transaction type
 *
 * @param props - contain label and height
 * @param props.label - type of the transaction
 * @param props.height - height to apply to the label, 1.7rem by default
 */
const TxTypeLabel = ({ label, height = '1.7rem' }: TxTypeLabelProps) => {
  const theme = useTheme()
  const backgroundColor = useMemo(() => txTypeColor(theme.palette.mode, label), [theme.palette.mode, label])

  return (
    <Grid
      container
      flexWrap="nowrap"
      alignItems="center"
      height={height}
      sx={{
        border: `1px solid ${
          theme.palette.mode === 'light' ? theme.palette.tableParentRowBackgroundFocused : theme.palette.background.level3
        }`,
        borderRadius: '3.5px 4px 4px 3.5px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
          width: '0.5rem',
          height: '100%',
          backgroundColor,
        }}
      />
      <Tooltip title={label} arrow disableInteractive>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0.125rem 0.4rem 0.125rem 0.48rem',
            backgroundColor: theme.palette.background.level2,
          }}
        >
          <Typography
            variant="caption"
            component="p"
            fontSize="0.85rem"
            sx={{
              color: theme.palette.text.primary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </Typography>
        </Box>
      </Tooltip>
    </Grid>
  )
}
export default TxTypeLabel
