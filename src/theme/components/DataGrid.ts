import { Components, PaletteOptions } from '@mui/material'
// noinspection ES6UnusedImports
import type {} from '@mui/x-data-grid-pro/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'

/**
 * This function returns the styles for the DataGrid component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the DataGrid component.
 */
export const DataGridStyle = (palette: PaletteOptions): Components => {
  const commonBorderStyles = {
    borderTop: `1px solid ${palette.tableChildrenRowBorder} !important`,
    borderRight: `1px solid ${palette.tableChildrenRowBorder} !important`,
    borderLeft: `1px solid ${palette.tableChildrenRowBorder} !important`,
  }

  const commonChildRowStyles = {
    backgroundColor: 'transparent !important',
    borderRadius: '0',
    margin: '0',
    ...commonBorderStyles,
    borderBottom: `1px solid ${palette.tableChildrenRowBorder} !important`,
  }

  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '6px',
          padding: '0 6px 6px 6px',
          borderCollapse: 'collapse',
          '.parent-row': {
            backgroundColor: `${palette.tableParentRowBackground} !important`,
            borderRadius: '6px',
            ...commonBorderStyles,
            borderBottom: `1px solid ${palette.tableParentRowBackground} !important`,
          },
          '.alone-child-row': {
            backgroundColor: 'transparent !important',
            borderRadius: '6px',
            ...commonBorderStyles,
            borderBottom: `1px solid ${palette.tableBorder} !important`,
          },
          '.child-row': {
            ...commonChildRowStyles,
          },
          '.parent-row ~ .child-row': {
            ...commonChildRowStyles,
          },
          '.child-row:has(+.alone-child-row)': {
            ...commonBorderStyles,
            borderRadius: '0 0 6px 6px',
            marginBottom: '4px',
          },
          '.child-row:has(+.parent-row)': {
            ...commonBorderStyles,
            borderRadius: '0 0 6px 6px',
            marginBottom: '4px',
          },
          '.parent-row:has(+.child-row), .MuiDataGrid-row--detailPanelExpanded': {
            ...commonBorderStyles,
            borderRadius: '6px 6px 0 0',
            margin: '4px 0 0 0',
          },
          '.alone-child-row:has(+.child-row)': {
            ...commonBorderStyles,
            borderRadius: '6px 6px 0 0',
            margin: '4px 0 0 0',
          },
          '.child-row:last-of-type': {
            borderRadius: '0 0 6px 6px',
          },
          '.child-row[aria-selected=true]': {
            backgroundColor: `${palette.tableChildRowBackgroundFocused} !important`,
          },
          '.indent-row .indent-icon': {
            display: 'none',
          },
          '.child-row .indent-row .indent-icon': {
            display: 'inline-block',
          },
          '.parent-row[aria-selected=true]': {
            backgroundColor: `${palette.tableParentRowBackgroundFocused} !important`,
          },
          '.simple-row': {
            ':hover': {
              background: 'none !important',
            },
            ':focus-within': {
              background: 'none !important',
            },
          },
        },
        columnHeaders: {
          borderRadius: 0,
          borderBottom: 'none',
          color: palette.text?.secondary,
        },
        columnHeader: {
          padding: '0.5rem 0.5rem 0 0.5rem',
          ':focus-within': {
            outline: 'none',
          },
        },
        footerContainer: {
          borderColor: `${palette.tableBorder} !important`,
        },
        cell: {
          color: palette.text?.primary,
          border: 'none',
          padding: '0 0.5rem',
          ':focus-within': {
            outline: 'none',
          },
        },
        row: {
          borderBottom: '0.5px solid rgba(81, 81, 81, 1)',
        },
        treeDataGroupingCellToggle: {
          svg: {
            width: '1.25rem',
            height: '1.25rem',
          },
        },
        virtualScroller: {},
        virtualScrollerRenderZone: {},
        virtualScrollerContent: {},
      },
    },
  }
}
