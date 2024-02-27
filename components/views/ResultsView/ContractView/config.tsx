import { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

import { InputProps } from '@/api-client/beryx.types'
import { LoadingStatus } from '@/config/config'
import { ParsedTypeProps } from '@/refactor/contractUtils'
import { Box, Typography } from '@mui/material'

import { StepsInterface } from '../../../widgets/Tutorial'

/**
 * Represents the internal properties of an input.
 */
export interface InternalInputProps extends InputProps {
  parsedType: ParsedTypeProps
  open?: boolean
  value?: string | number | boolean | null
  status?: 'error' | 'completed'
  components?: InternalInputProps[]
}

/**
 * Represents a decoded ABI.
 */
export type DecodedABI = {
  inputs: InputProps[]
  name: string
  stateMutability: string
  type: string
  id: string
}

/**
 * Represents the data of a contract.
 */
export type ContractData = {
  bytecode: string
  ERC: string[]
  functions: DecodedABI[]
  instructions: string[]
}

/**
 * Represents the steps for the tutorial.
 * @param t - The translation function.
 * @returns An array of steps for the tutorial.
 */
export const steps = (t: TFunction<'translation', undefined>): StepsInterface[] => [
  {
    image: 'interact_tutorial/1.svg',
    title: t('Learn how to interact with a contract'),
    description: (
      <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
        {t('Learn in 5 easy steps how to use the interact section to test your smart contract.')}
      </Typography>
    ),
  },
  {
    image: 'interact_tutorial/2.svg',
    title: 'ABI',
    description: (
      <>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('We decode the contract functions for you from its bytecode. Based on it you will be able to select what methods to call.')}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('There is also the possibility to upload the ABI by verifying your contract.')}
        </Typography>
      </>
    ),
  },
  {
    image: 'interact_tutorial/3.svg',
    title: t('Select a method'),
    description: (
      <>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('Methods are grouped by type. Therefore, select a type and then the method.')}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t(
            'You need to connect a wallet in order to call them. If you do not have funds to call write methods, do not worry, just go to our'
          )}{' '}
          <Box component={'a'} color="primary.main" href="/faucet">
            {t('faucet')}
          </Box>{' '}
          {t('and get some test FIL.')}
        </Typography>
      </>
    ),
  },
  {
    image: 'interact_tutorial/4.svg',
    title: t('Methods with arguments'),
    description: (
      <>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t(
            'Methods with arguments require an input. To check what arguments a method requires, go to the functions file in contract tab.'
          )}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('The input parameter have to be written inside the code block before running the method.')}
        </Typography>
      </>
    ),
  },
  {
    image: 'interact_tutorial/5.svg',
    title: t('Click Run!'),
    description: (
      <>
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('Click the Run method button and wait for the response.')}{' '}
        </Typography>{' '}
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('The response will appear in the top right panel. For write methods, the calls will also be displayed in the table.')}
        </Typography>{' '}
        <Typography variant="body1" sx={{ lineHeight: '125%', mb: '1rem' }}>
          {t('Press on the code view button on a particular row to view the transaction details.')}
        </Typography>
      </>
    ),
  },
]

/**
 * @file Represents the status of ABI (Application Binary Interface) loading.
 * @param status - The current status of the ABI loading process.
 * @returns A JSX element that displays the status of the ABI loading process.
 */
export const ABIStatusText = ({ status }: { status: LoadingStatus }) => {
  const { t } = useTranslation()

  switch (status) {
    case LoadingStatus.Error:
      return (
        <Typography variant="caption" color="text.secondary" sx={{ marginTop: '0rem' }}>
          {t('Error while decoding ABI. Please upload a file.')}
        </Typography>
      )
    case LoadingStatus.Loading:
      return (
        <Typography variant="caption" color="text.secondary" sx={{ marginTop: '0rem' }}>
          {`${t('Decoding')}...`}
        </Typography>
      )
    case LoadingStatus.Success:
      return (
        <Typography variant="caption" color="text.secondary" sx={{ marginTop: '0rem' }}>
          {t('Information taken from bytecode')}
        </Typography>
      )
    default:
      return null
  }
}

export type FieldValues = boolean | number | string | null | Array<FieldValues>
