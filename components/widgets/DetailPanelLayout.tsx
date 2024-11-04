import { ReactNode, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { Box, Typography, useTheme } from '@mui/material'

import LoadingView from 'components/views/LoadingView'

/**
 * Component properties interface
 * */
interface DetailPanelLayoutProps {
  loading?: LoadingStatus
  children: ReactNode
}

/**
 * The Detail Panel Content component.
 * @param loading - the information status
 * @param children - the displayed body when the status is success
 */
function DetailPanelLayout({ loading, children }: DetailPanelLayoutProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  /**
   * This function renders the content based on the loading status.
   * It uses the useCallback hook to prevent unnecessary re-renders.
   * If the loading status is 'Loading', it returns a LoadingView component.
   * If the loading status is 'Error', it returns a Box component with an error message.
   * Otherwise, it returns the children.
   * @function
   * @returns - Returns the content to be rendered.
   */
  const renderContent = useCallback(() => {
    switch (loading) {
      case LoadingStatus.Loading:
        return <LoadingView size={'medium'} />

      case LoadingStatus.Error:
        return <Typography variant={'subtitle2'}>{t("We couldn't find the data. Please try later.")}</Typography>

      default:
        return children
    }
  }, [loading, t, children])

  return (
    <Box
      height={'max-content'}
      bgcolor={'background.level0'}
      className={'detail-panel'}
      sx={{
        borderBottom: `1px solid ${theme.palette.border?.level0}`,
        borderTop: 'none',
        padding: '1rem',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        height={'100%'}
        sx={{
          border: `1px solid ${theme.palette.border?.level0}`,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          justifyContent: 'center',
          alignItems: loading && loading !== LoadingStatus.Success ? 'center' : 'auto',
          minHeight: loading !== LoadingStatus.Success ? '8rem' : 0,
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  )
}

export default DetailPanelLayout
