import { FormikProps } from 'formik'
import { useCallback } from 'react'

import { getArrowHeight, getPaddingLeftRow, modifyReqBody } from '@/refactor/contractUtils'
import { Box, Grid, Typography, useTheme } from '@mui/material'

import { InternalInputProps } from '../../../../config'
import { RunMethodFormValues } from '../../../config'
import InputText from './InputText'
import TypeColumn from './TypeColumn'

export type ActionTypes = 'add' | 'delete'
export interface RowParams {
  input: InternalInputProps
  disableInput?: boolean
  indexs: number[]
  formik: FormikProps<RunMethodFormValues>
  actions?: ActionTypes[]
}

export const rowHeight = 32
export const rowGap = 10
export const commonRowStyles = {
  bgcolor: 'background.level2',
}

// indexs: indicates how many times we should enter inside the components
const Row = ({ input, indexs, formik, actions = [] }: RowParams) => {
  const theme = useTheme()

  /**
   * Function to set the opened row.
   * It compares if the position in which we are searching is the same of the indicated one (in indexs).
   * If the index is the last one, the value is updated. Otherwise, we continue searching.
   * Otherwise, update with the new value.
   *
   * @param elem - The element to be updated.
   * @param index - The current index.
   * @param searchedIndex - The index being searched.
   * @returns The updated element.
   */
  const setOpenedRow = useCallback(
    function (elem: InternalInputProps, index: number, searchedIndex: number) {
      if (index === indexs[searchedIndex]) {
        // If the index is the last one, the value is updated. Otherwise, we continue searching
        if (searchedIndex !== indexs.length - 1) {
          elem.components?.forEach(function (subElem: InternalInputProps, index: number) {
            return setOpenedRow(subElem, index, searchedIndex + 1)
          })
        } else {
          // Otherwise, update with the new value
          elem.open = !elem.open
          elem.status = undefined
        }
      }
      return elem
    },
    [indexs]
  )

  /**
   * Open or close a row.
   * If the parsed type of the input is not 'array' or 'object', the function will return without any action.
   * Otherwise, it will modify the request body of the formik form by setting the opened row.
   */
  const handleRow = useCallback(
    function () {
      if (!['array', 'object'].includes(input.parsedType.type)) {
        return
      }
      modifyReqBody(formik, indexs, setOpenedRow)
    },
    [input.parsedType.type, formik, indexs, setOpenedRow]
  )

  /**
   * Function to determine the color of the arrow based on the input status.
   * If the input status is 'completed', the color will be set to the main success color from the theme palette.
   * Otherwise, the color will be set to the secondary text color from the theme palette.
   *
   * @returns The color for the arrow.
   */
  const getArrowColor = () => {
    if (input.status === 'completed') {
      return theme.palette.success.main
    }
    return theme.palette.text.secondary
  }

  return (
    <Grid container flexDirection={'column'} key={input.name} position={'relative'}>
      <Grid
        container
        borderRadius={'0.5rem'}
        height={rowHeight}
        position={'relative'}
        sx={{ cursor: input.open !== undefined ? 'pointer' : '' }}
      >
        {/* Arrow */}
        {indexs.length !== 1 ? (
          <Box
            sx={{
              left: `calc(1.2rem + (${indexs.length - 2} * 2rem))`,
              bottom: `calc(${rowHeight}px / 2)`,
              position: 'absolute',
              width: '2rem',
              height: getArrowHeight(formik.values.requestBody ?? [], indexs),
              borderLeft: `2px solid ${getArrowColor()}`,
              borderBottom: `2px solid ${getArrowColor()}`,
              borderRadius: '0.5rem',
              zIndex: input.status === 'completed' ? 10 : 15,
            }}
          />
        ) : null}
        {/* Type */}
        <Box display={'flex'} flex={1.25} onClick={handleRow} sx={{ zIndex: 20 }}>
          <TypeColumn input={input} indexes={indexs} />
        </Box>
        {/* Name */}
        <Box
          display={'flex'}
          flex={0.75}
          onClick={handleRow}
          padding={'0 0.5rem'}
          alignItems={'center'}
          sx={{
            zIndex: 20,
            ...commonRowStyles,
          }}
        >
          <Typography variant="h5" component={'p'} fontWeight={400}>
            {input.name}
          </Typography>
        </Box>
        {/* Input text */}
        <Box flex={1} sx={{ zIndex: 20, alignItems: 'center', display: 'flex' }}>
          <InputText input={input} indexs={indexs} formik={formik} actions={actions} />
        </Box>
      </Grid>
      {input.open === false ? (
        <>
          {/* Shadow box */}
          {[1, 2].map(elem => (
            <Box
              sx={{
                top: `calc(${elem}rem / 2)`,
                position: 'absolute',
                width: '100%',
                height: rowHeight,
                pl: `calc(${getPaddingLeftRow(indexs.length)} + ${elem}rem)`,
                pr: `calc(4rem + ${elem}rem)`,
                zIndex: 12 - elem,
                justifySelf: 'center',
              }}
              key={elem}
            >
              <Box
                sx={{
                  width: '100%',
                  height: rowHeight,
                  background: `linear-gradient(${theme.palette.background.level1} 70%, ${theme.palette.background.level2})`,
                  borderRadius: '0.5rem',
                }}
              />
            </Box>
          ))}
          {/* Number of childs */}
          <Grid
            container
            sx={{
              height: '1rem',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              p: '0.2rem 0.5rem 0 0',
            }}
          >
            <Typography variant="subtitle2" fontWeight={400}>
              {input.components?.length} more
            </Typography>
          </Grid>
        </>
      ) : null}
    </Grid>
  )
}

export default Row
