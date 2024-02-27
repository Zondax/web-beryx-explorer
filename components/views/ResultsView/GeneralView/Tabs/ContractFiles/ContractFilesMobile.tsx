/**
 * ContractFilesMobile is a functional react component.
 * It's used to provide a mobile interface to handle contract files.
 *
 * @returns React.Element
 **/
import { useCallback, useEffect, useState } from 'react'

import { useContractsStore } from '@/store/ui/contracts'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, Unstable_Grid2 as Grid, List, ListItemButton, ListItemText, useTheme } from '@mui/material'

import SourceCodeTab from '../../../../../widgets/SourceCodeTab'
import ContractFilesPanel from './ContractFilePanel'

const ContractFilesMobile = () => {
  /**
   * useTheme hook to get styles for the component from the theme
   **/
  const theme = useTheme()

  /**
   * useContractsStore hook to handle side effects related to contract store
   **/
  const { currentFile: currentOpenedFile } = useContractsStore(s => s.code)

  // State variable to control the open/close status of the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // A handler to toggle the open/close status of the menu
  const handleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  // useEffect to close menu when currentOpenedFile changes.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [currentOpenedFile])

  return (
    <Box sx={{ position: 'relative', paddingTop: '4.1rem', height: '100%' }}>
      <Grid
        container
        width={'100%'}
        sx={{
          overflowY: isMenuOpen ? 'auto' : 'hidden',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: 180,
          background: theme.palette.background.level1,
          border: `1px solid ${theme.palette.info.main}`,
          borderRadius: '6px',
        }}
      >
        <List dense component="div" disablePadding sx={{ width: '100%' }}>
          <ListItemButton onClick={handleMenu} sx={{ height: '3.5rem', mt: '0', gap: '0.2rem' }}>
            <ListItemText secondary="Contract files" />
            {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
            <SourceCodeTab />
          </Collapse>
        </List>
      </Grid>
      <Grid container height={'100%'} sx={{ border: `1px solid ${theme.palette.info.main}`, borderRadius: '6px' }}>
        <ContractFilesPanel />
      </Grid>
    </Box>
  )
}

export default ContractFilesMobile
