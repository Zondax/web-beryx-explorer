import { FormikProps, useFormik } from 'formik'
import lodash from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingStatus } from '@/config/config'
import { useContractsStore } from '@/store/ui/contracts'
import useWalletStore, { WalletProvider } from '@/store/wallets/wallet'
import { Alert, Backdrop, Box, Modal } from '@mui/material'

import Tutorial from '../../../../widgets/Tutorial'
import { DecodedABI, steps } from '../config'
import { Buttons, Method, Parameters, Pay } from './components'
import { RunMethodFormValues, defaultUnit, validationSchema } from './config'

/**
 * Interface for RunMethodProps
 * @interface RunMethodProps
 * @property {any} abi - The ABI (Application Binary Interface) of the Ethereum smart contract.
 * @property {string | undefined} ETHAddress - The Ethereum address. It is optional.
 * @property {LoadingStatus | undefined} status - The loading status. It is optional.
 */
interface RunMethodProps {
  abi: any
  ETHAddress?: string
  status?: LoadingStatus
}

/**
 * Initial values for the RunMethod form.
 * @type {RunMethodFormValues}
 * @property {string | undefined} method - The method to be run.
 * @property {string | undefined} type - The type of the method.
 * @property {number | undefined} amount - The amount to be used in the method.
 * @property unitAmount - The unit of the amount. Default is the default unit.
 * @property {Array<any>} requestBody - The request body for the method.
 */
export const initialValues: RunMethodFormValues = {
  method: undefined,
  type: undefined,
  amount: undefined,
  unitAmount: defaultUnit,
  requestBody: [],
}

/**
 * RunMethod component.
 * This component is used for running an Ethereum smart contract method.
 *
 * @param props - The properties for the RunMethod component.
 * @param props.abi - The ABI (Application Binary Interface) of the Ethereum smart contract.
 * @param props.ETHAddress - The Ethereum address. It is optional.
 * @param props.status - The loading status. It is optional.
 *
 * @returns - The JSX element of the RunMethod component.
 */
const RunMethod = ({ abi, ETHAddress, status }: RunMethodProps): JSX.Element => {
  const { t } = useTranslation()

  // Form states and methods
  const testInteract = useContractsStore(state => state.testInteract)
  const [methodTypes, setMethodTypes] = useState<string[] | undefined>(undefined)
  const [availableMethods, setAvailableMethods] = useState<DecodedABI[] | undefined>(undefined)
  const [openTutorial, setOpenTutorial] = useState<boolean>(false)
  const [helper, setHelper] = useState<string>('Please start by selecting for a type of method and a method')
  const { setRpcResponse, setTestInteract, setMethods } = useContractsStore.getState()
  const { invokeContract, provider } = useWalletStore(s => s)

  /**
   * sendRequestToRpc function.
   * This function sends a request to RPC.
   *
   * @param values - The values of the RunMethod form.
   * @param actions - The actions of the form.
   * @param actions.setSubmitting - The function to set the submitting state of the form.
   * @param actions.setStatus - The function to set the status of the form.
   *
   * @returns - The promise that resolves when the request is sent.
   */
  const sendRequestToRpc = useCallback(
    async function sendRequestToRpcFunction(values: RunMethodFormValues, actions: { setSubmitting: any; setStatus: any }) {
      actions.setSubmitting(true)
      setRpcResponse('')

      if (!ETHAddress) {
        return
      }

      await invokeContract(values, { to: ETHAddress })
      actions.setSubmitting(false)
    },
    [ETHAddress, invokeContract, setRpcResponse]
  )

  /**
   * Formik's configuration.
   * This configuration is used for the RunMethod form.
   *
   * @type formik - The Formik configuration.
   * @property {RunMethodFormValues} initialValues - The initial values of the form.
   * @property validationSchema - The validation schema of the form.
   * @property validateOnMount - The flag to validate on mount.
   * @property onSubmit - The submit handler of the form. It is assigned the sendRequestToRpc function.
   */
  const formik: FormikProps<RunMethodFormValues> = useFormik<RunMethodFormValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: sendRequestToRpc,
  })

  /**
   * handleOpenTutorial function.
   * This function opens the tutorial.
   */
  const handleOpenTutorial = useCallback(function handleOpenTutorialFunction() {
    setOpenTutorial(true)
  }, [])
  /**
   * handleCloseTutorial function.
   * This function closes the tutorial and resets the test interaction if it is active.
   */
  const handleCloseTutorial = useCallback(
    function handleCloseTutorialFunction() {
      setOpenTutorial(false)
      if (testInteract) {
        setTestInteract(false)
      }
    },
    [testInteract, setTestInteract]
  )

  // Effect to update helper state based on formik state
  useEffect(() => {
    if (!(!formik.values.method || !formik.values.type || (formik.values.type === 'payable' && !formik.values.amount))) {
      setHelper('')
      return
    }

    // Guard clause for missing method type or method
    if (!formik.values.method || !formik.values.type) {
      setHelper(t('Please select a type of method and a method'))
      return
    }

    // Guard clause for missing payable amount
    if (formik.values.type === 'payable' && !formik.values.amount) {
      setHelper(t('Please specify the amount you want to pay for your transaction. In case you do not know, set the amount to 0.'))
    }
  }, [formik, t, testInteract])

  // Effect to clear formik status on error
  useEffect(() => {
    if (formik.status?.status === 'error' && !formik.isSubmitting) {
      formik.setStatus({})
    }
  }, [formik, formik.values])

  // Effect to open tutorial on test interaction
  useEffect(() => {
    if (testInteract) {
      setOpenTutorial(true)
    }
  }, [testInteract])

  // Effect to update method types and available methods based on ABI and formik type value
  useEffect(() => {
    let filteredMethods = lodash
      .values(abi)
      .filter((a: DecodedABI) => a.name && a.stateMutability)
      .sort((a: DecodedABI, b: DecodedABI) => {
        if (a.name.startsWith('0x')) {
          return 1
        }

        if (b.name.startsWith('0x')) {
          return -1
        }

        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }

        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }

        return 0
      })

    // Update methods in contracts store
    setMethods(filteredMethods)

    const selectedType = formik.values.type

    if (selectedType) {
      filteredMethods = filteredMethods.filter(
        (item: DecodedABI) =>
          selectedType.toLowerCase() === 'all' || (item.stateMutability === selectedType.toLowerCase() && item.name !== '_fallback')
      )
    }

    // Update available methods state
    setAvailableMethods(filteredMethods)

    // Compute unique method types from ABI
    const uniqueMethodTypes = Array.from(
      new Set(
        lodash
          .values(abi)
          .filter((a: DecodedABI) => a.name && a.stateMutability)
          .map(({ stateMutability }: DecodedABI) => stateMutability)
          .flat(1)
      )
    )

    // Update method types state
    setMethodTypes([...uniqueMethodTypes, 'all'])
  }, [abi, formik.values.type, setMethods])

  // Component return
  return (
    <>
      {/* Form */}
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.5rem' }}>
        {/* View only provider alert */}
        {provider === WalletProvider.VIEW_ONLY ? (
          <Alert
            severity="warning"
            variant={'standard'}
            sx={{ isplay: 'flex', alignItems: 'center', padding: '0.25rem 1rem', margin: '0 1rem', background: 'none' }}
          >
            {t(
              "You're using the tracking feature and while tracking an address you can't invoke contracts. To interact with contracts please connect a wallet."
            )}
          </Alert>
        ) : undefined}

        <form onSubmit={formik.handleSubmit}>
          {/* Method */}
          <Method formik={formik} methodTypes={methodTypes} availableMethods={availableMethods} abi={abi} status={status} />

          {/* Pay */}
          {formik.values.type === 'payable' ? <Pay formik={formik} data-testid="pay-component" /> : null}

          {/* Parameters */}
          <Parameters formik={formik} />

          {/* Run */}
          <Buttons formik={formik} handleOpenTutorial={handleOpenTutorial} helper={helper} />

          {/* Tutorial modal */}
          <Modal
            open={openTutorial}
            onClose={handleCloseTutorial}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Tutorial steps={steps(t)} handleCloseTutorial={handleCloseTutorial} />
          </Modal>
        </form>
      </Box>
    </>
  )
}

export default RunMethod
