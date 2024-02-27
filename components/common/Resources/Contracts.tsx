/** react-i18next is imported for internationalization or localization in our classes and functions */
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

/** Importing Resources store to manage resources state */
import { useResourcesStore } from '@/store/ui/resources'

/** @mui/material provides components that helps in quicker and faster web development */
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

/** Importing ResourceTile component */
import ResourceTile from './ResourceTile'

/** Importing contracts data */
import { contracts } from './data'

/**
 * Function Component that returns contracts information.
 * Uses several hooks and functions from React, react-i18next, @mui/material and store
 *
 */
const Contracts = () => {
  /** Instantiating 'useTranslation' hook to be able to use translation function */
  const { t } = useTranslation()

  /** Fetching functions from resources store to manage contracts */
  const setCurrentPage = useResourcesStore(s => s.setCurrentPage)
  const setCurrentContract = useResourcesStore(s => s.setCurrentContract)
  const clearCurrentContractOpenedFiles = useResourcesStore(s => s.clearCurrentContractOpenedFiles)

  /** Using Media Query to check if the device is desktop */
  const isDesktop = useMediaQuery(useTheme().breakpoints.up('md'))

  /**
   * Function to handle click event on Tile
   * It clears current contract, sets the current contract and change the current page
   * @param contractName It's the name of the contract.
   */
  const handleTileClick = useCallback(
    (contractName: string) => {
      clearCurrentContractOpenedFiles()
      setCurrentContract(contractName)
      setCurrentPage('contract')
    },
    [clearCurrentContractOpenedFiles, setCurrentContract, setCurrentPage]
  )

  /** Return JSX Elements */
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: isDesktop ? '5rem' : '2rem',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h3" mb={'2.5rem'}>
        {t('Smart Contract Examples')}
      </Typography>
      <Grid container spacing={'1rem'}>
        {contracts.map(contract => (
          <Grid xs={12} md={6} lg={4} key={`contract-tile-${contract.title}`}>
            <ResourceTile title={contract.title} id={contract.title} description={contract.description} handleTileClick={handleTileClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

/** Exporting Contracts function as default */
export default Contracts
