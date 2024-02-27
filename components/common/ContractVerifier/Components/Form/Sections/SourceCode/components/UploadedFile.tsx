/**
 * UploadedFile component
 *
 * @component
 *
 * @param props  - The properties that define the UploadedFile component.
 *
 * @param props.value  - The value of the file being uploaded.
 *
 * @param props.label  - The label of the file being uploaded.
 *
 * @param props.action - a function that specifies what should happen when the File component is clicked.
 *
 * @returns  - Returns a Material UI Grid component that visually represents a file that has been uploaded.
 *
 */
import { Close } from '@mui/icons-material'
import { Box, Grid, useTheme } from '@mui/material'

/**
 * `UploadedFile` is a React function component that represents a file that has been uploaded.
 * It uses the Material UI theme and the action function passed as a prop.
 *
 * @param props - The properties that define the UploadedFile component.
 * @param props.value - The value of the file being uploaded.
 * @param props.action - A function that specifies what should happen when the File component is clicked.
 *
 * @returns A Material UI Grid component that visually represents a file that has been uploaded.
 */
const UploadedFile = ({ value, action }: { value: string; action: () => void }) => {
  const theme = useTheme()
  return (
    <Grid container flexDirection={'column'} gap={'8px'}>
      <Grid container gap={'0.5rem'}>
        <Box
          key={`${value}`}
          display={'flex'}
          gap={'8px'}
          color="primary.text"
          bgcolor="background.level2"
          sx={{
            alignItems: 'center',
            padding: '8.5px 14px',
            width: 'max-content',
            textTransform: 'lowercase',
            fontWeight: '400',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: theme.palette.background.level0,
            },
          }}
          onClick={action}
        >
          {value}
          <Close fontSize="medium" sx={{ color: theme.palette.text.secondary }} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default UploadedFile
