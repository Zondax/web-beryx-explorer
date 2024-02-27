import { useEffect, useState } from 'react'

import { Box, Divider, Fade } from '@mui/material'

/**
 * Label to display in the Server Pagination component
 */
const DisplayedRows = ({
  initElem,
  lastElem,
  totalTxs,
  isLoading,
}: {
  initElem: number | null
  lastElem: number | null
  totalTxs: number
  isLoading: boolean
}) => {
  const [showedLabel, setShowedLabel] = useState<string>('')

  useEffect(() => {
    if (!isLoading) {
      setShowedLabel(`${initElem}-${lastElem} of ${totalTxs}`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return (
    <Fade in={!isLoading} timeout={{ enter: 300, exit: 150 }}>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'1rem'}
        pr={'1rem'}
        height={'2rem'}
        sx={{
          transition: 'opacity 2s ease-in-out',
        }}
      >
        {showedLabel}
        <Divider orientation="vertical" variant="middle" flexItem />
      </Box>
    </Fade>
  )
}

export default DisplayedRows
