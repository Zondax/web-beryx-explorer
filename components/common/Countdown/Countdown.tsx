import { useEffect, useState } from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'
import { CircularProgressProps } from '@mui/material/CircularProgress'

/**
 * Represents a circular progress bar with a label.
 * @props {CircularProgressProps & { value: number }} - The properties that define the circular progress bar and its value.
 * @returns - A circular progress bar with a label.
 */
const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(props.value / 20)}`}</Typography>
      </Box>
    </Box>
  )
}

/**
 * Represents a countdown timer.
 * @props {any} - The properties that define the action to execute when the timer reaches zero.
 * @returns - A circular progress bar that counts down to zero.
 */
const Countdown = ({ action }: { action: () => void }) => {
  const [progress, setProgress] = useState<number>(20)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress === 100) {
          clearInterval(timer)
          action()
          return 100
        }
        return prevProgress + 20
      })
    }, 800)
    return () => {
      clearInterval(timer)
    }
  }, [action])

  return <CircularProgressWithLabel value={progress} />
}

export default Countdown
