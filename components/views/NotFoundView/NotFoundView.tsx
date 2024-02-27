import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Networks } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { useLatestStore } from '@/store/data/latest'
import { useSearchStore } from '@/store/data/search'
import { useAppSettingsStore } from '@/store/ui/settings'
import { startsWithFAndNumber } from '@/utils/inputDetection'
import { Box, Divider, Grid, Unstable_Grid2 as Grid2, Typography, alpha, useTheme } from '@mui/material'

import { FourZeroFourIcon } from '../../common/Icons'
import ItemIdentifierLabel from '../../common/ItemIdentifierLabel'
import NotFoundTile from '../../common/NotFoundTile'

/**
 * `NotFoundView` is a functional component that represents a page displayed when the searched item is not found.
 * It uses the `useTheme` hook from `@mui/material` to access the theme of the application.
 *
 * @returns The rendered JSX element
 */
const NotFoundView: React.FC = () => {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  const urlSearchType = useSearchStore(s => s.searchType)
  const searchValue: string = useSearchStore(s => s.searchInputValue)
  const network = useAppSettingsStore(s => s.network)
  const foundInAnotherNetwork = useSearchStore(s => s.searchResult.foundInAnotherNetwork)
  const { latestTipsets } = useLatestStore(s => s)

  const [searchType, setSearchType] = useState<ObjectType | undefined>(urlSearchType)

  const anotherNetwork = network.uniqueId === Networks.mainnet.uniqueId ? Networks.calibration : Networks.mainnet

  let formatedSearchType: string | undefined
  let errorDescription: React.ReactNode

  /**
   * Sets the search type based on the search value
   */
  useEffect(() => {
    if (searchValue) {
      const isAddress = startsWithFAndNumber(searchValue)
      setSearchType(isAddress ? ObjectType.ADDRESS : urlSearchType)
    }
  }, [searchValue, urlSearchType])

  /**
   * Generates a URL for refreshing the current page.
   * This function constructs a URL for the current search parameters and navigates to it, effectively refreshing the page.
   * @returns
   */
  const getRefreshUrl = useCallback(() => {
    router.push(`/v1/search/fil/${network.name}/${searchType}/${searchValue}`)
  }, [router, network, searchType, searchValue])

  /**
   * Navigates to the home page.
   * This function uses the router to navigate back to the home page.
   * @returns
   */
  const goToHomePage = useCallback(() => {
    router.push('/')
  }, [router])

  /**
   * Navigates to the search value.
   * This function uses the router to navigate to the result page.
   * @returns
   */
  const handleSearchValue = useCallback(() => {
    router.push(`/v1/search/fil/${anotherNetwork.name}/${searchType}/${searchValue}`)
  }, [router, anotherNetwork, searchType, searchValue])

  // Define the type and description that will be showed
  switch (searchType) {
    case ObjectType.ADDRESS:
    case ObjectType.TXS:
      formatedSearchType = searchType === ObjectType.TXS ? 'transaction' : searchType
      errorDescription = (
        <Typography variant={'subtitle1'} sx={{ mb: '1rem', color: theme.palette.text.primary, maxWidth: '75ch', textAlign: 'center' }}>
          {foundInAnotherNetwork
            ? t(`Good news! We found this ${formatedSearchType} in Filecoin ${anotherNetwork.name} network`)
            : t(`We couldn’t find the ${formatedSearchType} in any network`)}
        </Typography>
      )
      break

    case ObjectType.TIPSET:
      formatedSearchType = searchType
      if (latestTipsets && latestTipsets.length !== 0 && parseInt(searchValue) > latestTipsets[0].height) {
        errorDescription = (
          <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={'0.5rem'} alignItems={'center'} mb={'1rem'}>
            <Typography variant={'subtitle1'} sx={{ color: theme.palette.text.primary, maxWidth: '75ch', textAlign: 'center' }}>
              {t('This tipset has not been created yet.')}
            </Typography>
            <Box display={'flex'} gap={'0.5rem'} alignItems={'center'}>
              <Typography variant={'subtitle1'} sx={{ color: theme.palette.text.primary, maxWidth: '75ch', textAlign: 'center' }}>
                {t('The latest tipset is')}
              </Typography>
              <ItemIdentifierLabel value={latestTipsets[0].height.toString()} searchType={ObjectType.TIPSET} network={network} />
            </Box>
          </Box>
        )
      }
      break
    default:
      formatedSearchType = searchType
  }

  /**
   * Defines the actions to be displayed on the not found page.
   * @returns - The action buttons in JSX.
   */
  const renderActions = () => {
    let actions: React.ReactNode[] = []

    switch (searchType) {
      case ObjectType.ADDRESS:
      case ObjectType.TXS:
        // If the same address or transaction was found in the another network, we show the following button
        if (foundInAnotherNetwork) {
          actions.push(
            <NotFoundTile
              transaction={{
                network: anotherNetwork,
                type: searchType,
                value: searchValue,
                formatedType: formatedSearchType,
              }}
              action={handleSearchValue}
              key={'transaction-action-tile'}
            />
          )
        }
        actions = [
          ...actions,
          <NotFoundTile
            data={{
              title: 'Go to home page',
              description: 'Continue your adventure',
              icon: 'rocket',
            }}
            action={goToHomePage}
            key={'go-to-home-action-tile'}
          />,
          <NotFoundTile
            data={{
              title: 'Refresh',
              description:
                searchType === ObjectType.ADDRESS
                  ? 'Perform the search again'
                  : 'There is the possibility that your transaction just exited mempool. In this case, please try again in 3-4 minutes.',
              icon: 'refresh',
            }}
            action={getRefreshUrl}
            key={'refresh-action-tile'}
          />,
        ]
        break
      case ObjectType.TIPSET:
        actions.push(
          <NotFoundTile
            data={{
              title: 'Go to home page',
              description: 'Continue your adventure',
              icon: 'rocket',
            }}
            action={goToHomePage}
            key={'go-to-home-action-tile'}
          />
        )
        if (latestTipsets && latestTipsets.length !== 0 && parseInt(searchValue) <= latestTipsets[0].height) {
          actions.push(
            <NotFoundTile
              data={{
                title: 'Refresh',
                description: 'Perform the search again',
                icon: 'refresh',
              }}
              action={getRefreshUrl}
              key={'refresh-action-tile'}
            />
          )
        }
        break
      default:
        actions.push(
          <NotFoundTile
            data={{
              title: 'Go to home page',
              description: 'Continue your adventure',
              icon: 'rocket',
            }}
            action={goToHomePage}
            key={'go-to-home-action-tile'}
          />
        )
    }
    return actions
  }

  const actions = renderActions()

  return (
    <Grid2
      container
      sx={{
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
      }}
    >
      <Box position={'absolute'} top={{ xs: 50, md: 100 }} zIndex={0}>
        <FourZeroFourIcon size={332} color={alpha(theme.palette.background.level2, 0.6)} />
      </Box>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 0',
          margin: { xs: '6rem 1rem', md: '10rem 0rem' },
          zIndex: 1,
        }}
      >
        <Grid container flexDirection={'column'} alignItems={'center'} minHeight={'8rem'}>
          <Typography
            variant="h3"
            sx={{
              marginBottom: '1rem',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
            data-testid={'title-not-found-view'}
          >
            {t(`${formatedSearchType ?? 'Page'} Not Found`)}
          </Typography>
          {searchValue ? <ItemIdentifierLabel value={searchValue} searchType={searchType} network={network} disableLink /> : null}
          {network ? (
            <Typography variant={'subtitle1'} sx={{ margin: '1rem 0 1rem 0', maxWidth: '75ch', textAlign: 'center' }}>
              Filecoin • {network.name}
            </Typography>
          ) : null}
        </Grid>
        <Divider light sx={{ width: '100%', mb: '5rem' }} orientation={'horizontal'} />

        {errorDescription}

        {actions.length !== 0 ? (
          <Grid container flexDirection={'column'} gap={'1rem'} mb={'5rem'} alignItems={'center'}>
            {actions}
          </Grid>
        ) : null}

        <Typography variant={'subtitle1'} sx={{ margin: '1rem 0 5rem 0', maxWidth: '40ch', textAlign: 'center' }}>
          {t('To report a bug please use the Feedback tool from the right side of the screen.')}
        </Typography>
      </Grid2>
    </Grid2>
  )
}

export default NotFoundView
