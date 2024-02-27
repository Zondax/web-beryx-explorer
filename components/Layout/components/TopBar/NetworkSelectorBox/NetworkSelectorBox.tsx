import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { translate } from '@/utils/translate'
import { Draggable } from '@carbon/icons-react'
import { Box, Typography, useTheme } from '@mui/material'

import FilecoinIcon from '../../../../common/Icons/Filecoin'
import NetworkSelector from './NetworkSelector'

/**
 * @function Network
 * @description TopBar component
 * @param props - page title to be displayed
 * @returns - Rendered TopBar component
 */
const Network = ({ pageTitle }: { pageTitle?: string }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  /**
   * `renderDraggable` is a function that renders a `Draggable` component.
   */
  const renderDraggable = useMemo(() => <Draggable size={16} color={theme.palette.tableBorder} />, [theme.palette.tableBorder])

  const FilecoinBox = (
    <Box display={'flex'} gap={'0.25rem'} alignItems={'center'} p={'0 1.25rem'}>
      <FilecoinIcon size={20} />
      <Typography variant="body1" color={'text.primary'} fontWeight={400} textTransform={'capitalize'} pl={'0.5rem'}>
        Filecoin
      </Typography>
    </Box>
  )

  const PageTitle = useMemo(
    () =>
      pageTitle ? (
        <Typography variant="body1" color={'text.primary'} fontWeight={400} mb={'2px'} p={'0 1.25rem'}>
          {translate(t, pageTitle)}
        </Typography>
      ) : null,
    [pageTitle, t]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        backgroundColor: 'background.level1',
        borderRadius: '0.5rem',
        height: theme.spacing(5),
        padding: '0.23rem',
      }}
    >
      {FilecoinBox}
      {renderDraggable}
      <NetworkSelector />
      {PageTitle}
    </Box>
  )
}

export default Network
