/**
 * @file This file defines the TableInput component which is used to display the parameters of a contract method in a table format.
 * The user can interact with the table to provide values for the parameters.
 * The component also provides a download button to download the parameters as a JSON file.
 *
 * @module components/views/ResultsView/ContractView/RunMethod/components/Parameters/TableInput
 */
import { FormikProps } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { addCompleteField, parseRequest } from '@/refactor/contractUtils'
import { useContractsStore } from '@/store/ui/contracts'
import { downloadTxtFile } from '@/utils/download'
import { Download } from '@carbon/icons-react'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'

import { NoRows } from '../../../../../../widgets/Table'
import { InternalInputProps } from '../../../config'
import { RunMethodFormValues } from '../../config'
import { ActionTypes, Row, rowGap } from './Row'

/**
 * @interface SearchTablesProps
 * @property {any} formik - The formik object used for form handling.
 */
interface SearchTablesProps {
  formik: FormikProps<RunMethodFormValues>
}

/**
 * @interface FormInputsProps
 * @property total - The total number of inputs in the form.
 * @property completed - The number of inputs that have been completed by the user.
 */
export interface FormInputsProps {
  total: number
  completed: number
}

/**
 * The TableInput component displays the parameters of a contract method in a table format.
 * The user can interact with the table to provide values for the parameters.
 * The component also provides a download button to download the parameters as a JSON file.
 *
 * @param formik - The formik object used for form handling.
 * @returns The TableInput component.
 */
const TableInput = ({ formik }: SearchTablesProps) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [completedReqBody, setCompletdedReqBody] = useState<InternalInputProps[]>([])

  const tableInputs = useContractsStore(s => s.form.inputs)
  const setFormInputs = useContractsStore.getState().setFormInputs

  /**
   * Renders a row in the table for a given input.
   *
   * @param input - The input to render a row for.
   * @param indexs - The indices of the input in the form.
   * @param action - The actions that can be performed on the input.
   * @returns The row element.
   */
  const renderRows = (input: InternalInputProps, indexs: number[], action: ActionTypes[] = []): JSX.Element => {
    // The input is an object or an array
    if (['array', 'object'].includes(input.parsedType.type)) {
      if (!input.open) {
        return <Row input={input} indexs={indexs} formik={formik} key={`${input.name}${input.type}`} actions={action} />
      }

      if (input.parsedType.type === 'array' && input.parsedType.lengthType === 'dynamic') {
        action.push('add')
      }

      const rows = input.components?.map((elem, subindex): JSX.Element => {
        if (['array', 'object'].includes(elem.parsedType.type)) {
          return renderRows(elem, [...indexs, subindex], input.parsedType.lengthType === 'dynamic' ? ['delete'] : undefined)
        }
        return (
          <Row
            input={elem}
            indexs={[...indexs, subindex]}
            formik={formik}
            key={`${elem.name}${elem.type}`}
            actions={input.parsedType.lengthType === 'dynamic' ? ['delete'] : undefined}
          />
        )
      })

      return (
        <Grid container flexDirection={'column'} gap={`${rowGap}px`} key={`${input.name}${input.type}`}>
          <Row input={input} indexs={indexs} formik={formik} actions={action} />
          {rows}
        </Grid>
      )
    }

    // The input is a number, string, boolean or address
    return <Row input={input} indexs={indexs} formik={formik} key={`${input.name}${input.type}`} />
  }

  /**
   * Downloads the parameters as a JSON file.
   */
  const downloadParameters = useCallback(
    function () {
      if (formik.values.requestBody) {
        const request = parseRequest(formik.values.requestBody)
        downloadTxtFile(request, 'Parameters', 'application/json', '.json')
      }
    },
    [formik.values.requestBody]
  )

  /**
   * Updates the completedReqBody and formInputs state whenever the requestBody changes.
   */
  useEffect(() => {
    const completeReqBody = formik.values.requestBody ? [...formik.values.requestBody] : []
    const result = addCompleteField(completeReqBody)

    if (result?.components) {
      setCompletdedReqBody(result.components)
      setFormInputs(result.inputsStats)
    }
  }, [formik.values.requestBody, setFormInputs])

  /**
   * Renders the header of the table.
   * The header contains the 'Type', 'Name', and 'Value' columns.
   */
  const renderHeader = () => (
    <Grid container>
      {[
        { name: 'Type', flex: 1.25 },
        { name: 'Name', flex: 0.75 },
        { name: 'Value', flex: 1 },
      ].map(elem => (
        <Box flex={elem.flex} padding={'0.5rem 0.5rem 0'} key={elem.name}>
          <Typography variant="body2" color="text.secondary">
            {elem.name}
          </Typography>
        </Box>
      ))}
    </Grid>
  )

  /**
   * Renders the body of the table.
   * The body contains the rows of parameters.
   * If there are no parameters, a message is displayed.
   */
  const renderBody = () => {
    const content =
      formik.values.method && formik.values.method.inputs.length !== 0 ? (
        completedReqBody.map((input: InternalInputProps, index: number) => renderRows(input, [index]))
      ) : (
        <Box padding={'1rem 0'}>
          <NoRows text={'There are no parameters to complete'} icon={null} />
        </Box>
      )

    return (
      <Grid container flexDirection={'column'} gap={`${rowGap}px`} sx={{ contain: 'paint' }}>
        {content}
      </Grid>
    )
  }

  /**
   * Renders the footer of the table.
   * The footer contains the count of completed parameters and a button to download the parameters.
   */
  const renderFooter = () => (
    <Box display={'flex'} justifyContent={tableInputs ? 'space-between' : 'flex-end'} alignItems={'center'}>
      {tableInputs ? (
        <Typography
          variant="caption"
          color={tableInputs.completed === tableInputs.total ? 'success.main' : 'text.secondary'}
          sx={{ marginTop: '0rem' }}
        >
          Completed: {tableInputs.completed}/{tableInputs.total}
        </Typography>
      ) : null}
      <Button
        variant={'text'}
        color={'primary'}
        size={'small'}
        endIcon={<Download size={16} />}
        onClick={downloadParameters}
        sx={{ paddingX: '1rem' }}
      >
        {t('Download Parameters')}
      </Button>
    </Box>
  )

  return (
    <Box data-testid="interact-table-input" sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: `${rowGap}px` }}>
      <Grid
        container
        flexDirection={'column'}
        height={'100%'}
        mt={'0.5rem'}
        border={`1px solid ${theme.palette.tableBorder}`}
        borderRadius={'0.5rem'}
        gap={`${rowGap}px`}
        p={'0 6px 6px'}
      >
        {renderHeader()}
        {renderBody()}
      </Grid>
      {formik.values.method && formik.values.method.inputs.length !== 0 ? renderFooter() : null}
    </Box>
  )
}

export default TableInput
