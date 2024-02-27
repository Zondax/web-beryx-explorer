import { useRouter } from 'next/router'
import { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@/components/muigrid/types'
import { useAppSettingsStore } from '@/store/ui/settings'
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { Filters, MethodType, methodDescription } from '../SearchTables/config'
import FilterButton from './FilterButton'

const occlusionThreshold = 5
const shiftPadding = 8

/**
 * Toolbar component
 * @param props - The props object
 * @returns The rendered Toolbar component
 */
const Toolbar = ({ title, filters, setFilters }: { title?: string; filters?: Filters; setFilters?: (params: Filters) => void }) => {
  const router = useRouter()
  const { t } = useTranslation()

  const hasFeedbackButton = useAppSettingsStore(s => s.hasFeedbackButton)
  const [isOccludedByFeedback, setIsOccludedByFeedback] = useState(false)
  const [amountShifted, setAmountShifted] = useState<number>(0)
  const filtersContainerRef = useRef<HTMLDivElement>(null)

  const checkOverlap = useCallback(() => {
    const iframe = document.getElementById('feedback-button')

    if (iframe && filtersContainerRef.current) {
      const iframeRect = iframe.getBoundingClientRect()
      const containerRect = filtersContainerRef.current.getBoundingClientRect()

      if (
        iframeRect.y < containerRect.y + containerRect.height + occlusionThreshold &&
        iframeRect.y + iframeRect.height + occlusionThreshold > containerRect.y &&
        iframeRect.x < containerRect.x + containerRect.width + amountShifted + occlusionThreshold
      ) {
        setIsOccludedByFeedback(true)
        const shiftAmount = containerRect.x + containerRect.width - iframeRect.x + shiftPadding
        setAmountShifted(shiftAmount)
      } else {
        setIsOccludedByFeedback(false)
        setAmountShifted(0)
      }
    }
  }, [filtersContainerRef, amountShifted])

  useEffect(() => {
    window.addEventListener('scroll', checkOverlap)
    window.addEventListener('resize', checkOverlap)
    checkOverlap()

    return () => {
      window.removeEventListener('scroll', checkOverlap)
      window.removeEventListener('resize', checkOverlap)
    }
  }, [checkOverlap])

  useEffect(() => {
    if (hasFeedbackButton) {
      const timer = setTimeout(() => {
        checkOverlap()
      }, 1000)

      return () => clearTimeout(timer)
    }
    return () => {}
  }, [hasFeedbackButton, checkOverlap])

  /**
   * Maps through methodType options to generate ToggleButton for each method option.
   */
  const methodOptions = useMemo(
    () =>
      filters?.methodType?.map(({ method, icon, disabled }) => (
        <ToggleButton value={method} sx={{ textTransform: 'capitalize' }} disabled={disabled} key={`${method} type`}>
          <Tooltip title={t(methodDescription[`${method}${disabled ? '_disabled' : ''}`])}>
            <Box display={'flex'} gap={'0.25rem'} alignItems={'center'}>
              {icon ?? null}
              <span>{t(method)}</span>
            </Box>
          </Tooltip>
        </ToggleButton>
      )),
    [t, filters?.methodType]
  )

  /**
   * Handles the tab change event
   * @param event - The event object
   * @param value - The new tab value
   */
  const handleMethodType = useCallback(
    (_event: SyntheticEvent<Element, Event>, value: MethodType) => {
      if (!value) {
        return
      }
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, type: value },
      })
      if (setFilters) {
        setFilters({
          ...filters,
          methodType: filters?.methodType?.map(option => {
            option.active = option.method === value
            return option
          }),
        } as Filters)
      }
    },
    [filters, setFilters, router]
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
    onChange: (_event: SyntheticEvent<Element, Event>, value: MethodType) => void,
    options: JSX.Element[] | undefined
  ) => (
    <ToggleButtonGroup size="small" color="primary" value={value} exclusive onChange={onChange} aria-label="Platform">
      {options}
    </ToggleButtonGroup>
  )

  const titleComponent = useMemo(() => {
    return title ? (
      <Typography variant="h5" textTransform={'capitalize'} lineHeight={1} marginLeft={'0.5rem'}>
        {t(title)}
      </Typography>
    ) : null
  }, [t, title])

  const currentMethod = useMemo(() => {
    if (!filters || !setFilters) {
      return undefined
    }

    return filters.methodType?.find(({ active }) => active === true)
  }, [filters, setFilters])

  return (
    <GridToolbarContainer sx={{ padding: '6px 0 0 0' }}>
      <Grid container gap={'0.5rem'} justifyContent={'space-between'} alignItems={'center'}>
        <Grid container width={'fit-content'} gap={'0.5rem'} alignItems={'center'}>
          {titleComponent}
        </Grid>
        <Grid ref={filtersContainerRef} container width={'fit-content'} gap={'0.5rem'} alignItems={'center'}>
          <GridToolbarColumnsButton
            variant={'inputType'}
            sx={{ padding: '0.125rem 0.5rem', borderRadius: '4px', minWidth: 'unset', gap: '0.25rem' }}
          />
          <GridToolbarExport
            variant={'inputType'}
            sx={{ padding: '0.125rem 0.5rem', borderRadius: '4px', minWidth: 'unset', gap: '0.25rem' }}
          />
          <GridToolbarFilterButton
            componentsProps={{ button: { variant: 'inputType' } }}
            sx={{ padding: '0.125rem 0.5rem', borderRadius: '4px', minWidth: 'unset', gap: '0.25rem' }}
          />
          {filters && setFilters ? <FilterButton filters={filters} setFilters={setFilters} /> : null}
          {currentMethod &&
            currentMethod.method !== 'all' &&
            renderToggleButtonGroup(currentMethod.method, handleMethodType, methodOptions)}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: { xs: '0', md: isOccludedByFeedback ? `${amountShifted}px` : '0' },
              transition: 'padding-right 0.3s ease-in-out',
            }}
          />
        </Grid>
      </Grid>
    </GridToolbarContainer>
  )
}

export default Toolbar
