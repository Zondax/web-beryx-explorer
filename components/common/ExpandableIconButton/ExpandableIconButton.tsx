import { ReactNode, useCallback, useEffect, useState } from 'react'

import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import {
  GridEventListener,
  GridRenderCellParams,
  GridTreeNodeWithRender,
  useGridApiContext,
  useGridApiEventHandler,
} from '@mui/x-data-grid'

interface ExpandableIconButtonProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  children: ReactNode
}

/**
 * A component that renders a button that toggles the row height between expanded and collapsed states.
 * When expanded, the row height is set to 300px, otherwise it is set to the default of 42px.
 * It also adjusts the overflow property of the current cell and the alignment of all cells in the row.
 */
const ExpandableIconButton: React.FC<ExpandableIconButtonProps> = ({ params, children }) => {
  const apiRef = useGridApiContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const [containerWidth, setContainerWidth] = useState(params.api.getRootDimensions()?.viewportInnerSize.width)
  const [rowWidth, setRowWidth] = useState(params.api.getRowElement(params.row.id)?.getBoundingClientRect().width)

  const handleResize = useCallback(() => {
    const currenttableViewportWidth = params.api.getRootDimensions()?.viewportInnerSize.width
    if (currenttableViewportWidth !== undefined && currenttableViewportWidth !== containerWidth) {
      setContainerWidth(currenttableViewportWidth)
    }
    const currentRowWidth = params.api.getRowElement(params.row.id)?.getBoundingClientRect().width
    if (currentRowWidth !== undefined && currentRowWidth !== rowWidth) {
      setRowWidth(currentRowWidth)
    }
  }, [containerWidth, params.api, params.row.id, rowWidth])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [containerWidth, handleResize, params.api, params.row.id, rowWidth])

  useEffect(() => {
    if (isExpanded) {
      handleResize() // Recompute width when expanded state changes
    }
  }, [handleResize, isExpanded])

  useEffect(() => {
    return () => {
      // Reset row height to default when the component unmounts
      params.api.unstable_setRowHeight(params.row.id, 42)
    }
  }, [params.api, params.row.id])

  /**
   * Toggles the row height between expanded and collapsed states.
   * When expanded, the row height is set to 300px, otherwise it is set to the default of 42px.
   * It also adjusts the overflow property of the current cell and the alignment of all cells in the row.
   */
  const changeRowHeight = useCallback(
    (nextState: boolean) => {
      const newHeight = nextState ? 300 : 42
      params.api.unstable_setRowHeight(params.row.id, newHeight)

      const currentCell = params.api.getCellElement(params.row.id, params.field)
      if (currentCell && currentCell instanceof HTMLElement) {
        currentCell.style.overflow = 'visible'
      }

      const rowNode = params.api.getRowElement(params.row.id)
      if (rowNode && rowNode instanceof HTMLElement) {
        const cells = rowNode.querySelectorAll<HTMLElement>('.MuiDataGrid-cell')
        cells.forEach(cell => {
          cell.style.alignItems = nextState ? 'flex-start' : 'center'
          cell.style.marginTop = nextState ? '8px' : '0'
        })
      }

      setIsExpanded(nextState)
    },
    [params.api, params.row.id, params.field]
  )

  /**
   * Toggles the row height between expanded and collapsed states.
   * When expanded, the row height is set to 300px, otherwise it is set to the default of 42px.
   * It also adjusts the overflow property of the current cell and the alignment of all cells in the row.
   */
  const toggleRowHeight = useCallback(() => {
    const nextExpandedState = !isExpanded
    changeRowHeight(nextExpandedState)
  }, [isExpanded, changeRowHeight])

  const handleEvent: GridEventListener<'scrollPositionChange'> = useCallback(
    (
      paramsEvent // GridScrollParams
    ) => {
      if (paramsEvent.left > 430 && isExpanded) {
        changeRowHeight(false)
      }
    },
    [isExpanded, changeRowHeight]
  )

  // Hook subscription (only available inside the scope of the grid)
  useGridApiEventHandler(apiRef, 'scrollPositionChange', handleEvent)

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton size={'small'} onClick={toggleRowHeight}>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </IconButton>
      {isExpanded && (
        <Box
          sx={{
            position: 'absolute',
            top: '34px',
            left: '-17px',
            width: `${rowWidth}px`,
            height: 'calc(300px - 42px)',
          }}
        >
          <Box
            sx={{
              position: 'sticky',
              left: 0,
              width: `${containerWidth}px`,
              height: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ExpandableIconButton
