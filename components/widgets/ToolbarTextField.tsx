import { ReactNode } from 'react'

import { ExpandMore } from '@mui/icons-material'
import { TextField, styled } from '@mui/material'

// Create a styled variant of TextField to use inside toolbar
const ToolbarTextField = styled(TextField)(({ theme }) => ({
  // Customize styles for your new variant
  '& .MuiInputBase-root': {
    border: `1px solid ${theme.palette.border?.level0}`,
    color: theme.palette.text?.primary,
    '&:hover': {
      backgroundColor: theme.palette.background?.level2,
      color: theme.palette.text?.primary,
      border: `1px solid ${theme.palette.border?.level0}`,
    },
    height: '28px',
    fontSize: '0.875rem',
    minWidth: '90px',
    textTransform: 'capitalize',
    borderRadius: '6px',
    gap: '0.25rem',
    '& .MuiButton-endIcon': {
      paddingLeft: '0.5rem',
    },
  },
  '& .MuiInputBase-input': {
    height: 'auto',
  },
  '& .MuiMenu-list': {
    variant: 'body2',
    fontSize: 10,
  },
  height: 'auto',
}))

/**
 * CustomizedToolbarTextField Component
 *
 * A custom-styled TextField component designed for use inside a toolbar.
 * This component uses Material-UI's `TextField` component and applies
 * custom styles to match the desired design. It is primarily used for
 * selection purposes with an icon indicating a dropdown.
 *
 * Props:
 * @param {string} value - The current value of the TextField.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Callback function to handle value changes.
 * @param {string} id - The unique identifier for the TextField.
 * @param {string} label - The label for the TextField.
 * @param {ReactNode} children - The children nodes, typically the options to be displayed in the dropdown.
 *
 * @returns {JSX.Element} A styled TextField component.
 */
export default function CustomizedToolbarTextField({
  value,
  onChange,
  id,
  children,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  label: string
  children: ReactNode
}) {
  return (
    <ToolbarTextField
      id={id}
      size="small"
      color="level3"
      variant="outlined"
      value={value}
      select
      SelectProps={{ IconComponent: ExpandMore }}
      fullWidth
      onChange={onChange}
      sx={{
        minWidth: 'max-content',
        '& .MuiTypography-root': { height: 'auto' },
      }}
    >
      {children}
    </ToolbarTextField>
  )
}
