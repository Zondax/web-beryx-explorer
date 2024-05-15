import { isArray } from 'lodash'
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { downloadTxtFile } from '@/utils/download'
import { copyContent } from '@/utils/text'
import { Close, Copy, Download, HelpFilled } from '@carbon/icons-react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Button, Card, Unstable_Grid2 as Grid, Grow, Tab, Tooltip, Typography, useTheme } from '@mui/material'

import SourceCodeFileIcon from '../common/CodeFileIcon'

/**
 * Component for displaying the label on a tab.
 *
 * @param label - the label text
 * @param active - Specifies whether tab is active.
 * @param onClose - callback function triggered when the close button is clicked.
 * @returns JSX.Element
 */

const TabLabel = ({ label, active, onClose }: { label: string; active: boolean; onClose?: (fileName: string) => void }) => {
  const theme = useTheme()

  const activeHoverColor = theme.palette.mode === 'light' ? theme.palette.background.level1 : theme.palette.tableParentRowBackgroundFocused

  const handleClose = useCallback(() => {
    return onClose ? onClose(label) : null
  }, [label, onClose])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginRight: '-3px',
        ':hover': { '.tab-close-button svg': { opacity: '1' } },
      }}
    >
      <SourceCodeFileIcon fileName={label} />
      {label}
      <Box
        onClick={handleClose}
        className="tab-close-button"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px',
          borderRadius: '4px',
          width: '1.45rem',
          height: '1.45rem',
          ':hover': { backgroundColor: active ? activeHoverColor : theme.palette.background.level1 },
        }}
      >
        <Close fontSize={'0.7rem'} color={active ? theme.palette.text.primary : 'inherit'} opacity={active ? 1 : 0} />
      </Box>
    </Box>
  )
}

/**
 * Interface for PanelTab properties.
 *
 * @property name - The name of the tab.
 * @property [disabled] - Specifies whether the tab is disabled.
 * @property [canClose] - Specifies whether the tab can be closed.
 * @property {(fileName: string) => void} [onClose] - Callback function triggered when the close button is clicked.
 */
export interface PanelTab {
  name: string
  disabled?: boolean
  canClose?: boolean
  onClose?: (fileName: string) => void
}

/**
 * Interface for Panel properties.
 *
 * @property {string | React.JSX.Element} [title] - The title of the panel. It can be a string or a JSX element.
 * @property [titleTooltip] - The tooltip for the title.
 * @property [contentToDownload] - The content to be downloaded.
 * @property [floatingActionButtons] - Specifies whether the panel has floating action buttons.
 * @property [tabs] - The tabs of the panel.
 * @property [children] - The children of the panel. It can be a single JSX element or an array of JSX elements.
 * @property [noTopbar] - Specifies whether the panel has a topbar.
 * @property [initialTab] - The initial tab of the panel.
 * @property [currentTab] - The current tab of the panel.
 * @property [padding] - The padding of the panel.
 * @property [scrollButtons] - Specifies whether the panel has scroll buttons. It can be a boolean or 'auto'.
 * @property [onTabChange] - Callback function triggered when the tab is changed.
 * @property [actionButtons] - The action buttons of the panel.
 */
interface PanelProps {
  title?: string | React.JSX.Element
  titleTooltip?: string
  contentToDownload?: any
  floatingActionButtons?: boolean
  tabs?: PanelTab[]
  tabBackgroundColor?: string
  tabBorderColor?: string
  children?: React.JSX.Element | React.JSX.Element[]
  noTopbar?: boolean
  initialTab?: string
  currentTab?: string
  padding?: string
  scrollButtons?: boolean | 'auto'
  onTabChange?: (tab: string) => void
  actionButtons?: React.JSX.Element[]
}

/**
 * Panel component.
 * This component is responsible for rendering a panel with tabs, title, and action buttons.
 * It includes a title, tooltip, content to download, floating action buttons, tabs, children, topbar, initial tab, current tab, padding, scroll buttons, tab change handler, and action buttons.
 * @component
 * @param props - The properties that define the panel.
 * @param props.title - The title of the panel. It can be a string or a JSX element.
 * @param props.titleTooltip - The tooltip for the title.
 * @param props.contentToDownload - The content to be downloaded.
 * @param props.floatingActionButtons - Specifies whether the panel has floating action buttons.
 * @param props.tabs - The tabs of the panel.
 * @param props.children - The children of the panel. It can be a single JSX element or an array of JSX elements.
 * @param props.noTopbar - Specifies whether the panel has a topbar.
 * @param props.initialTab - The initial tab of the panel.
 * @param props.currentTab - The current tab of the panel.
 * @param props.padding - The padding of the panel.
 * @param props.scrollButtons - Specifies whether the panel has scroll buttons. It can be a boolean or 'auto'.
 * @param props.onTabChange - Callback function triggered when the tab is changed.
 * @param props.actionButtons - The action buttons of the panel.
 */
const Panel = ({
  title,
  titleTooltip,
  contentToDownload,
  floatingActionButtons = false,
  tabs,
  tabBackgroundColor,
  tabBorderColor,
  children,
  noTopbar = false,
  initialTab,
  currentTab,
  padding = '0',
  scrollButtons = false,
  onTabChange,
  actionButtons,
}: PanelProps) => {
  // Global
  const theme = useTheme()
  const { t } = useTranslation()

  // Local
  const [activeTab, setActiveTab] = useState(initialTab ? initialTab : '0')

  /**
   * Handles the tab change event.
   * It sets the active tab to the new value and calls the onTabChange callback if it exists.
   * @param event - The synthetic event object.
   * @param value - The new value of the tab.
   */
  const handleTabChange = useCallback(
    (event: SyntheticEvent<Element, Event>, value: any) => {
      setActiveTab(value)
      if (onTabChange) {
        onTabChange(value)
      }
    },
    [onTabChange]
  )

  useEffect(() => {
    if (!currentTab) {
      return
    }
    setActiveTab(currentTab)
  }, [currentTab])

  /**
   * Downloads the JSON file.
   */
  const handleDownloadButton = useCallback(
    function () {
      downloadTxtFile(contentToDownload, 'Beryx', 'application/json', '.json')
    },
    [contentToDownload]
  )

  /**
   * Copy the JSON file.
   */
  const handleCopyButton = useCallback(
    async function () {
      await copyContent(JSON.stringify(contentToDownload, null, 2))
    },
    [contentToDownload]
  )

  return (
    <TabContext value={activeTab}>
      <Card sx={{ boxShadow: 'none', height: '100%', width: '100%', contain: 'paint', background: 'none', borderRadius: '0' }}>
        {!noTopbar && (
          <Box
            bgcolor={tabBackgroundColor ? tabBackgroundColor : theme.palette.background.level0}
            sx={{
              display: 'flex',
              justifyContent: title ? 'space-between' : 'flex-start',
              alignItems: 'center',
              borderBottom: `1px solid ${tabBorderColor ? tabBorderColor : theme.palette.border?.level0}`,
              height: '3rem',
              padding: '0.25rem 0.25rem',
              position: 'relative',
              width: '100%',
              gap: '0.5rem',
            }}
          >
            {title ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem' }}>
                <Typography variant="body1" sx={{ width: 'max-content', flexShrink: '0', textTransform: 'capitalize' }}>
                  {title}
                </Typography>
                {titleTooltip ? (
                  <Tooltip title={titleTooltip} sx={{ maxWidth: '50ch' }} arrow disableInteractive>
                    <HelpFilled style={{ cursor: 'help' }} color={theme.palette.text.secondary} />
                  </Tooltip>
                ) : null}
              </Box>
            ) : null}

            {tabs && tabs.length > 0 && (
              <Grow in={tabs && tabs.length > 0} style={{ transformOrigin: '100% 50% 0' }}>
                <TabList
                  selectionFollowsFocus
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons={scrollButtons}
                  allowScrollButtonsMobile={false}
                  sx={{
                    marginLeft: { xs: '0.25rem', md: '0.75rem' },
                    height: '2.15rem',
                    width: '100%',
                    scrollButton: { width: '5rem' },
                    '.MuiTabs-flexContainer': {
                      justifyContent: title ? 'flex-end' : 'flex-start',
                    },
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      label={
                        tab.canClose ? (
                          <TabLabel label={t(tab.name)} active={activeTab === index.toString()} onClose={tab.onClose} />
                        ) : (
                          t(tab.name)
                        )
                      }
                      disabled={tab.disabled}
                      value={index.toString()}
                      sx={{ padding: '0 0.55rem' }}
                      key={`panel tab ${tab.name}`}
                    />
                  ))}
                </TabList>
              </Grow>
            )}
            {contentToDownload && !floatingActionButtons ? (
              <Button variant="text" size="small" endIcon={<Download />} onClick={handleDownloadButton}>
                Download
              </Button>
            ) : null}
            {actionButtons && actionButtons.length > 0 ? actionButtons.map(button => button) : null}
          </Box>
        )}

        {tabs && isArray(children)
          ? children.map((child, index) => {
              const key = `panel tab content ${child.props.id || index}`
              return (
                <TabPanel
                  value={index.toString()}
                  sx={{
                    padding,
                    height: `calc(100% - 3rem)`,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: theme.palette.background.level1,
                  }}
                  key={key}
                >
                  {child}
                  {contentToDownload && floatingActionButtons ? (
                    <Grid container gap={'0.5rem'} sx={{ position: 'absolute', zIndex: 500, top: '0.5rem', right: '1.5rem' }}>
                      <Button variant="inputType" size="small" onClick={handleCopyButton} sx={{ minWidth: '2.5rem', padding: '0.25rem' }}>
                        <Copy />
                      </Button>
                      <Button
                        variant="inputType"
                        size="small"
                        onClick={handleDownloadButton}
                        sx={{ minWidth: '2.5rem', padding: '0.25rem' }}
                      >
                        <Download />
                      </Button>
                    </Grid>
                  ) : null}
                </TabPanel>
              )
            })
          : null}
        {!tabs ? children : null}
      </Card>
    </TabContext>
  )
}

export default Panel
