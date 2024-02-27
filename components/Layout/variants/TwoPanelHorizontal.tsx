import { isArray } from 'lodash'
import React, { useCallback } from 'react'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

import { Card, useTheme } from '@mui/material'
import { Box } from '@mui/system'

/**
 * Layout1Props interface
 *
 * @property {number[]} [sizes=[50,50]] - Array of size, express in percentage. Defaults to [50,50] meaning equal size for each panel
 * @property {number[]} [minSizes=[200,300]] - Array of minimum size of each panel in pixels. Defaults to [200,300]
 * @property {JSX.Element | JSX.Element[]} [children] - JSX elements to be placed in each panel
 */
interface Layout1Props {
  sizes?: number[] // 1 = 100%, 0.5 = 50%, etc.
  minSizes?: number[] // in pixels
  height?: string
  children?: JSX.Element | JSX.Element[]
}

/**
 * `EmptyCard` is a functional component that returns a Card component with no shadow and full height and width.
 * This component is used as a placeholder in case no children are provided to the `TwoPanelHorizontal` component.
 *
 * @returns A Card component with no shadow and full height and width.
 */
const EmptyCard = () => <Card sx={{ boxShadow: 'none', height: '100%', width: '100%' }} />

/**
 * `TwoPanelHorizontal` is a functional component that renders a two-panel layout with a horizontal splitter.
 * It uses the `useTheme` hook from `@mui/material` to access the theme of the application.
 * It also uses the `useCallback` hook from `react` to memoize the `renderChildren` function.
 *
 * @param props - The properties that define the layout's configuration.
 * @param [props.sizes=[50, 50]] - The sizes of the panels, expressed as percentages. Defaults to [50, 50], meaning equal size for each panel.
 * @param [props.minSizes=[200, 390]] - The minimum sizes of the panels, in pixels. Defaults to [200, 390].
 * @param [props.height='100%'] - The height of the layout. Defaults to '100%'.
 * @param [props.children] - The JSX elements to be placed in each panel.
 *
 * @returns The rendered JSX element.
 */
const TwoPanelHorizontal: React.FC<Layout1Props> = ({ sizes = [50, 50], minSizes = [200, 390], height = '100%', children }) => {
  const theme = useTheme()

  /**
   * `renderChildren` is a memoized function that renders the children of each panel.
   * If no children are provided for a panel, it renders an `EmptyCard` component.
   *
   * @param children - The children to be rendered in the panel.
   * @param index - The index of the panel.
   *
   * @returns The rendered JSX element.
   */
  const renderChildren = useCallback((children: JSX.Element | JSX.Element[] | undefined, index: number) => {
    return children && isArray(children) && children.length > index ? children[index] || <EmptyCard /> : <EmptyCard />
  }, [])

  return (
    <ReflexContainer orientation="vertical" style={{ height, width: '100%' }}>
      <ReflexElement className="left-pane" minSize={minSizes[0]} flex={sizes[0] / 100}>
        {renderChildren(children, 0)}
      </ReflexElement>
      <ReflexSplitter className="react-reflex-splitter">
        <Box className={`react-reflex-splitter-handle handle-${theme.palette.mode}`} />
      </ReflexSplitter>
      <ReflexElement className="right-pane" minSize={minSizes[1]} flex={sizes[1] / 100}>
        {renderChildren(children, 1)}
      </ReflexElement>
    </ReflexContainer>
  )
}

export default TwoPanelHorizontal
