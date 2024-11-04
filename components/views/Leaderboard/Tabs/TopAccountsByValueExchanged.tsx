import { SyntheticEvent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ValueExchangeActorType, ValueExchangeDirection } from '@/api-client/beryx.types'
import { GridToolbarContainer } from '@/components/muigrid/types'
import { TABLE_TYPE } from '@/config/tables'
import { useTopAccountsByValueExchanged } from '@/data/beryx'
import useAppSettingsStore from '@/store/ui/settings'
import { Box, MenuItem, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material'

import Table from 'components/widgets/Table'

import CustomizedToolbarTextField from '../../../widgets/ToolbarTextField'

/**
 * TopAccountsByValueExchanged Component.
 * @returns TopAccountsByValueExchanged component
 */
const TopAccountsByValueExchanged = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))
  const [direction, setDirection] = useState<ValueExchangeDirection>('all')
  const [actorType, setActorType] = useState<ValueExchangeActorType>('all')

  const { data: topContracts, isLoading: topContractsIsLoading } = useTopAccountsByValueExchanged(network, direction, actorType)

  /**
   * Maps through methodType options to generate ToggleButton for each method option.
   */
  const directionOptions = useMemo(
    () =>
      ['inbound', 'outbound', 'all'].map(tempDirection => (
        <ToggleButton value={tempDirection} sx={{ textTransform: 'capitalize' }} key={`${tempDirection} type`}>
          {t(tempDirection)}
        </ToggleButton>
      )),
    [t]
  )

  /**
   * Handles the tab change event
   * @param event - The event object
   * @param value - The new tab value
   */
  const handleDirection = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: ValueExchangeDirection) => {
      if (!value) {
        return
      }
      setDirection(value)
    },
    [setDirection]
  )

  /**
   * Renders a group of toggle buttons
   * @param value - The current value of the toggle button group
   * @param onChange - The function to call when the toggle button group value changes
   * @param options - The options to display in the toggle button group
   * @returns The rendered toggle button group
   */
  const renderToggleButtonGroup = (
    value: string,
    onChange: (_event: SyntheticEvent<Element, Event>, value: ValueExchangeDirection) => void,
    options: JSX.Element[] | undefined
  ) => (
    <ToggleButtonGroup size="small" color="primary" value={value} exclusive onChange={onChange} aria-label="Platform">
      {options}
    </ToggleButtonGroup>
  )

  /**
   * @function handleActorType
   * @description Handles the selection of actor type
   * @param e - Event
   */
  const handleActorType = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActorType(e.target.value as ValueExchangeActorType)
    },
    [setActorType]
  )

  const contractsData = useMemo(() => {
    let tempResult = topContracts?.results?.filter(({ unified_account }) => unified_account !== '') ?? []
    if (actorType !== 'all') {
      tempResult = tempResult.map(elem => ({ ...elem, actor_type: actorType }))
    }
    return tempResult
  }, [topContracts, actorType])

  const tableType = useMemo(() => {
    switch (direction) {
      case 'inbound':
        return TABLE_TYPE.ACCOUNTS_BY_VALUE_EXCHANGED_BY_INBOUND
      case 'outbound':
        return TABLE_TYPE.ACCOUNTS_BY_VALUE_EXCHANGED_BY_OUTBOUND
      default:
        return TABLE_TYPE.ACCOUNTS_BY_VALUE_EXCHANGED
    }
  }, [direction])

  /**
   * customToolbar
   */
  const customToolbar = useCallback(
    () => (
      <GridToolbarContainer sx={{ padding: '0.5rem 0.5rem 0 0', justifyContent: 'flex-end' }}>
        <Box display={'flex'} gap={'0.5rem'} alignItems={'center'}>
          {/* Actor type selector */}
          <CustomizedToolbarTextField id="select-actor-type" label={'Type'} value={actorType} onChange={handleActorType}>
            {['evm', 'all'].map((tempActor: string) => (
              <MenuItem key={`actor-type-${tempActor}`} value={tempActor}>
                <Box display={'flex'} alignItems={'center'} sx={{ gap: '0.5rem' }}>
                  <Typography variant={'body2'} color={'text.primary'} textTransform={'capitalize'}>
                    {t(tempActor)}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </CustomizedToolbarTextField>
          {/* Transaction direction switch */}
          {renderToggleButtonGroup(direction, handleDirection, directionOptions)}
        </Box>
      </GridToolbarContainer>
    ),
    [actorType, direction, directionOptions, handleActorType, handleDirection, t]
  )

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.level0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Table
        key="list of top accounts by value exchanged"
        rowData={contractsData}
        hideBorder
        mode="normal"
        tableType={tableType}
        disableColumnFilter
        disableColumnReorder
        loading={topContractsIsLoading}
        rowWatch
        toolbar={customToolbar}
      />
    </Box>
  )
}

export default TopAccountsByValueExchanged
