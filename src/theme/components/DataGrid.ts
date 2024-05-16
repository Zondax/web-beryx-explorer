import { Components, Palette } from '@mui/material'
// noinspection ES6UnusedImports
import type {} from '@mui/x-data-grid-pro/themeAugmentation'
import type {} from '@mui/x-data-grid/themeAugmentation'

/**
 * This function returns the styles for the DataGrid component.
 * @param palette - The palette options from the theme.
 * @returns The styles for the DataGrid component.
 */
export const dataGridStyles = (palette: Palette): Components => {
  const commonChildRowStyles = {
    backgroundColor: palette.background.level0,
    borderRadius: '0',
    margin: '0',
    // borderBottom: `1px solid ${palette.border?.level0} !important`,
  }

  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '8px',
          borderCollapse: 'collapse',

          '& .MuiDataGrid-withBorderColor': {
            borderColor: palette.border?.level0,
          },

          '.parent-row': {
            // backgroundColor: `${palette.tableParentRowBackground} !important`,
            // borderRadius: '6px',
            // ...commonBorderStyles,

            borderBottom: `1px solid ${palette.border?.level0} !important`,
            ':hover': {
              background: `${palette.background.level1} !important`,
            },
          },
          '.alone-child-row': {
            // backgroundColor: 'transparent !important',
            backgroundColor: palette.background.level0,
            borderBottom: `1px solid ${palette.border?.level0} !important`,
            ':hover': {
              background: `${palette.background.level1} !important`,
            },
          },
          '.child-row': {
            ...commonChildRowStyles,
          },
          '.parent-row ~ .child-row': {
            ...commonChildRowStyles,
          },
          '.child-row:has(+.alone-child-row)': {
            borderBottom: `1px solid ${palette.border?.level0} !important`,
            // borderRadius: '0 0 6px 6px',
            // marginBottom: '4px',
          },
          '.child-row:has(+.parent-row)': {
            borderBottom: `1px solid ${palette.border?.level0} !important`,
            // borderRadius: '0 0 6px 6px',
            // marginBottom: '4px',
          },
          '.parent-row:has(+.child-row), .MuiDataGrid-row--detailPanelExpanded': {
            borderBottom: `1px solid ${palette.border?.level0} !important`,
            // borderRadius: '6px 6px 0 0',
            // margin: '4px 0 0 0',
          },
          '.alone-child-row:has(+.child-row)': {
            borderBottom: `1px solid ${palette.border?.level0} !important`,
            // borderRadius: '6px 6px 0 0',
            // margin: '4px 0 0 0',
          },
          '.child-row:last-of-type': {
            borderRadius: '0 0 6px 6px',
          },
          '.child-row[aria-selected=true]': {
            backgroundColor: `${palette.background.level1} !important`,
          },
          '.indent-row .indent-icon': {
            display: 'none',
          },
          '.child-row .indent-row .indent-icon': {
            display: 'inline-block',
          },
          '.parent-row[aria-selected=true]': {
            backgroundColor: `${palette.background.level2} !important`,
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
          padding: '0 1.125rem !important',
          ':focus-within': {
            outline: 'none',
          },
        },
        footerContainer: {
          borderColor: palette.border?.level0,
          minHeight: '44px',
        },
        cell: {
          color: palette.text?.primary,
          border: 'none',
          padding: '0 1.125rem !important',
          ':focus-within': {
            outline: 'none',
          },
        },
        row: {
          margin: '0 !important',
          borderBottom: '0.5px solid rgba(81, 81, 81, 1)',
          '&.Mui-hovered': {
            backgroundColor: palette.background.level1,
          },
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
