import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

import { useAppSettingsStore } from '@/store/ui/settings'
import { Box, Grid } from '@mui/material'

import { LinkCardProps } from '../../common/LinkCard'
import LatestItems from '../../widgets/LatestItems'
import HeroSection from './HeroSection'

// Importing components dynamically
const BeryxAPI = dynamic(() => import('../../widgets/Resources/BeryxAPI/BeryxAPI'))
const Genesis = dynamic(() => import('../../widgets/Genesis/Genesis'))
const Resources = dynamic(() => import('../../widgets/Resources/Resources'))
const Banners = dynamic(() => import('../../widgets/Banners'))
const ReportBug = dynamic(() => import('../../widgets/ReportBug'))

/**
 * Interface for the HomeViewProps
 * @interface
 * @property {LinkCardProps[]} resourcesMetaInfo - An array of LinkCardProps for resources
 */
interface HomeViewProps {
  resourcesMetaInfo: LinkCardProps[]
}

/**
 * HomeView is a functional component that renders the home view of the application.
 * It uses the Material UI theme for styling.
 *
 * @param props - The properties that define the component's behavior and display.
 * @param props.resourcesMetaInfo - An array of LinkCardProps for resources.
 *
 * @returns The rendered JSX element.
 */
const HomeView: React.FC<HomeViewProps> = ({ resourcesMetaInfo }) => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const HeroComponent = useMemo(() => {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          margin: { xs: '4rem 0rem 4rem 0rem', md: '2.5rem 0rem 4rem 0rem', lg: '2.5rem 6.5rem 4rem 6.5rem' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 200,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <HeroSection />
        </Box>
      </Box>
    )
  }, [])

  const GridComponent = (
    <Grid
      container
      rowGap={'8rem'}
      sx={{
        justifyContent: 'center',
        maxWidth: '70rem',
        margin: { xs: '0 2rem', md: '0 6rem' },
      }}
    >
      <LatestItems />
      <Genesis network={network} />
      <BeryxAPI />
      <Banners />
      <Resources resourcesMetaInfo={resourcesMetaInfo} />
      <ReportBug />
    </Grid>
  )

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        zIndex: 1,
        width: '100%',
        height: 'fit-content',
        borderRadius: '8px',
        // overflow: 'hidden',
        // contain: 'paint',
      }}
    >
      {HeroComponent}
      {GridComponent}
    </Grid>
  )
}

export default HomeView
