import axios from 'axios'
import BigNumber from 'bignumber.js'
import { Signature as EthersSignature, Transaction } from 'ethers'
import { Address, Message, RPC, Signature } from 'iso-filecoin'
import { IAddress } from 'iso-filecoin/address'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { fetchBeryxApiToken } from '@/api-client/apiTokens'
import { fetchAccountBalance } from '@/api-client/beryx'
import { amountFormat, getBeryxUrl } from '@/config/config'
import { NetworkType, Networks } from '@/config/networks'
import { formatBalance } from '@/utils/format'
import { serializeMessageBody } from '@/utils/transaction'
import { encode } from '@ipld/dag-cbor'
import Transport from '@ledgerhq/hw-transport'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { captureException } from '@sentry/nextjs'
import { FilEthAddress } from '@zondax/izari-filecoin/address'
import { NetworkPrefix } from '@zondax/izari-filecoin/artifacts'
import FilecoinApp from '@zondax/ledger-filecoin'

import { RunMethodFormValues, availableUnits } from '../../../components/views/ResultsView/ContractView/RunMethod/config'
import { useContractsStore } from '../ui/contracts'
import { useNotificationsStore } from '../ui/notifications'
import useAppSettingsStore from '../ui/settings'
import useWalletStore, { ConnectionResponse } from './wallet'

const FIL_BASE_DERIVATION_PATH = "m/44'/461'/0'/0/"
const ETH_BASE_DERIVATION_PATH = "m/44'/60'/0'/0/"
const TESTNET_BASE_DERIVATION_PATH = "m/44'/1'/0'/0/"

export enum LedgerWalletError {
  DEVICE_LOCKED = 'Device Locked',
  APP_NOT_OPENED = 'App not opened',
  WRONG_APP = 'Wrong app',
  TRANSPORT_NO_DEVICE_SELECTED = 'No device selected',
  UNKNOWN_TRANSPORT_ERROR = 'Transport error',
  UNKNOWN_APP_ERROR = 'App error',
  UNKNOWN_ERROR = 'Unknown error',
}

const decodeLedgerResponseCode = (errorCode: number): LedgerWalletError | undefined => {
  switch (errorCode) {
    case 21781:
      return LedgerWalletError.DEVICE_LOCKED
    case 28161:
      return LedgerWalletError.APP_NOT_OPENED
    case 28160:
      return LedgerWalletError.WRONG_APP
    default:
      return undefined
  }
}

export const getChainId = (app: 'FIL' | 'ETH', network: NetworkType) => {
  return app === 'FIL' ? (network.isTestnet ? 1 : 461) : 60
}

export type DeviceTypes = 'nanos' | 'nanos_plus' | 'nanox' | 'stax'

export const deviceTypes: { [key in DeviceTypes]: string } = {
  stax: 'stax',
  nanos_plus: 'nanosp',
  nanox: 'nanox',
  nanos: 'nanos',
}

export const deviceNames: { [key in DeviceTypes]: string } = {
  stax: 'Nano Stax',
  nanos_plus: 'Nano S Plus',
  nanox: 'Nano X',
  nanos: 'Nano S',
}

export interface LedgerAddress {
  addressIndex: number
  path: string
  address: string
  ethAddress?: string
  balance?: string
}

export interface DeviceConnectionProps {
  transport: Transport
  filApp: FilecoinApp
}

interface LedgerWalletState {
  deviceConnection: DeviceConnectionProps | undefined
  app: 'FIL' | 'ETH'
  isLoading: boolean
  error: LedgerWalletError | undefined
  isChoosingAddress: boolean
  isSigning: boolean
  selectedAddress: LedgerAddress | undefined
  addressList: LedgerAddress[] | undefined
}

export const InitialWalletState: LedgerWalletState = {
  deviceConnection: undefined,
  app: 'FIL',
  isLoading: false,
  error: undefined,
  isChoosingAddress: false,
  isSigning: false,
  selectedAddress: undefined,
  addressList: undefined,
}

interface LedgerWalletActions {
  setStatus: (isLoading: boolean, error?: LedgerWalletError) => void
  setApp: (app: 'FIL' | 'ETH') => void
  setIsChoosingAddress: (isChoosingAddress: boolean) => void
  setSelectedAddress: (address: LedgerAddress) => void
  addAddress: (addressIndex: number) => Promise<LedgerAddress | undefined>
  getFirstAddresses: () => Promise<LedgerAddress[] | undefined>
  getBalances: () => Promise<LedgerAddress[] | undefined>
  removeAddress: (addressIndex: number) => void
  getConnection: () => Promise<DeviceConnectionProps | undefined>
  connectWallet: () => Promise<ConnectionResponse | undefined>
  clearConnection: () => void
  disconnect: () => void
  invokeContract: (invokeData: RunMethodFormValues, to: string) => void
  invokeContractRead: (invokeData: RunMethodFormValues, to: string) => Promise<void>
  invokeContractETH: (invokeData: RunMethodFormValues, to: string) => Promise<void>
  invokeContractFIL: (invokeData: RunMethodFormValues, to: string) => Promise<undefined>
}

const getBaseDerivationPath = (app: 'FIL' | 'ETH', network: NetworkType): string => {
  switch (app) {
    case 'FIL':
      if (network.isTestnet) {
        return TESTNET_BASE_DERIVATION_PATH
      }
      return FIL_BASE_DERIVATION_PATH
    case 'ETH':
      return ETH_BASE_DERIVATION_PATH
  }
}

export const useLedgerWalletStore = create<LedgerWalletState & LedgerWalletActions>()(
  immer((set, get) => ({
    ...InitialWalletState,
    setStatus: (isLoading, error) => set(s => ({ ...s, isLoading, error })),
    setApp: app => {
      set(s => ({ ...s, app }))

      get().getFirstAddresses()
    },
    setIsChoosingAddress: isChoosingAddress => set(s => ({ ...s, isChoosingAddress })),
    setSelectedAddress: address => {
      useWalletStore.getState().changeAddress(address.address, address.ethAddress)
      set(s => ({ ...s, selectedAddress: address, isChoosingAddress: false }))
    },
    addAddress: async (addressIndex: number): Promise<LedgerAddress | undefined> => {
      try {
        const { app, deviceConnection } = get()
        const { network } = useAppSettingsStore.getState()

        const ledgerApp = deviceConnection?.filApp
        const baseDerivationPath = getBaseDerivationPath(app, network)

        // Get address at index
        const path = `${baseDerivationPath}${addressIndex}`
        let addressResponse
        if (app === 'ETH') {
          addressResponse = await ledgerApp?.getETHAddress(path)
        } else {
          addressResponse = await ledgerApp?.getAddressAndPubKey(path)
        }
        const errorMessage = decodeLedgerResponseCode(addressResponse.return_code)
        if (errorMessage) {
          set(s => ({ ...s, error: errorMessage }))
          return
        }

        let address: string
        let ethAddress: string | undefined
        if (app === 'ETH') {
          ethAddress = addressResponse.address
          const filAddr = FilEthAddress.fromEthAddress(NetworkPrefix.Mainnet, addressResponse.address)
          address = filAddr.toString()
        } else {
          address = addressResponse.addrString
        }

        const addressList = get().addressList || []
        const ledgerAddress: LedgerAddress = { addressIndex, path: addressResponse.path, address, ethAddress }
        const updatedAddressList = addressList.concat([ledgerAddress]).sort((a, b) => a.addressIndex - b.addressIndex)
        set(s => ({ ...s, addressList: updatedAddressList }))

        // get balance for address
        get().getBalances()

        return ledgerAddress
      } catch (error) {
        return
      }
    },
    getFirstAddresses: async () => {
      const { app, deviceConnection } = get()
      const { network } = useAppSettingsStore.getState()

      const ledgerApp = deviceConnection?.filApp
      const baseDerivationPath = getBaseDerivationPath(app, network)

      set(s => ({ ...s, addressList: undefined }))

      const addressList: {
        addressIndex: number
        path: string
        address: string
        ethAddress?: string
        balance?: string
      }[] = []

      // Get first 3 addresses
      for (let i = 0; i < 3; i++) {
        try {
          const path = `${baseDerivationPath}${i}`
          let addressResponse
          if (app === 'ETH') {
            addressResponse = await ledgerApp?.getETHAddress(path)
          } else {
            addressResponse = await ledgerApp?.getAddressAndPubKey(path)
          }
          const errorMessage = decodeLedgerResponseCode(addressResponse.return_code)
          if (errorMessage) {
            set(s => ({ ...s, error: errorMessage }))
            return
          }

          let address
          let ethAddress
          if (app === 'ETH') {
            ethAddress = addressResponse.address
            const filAddr = FilEthAddress.fromEthAddress(NetworkPrefix.Mainnet, addressResponse.address)
            address = filAddr.toString()
            if (network.isTestnet) {
              if (address.charAt(0) === 'f') {
                address = `t${address.slice(1)}`
              }
            }
          } else {
            address = addressResponse.addrString
          }

          addressList.push({
            addressIndex: i,
            path,
            address,
            ethAddress,
          })
        } catch (error) {
          set(s => ({ ...s, error: LedgerWalletError.UNKNOWN_APP_ERROR }))
          return
        }
      }
      set(s => ({ ...s, addressList }))

      get().getBalances()

      set(s => ({ ...s, addressList }))
      return addressList
    },
    getBalances: async () => {
      const { addressList } = get()
      const { network } = useAppSettingsStore.getState()

      if (!addressList) {
        return
      }

      // Get balance for each address
      const updatedAddressList = addressList.map(async addressObj => {
        try {
          const balanceResp = await fetchAccountBalance(addressObj.address, network)

          const amount = BigNumber(formatBalance(balanceResp.balances))
          const formatCondition = amount.toFixed().split('.')[0].length > 8 || amount.eq(0)
          const formatedBalance = amount.dp(formatCondition ? 2 : 4, BigNumber.ROUND_DOWN).toFormat(formatCondition ? 2 : 4, amountFormat)
          return { ...addressObj, balance: formatedBalance }
        } catch (error) {
          return addressObj
        }
      })

      const result = await Promise.all(updatedAddressList)
      set(s => ({ ...s, addressList: result, selectedAddress: result[0] }))
      return result
    },
    removeAddress: (addressIndex: number) => {
      const addressList = get().addressList
      if (!addressList) {
        return
      }
      set(s => ({ ...s, addressList: addressList.filter(address => address.addressIndex !== addressIndex) }))
    },
    getConnection: async (): Promise<DeviceConnectionProps | undefined> => {
      let { deviceConnection } = get()

      let transport: Transport | undefined = deviceConnection?.transport
      let filApp: FilecoinApp | undefined = deviceConnection?.filApp

      set(s => ({ ...s, isLoading: true, error: undefined }))

      try {
        // Establish transport and add disconnect event listener
        if (!transport) {
          transport = await TransportWebUSB.create()
          transport.on('disconnect', () => {
            useWalletStore.getState().disconnectWallet()
          })
        }

        // Establish filApp
        if (!filApp) {
          filApp = new FilecoinApp(transport)
        }

        // Check if device is locked. Getting version should add an error code if device is locked.
        await filApp.getVersion()
        const errorMessage = decodeLedgerResponseCode(filApp?.versionResponse?.return_code)
        if (errorMessage) {
          set(s => ({ ...s, isLoading: false, error: errorMessage }))
          return
        }

        deviceConnection = { transport, filApp }
        set(s => ({ ...s, deviceConnection, error: undefined, isLoading: false }))
        return deviceConnection
      } catch (e: any) {
        if (e && e.message && e.message.includes('No device selected')) {
          set(s => ({ ...s, isLoading: false, error: LedgerWalletError.TRANSPORT_NO_DEVICE_SELECTED }))
          return
        }
        set(s => ({ ...s, isLoading: false, error: LedgerWalletError.UNKNOWN_ERROR }))
        return
      }
    },
    connectWallet: async (): Promise<ConnectionResponse | undefined> => {
      try {
        const { deviceConnection, getConnection } = get()
        const { network } = useAppSettingsStore.getState()

        set(s => ({ ...s, isLoading: true, error: undefined }))

        const transport = deviceConnection?.transport
        const filApp = deviceConnection?.filApp

        // Establish connection if not already established
        if (!transport || !filApp) {
          const connection = await getConnection()
          if (!connection) {
            // errors are handeled by getConnection()
            set(s => ({ ...s, isLoading: false }))
            return {
              connectionError: true,
              error: { message: get().error },
            }
          }
        }

        // Get the first 3 addresses
        const addresses = await get().getFirstAddresses()

        if (!addresses) {
          set(s => ({ ...s, error: LedgerWalletError.UNKNOWN_ERROR, isLoading: false }))
          return {
            connectionError: true,
          }
        }
        // Successfully connected and established addresses
        set(s => ({ ...s, isLoading: false }))
        return {
          filAddr: addresses[0].address,
          ethAddr: addresses[0].ethAddress,
          network,
        }
      } catch (err) {
        set(s => ({ ...s, error: LedgerWalletError.UNKNOWN_ERROR, isLoading: false }))
        return {
          error: err,
          connectionError: true,
        }
      }
    },
    clearConnection: () => set(s => ({ ...s, deviceConnection: undefined })),
    disconnect: () => {
      set(() => ({
        ...InitialWalletState,
      }))
    },
    invokeContract: (invokeData: RunMethodFormValues, to: string) => {
      const { app, invokeContractETH, invokeContractFIL, invokeContractRead } = get()

      if (invokeData.type === 'view' || invokeData.type === 'pure') {
        invokeContractRead(invokeData, to)
      } else {
        if (app === 'FIL') {
          invokeContractFIL(invokeData, to)
        } else {
          invokeContractETH(invokeData, to)
        }
      }
    },
    invokeContractRead: async (invokeData: RunMethodFormValues, to: string): Promise<void> => {
      const authToken = await fetchBeryxApiToken()
      const { network } = useAppSettingsStore.getState()
      let errorMessage: string | undefined

      // call the contract with read method
      try {
        // extablish receiver (to) address
        const toAddress: string = to

        // serialize invoke data
        let serializedInvokeData: string
        try {
          serializedInvokeData = `0x${serializeMessageBody(invokeData).slice(2)}`
        } catch (e) {
          errorMessage = 'Failed to serialize the invoke data'
          throw e
        }

        const response = await axios.post(
          getBeryxUrl(network.chainSlug, network.name).node,
          {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
              {
                to: toAddress,
                data: serializedInvokeData,
              },
              'latest',
            ],
            id: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        useContractsStore.getState().setRpcResponse(response.data)
      } catch (error) {
        useNotificationsStore.getState().addNotification({
          title: 'Error invoking contract',
          description: errorMessage,
          status: 'error',
          tag: ['wallet', 'ledger'],
        })
        captureException(`Error invoking contract (read method): ${error}`)
      }
    },
    invokeContractFIL: async (invokeData: RunMethodFormValues, to: string) => {
      const { deviceConnection, selectedAddress } = get()
      let errorMessage: string | undefined
      const { network } = useAppSettingsStore.getState()
      const filApp = deviceConnection?.filApp

      try {
        // declare RPC (iso-filecoin)
        const rpc = new RPC.RPC({ api: getBeryxUrl(network.chainSlug, network.name).node, network: 'testnet' })

        // extablish receiver (to) address
        const toAddress = Address.fromEthAddress(to, network.isTestnet ? 'testnet' : 'mainnet') // convert from ETh to FIL address

        // extablish sender (from) address
        let fromAddress: IAddress | undefined
        let fromAddressDerivationPath: string
        try {
          if (!selectedAddress) {
            throw new Error('No selected address')
          }
          fromAddress = Address.fromString(selectedAddress.address)
          fromAddressDerivationPath = selectedAddress.path
        } catch (e) {
          errorMessage = 'Failed to deterine the wallet address'
          throw e
        }

        // establish value
        let value = '0'
        try {
          if (invokeData.type === 'payable' && invokeData.amount && invokeData.unitAmount) {
            const convertedValue = availableUnits[invokeData.unitAmount](invokeData.amount.toString())
            value = convertedValue.toAtto()
          }
        } catch (e) {
          errorMessage = 'Value establishment failed'
          throw e
        }

        // serialize invoke data
        let serialisedParams, buffer, encodedCBORParams, base64encodedParams
        try {
          serialisedParams = serializeMessageBody(invokeData).slice(2)
          buffer = Buffer.from(serialisedParams, 'hex')
          encodedCBORParams = encode(buffer)
          base64encodedParams = Buffer.from(encodedCBORParams).toString('base64')
        } catch (e) {
          errorMessage = 'Failed to serialize the invoke data'
          throw e
        }

        // form initial transaction/message object
        const tx = {
          from: fromAddress.toString(),
          to: toAddress.toString(),
          value,
          gasLimit: 0, // Placeholder value, to be determined
          gasFeeCap: '0', // Placeholder value, to be determined
          gasPremium: '0', // Placeholder value, to be determined
          method: 3844450837, // Standard for invoke EVM Contract https://docs.filecoin.io/smart-contracts/filecoin-evm-runtime/actor-types#calling
          params: base64encodedParams,
          nonce: 0, // Placeholder value, to be determined
        }

        // prepare message (get nonce and gas prices)
        let message
        try {
          message = new Message.Message(tx)
          await message.prepare(rpc)
        } catch (e) {
          errorMessage = 'Failed to gather gas prices'
          throw e
        }

        // sign the message
        let signedMessage
        try {
          set(s => ({ ...s, isSigning: true }))
          const encodedMessage = message.serialize()
          signedMessage = await filApp?.sign(fromAddressDerivationPath, encodedMessage)

          if (signedMessage.error_message && signedMessage.error_message !== 'No error' && signedMessage.return_code !== 36864) {
            throw new Error(signedMessage.error_message)
          }
          set(s => ({ ...s, isSigning: false }))
        } catch (e) {
          set(s => ({ ...s, isSigning: false }))
          errorMessage = 'Failed to sign the message. Please try again, but with an EVM native address. This can be done in the wallet.'
          throw e
        }

        // push the message
        try {
          const signature = new Signature.Signature({
            type: 'SECP256K1',
            data: signedMessage.signature_compact,
          })
          const authToken = await fetchBeryxApiToken()
          const base64encodedSignature = Buffer.from(signature.data).toString('base64')

          const response = await axios.post(
            `${getBeryxUrl(network.chainSlug, network.name).mempool}/push`,
            {
              Message: {
                To: message.to,
                From: message.from,
                Nonce: message.nonce,
                Value: message.value,
                Params: message.params,
                GasFeeCap: message.gasFeeCap,
                GasPremium: message.gasPremium,
                GasLimit: message.gasLimit,
                Method: message.method,
              },
              Signature: {
                Type: 1,
                Data: base64encodedSignature,
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          )

          useNotificationsStore.getState().addNotification({
            title: 'Transaction sent to the mempool',
            network: Networks.calibration,
            tx_to: to ?? undefined,
            tx_hash: response.data.cid,
            value: `${invokeData.amount ?? 0} ${invokeData.unitAmount}`,
            status: 'mempool',
            tag: ['interact'],
            method: 'InvokeContract',
          })
        } catch (e) {
          errorMessage = 'Failed to push the message to mempool'
          throw e
        }
      } catch (err) {
        useNotificationsStore.getState().addNotification({
          title: 'Error invoking contract',
          description: errorMessage,
          status: 'error',
          tag: ['wallet', 'ledger'],
        })
        captureException(`Error invoking contract (write method): ${err}`)
      }
    },
    invokeContractETH: async (invokeData: RunMethodFormValues, to: string): Promise<void> => {
      const { deviceConnection, selectedAddress } = get()
      const { network } = useAppSettingsStore.getState()
      const authToken = await fetchBeryxApiToken()
      let errorMessage: string | undefined
      const filApp = deviceConnection?.filApp

      try {
        // extablish receiver (to) address
        const toAddress: string = to

        // extablish sender (from) address and its derivation path
        let fromAddress: string
        let fromAddressDerivationPath: string
        try {
          if (!selectedAddress) {
            throw new Error('No selected address')
          }
          fromAddress = selectedAddress.ethAddress ?? FilEthAddress.fromString(selectedAddress.address).toEthAddressHex(true)
          fromAddressDerivationPath = selectedAddress.path
        } catch (e) {
          errorMessage = 'Failed to deterine the wallet address'
          throw e
        }

        // serialize invoke data
        let serializedInvokeData: string
        try {
          serializedInvokeData = `'0x${serializeMessageBody(invokeData).slice(2)}`
        } catch (e) {
          errorMessage = 'Failed to serialize the invoke data'
          throw e
        }

        // establish value
        let value = '0x0'
        try {
          if (invokeData.type === 'payable' && invokeData.amount && invokeData.unitAmount) {
            const convertedValue = availableUnits[invokeData.unitAmount](invokeData.amount.toString())
            value = convertedValue.toAtto()
            value = `0x${BigInt(value).toString(16)}`
          }
        } catch (e) {
          errorMessage = 'Value establishment failed'
          throw e
        }

        // get nonce
        let nonce
        try {
          const nonceResponse = await axios.post(
            getBeryxUrl(network.chainSlug, network.name).node,
            {
              jsonrpc: '2.0',
              method: 'eth_getTransactionCount',
              params: [fromAddress, 'latest'],
              id: 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          nonce = nonceResponse.data.result
        } catch (e) {
          errorMessage = 'Failed to get the nonce'
          throw e
        }

        // form initial transaction/message object
        const ethereumTx = {
          from: fromAddress.toString(),
          to: toAddress.toString(),
          value,
          gas: '0x00', // Placeholder value, to be determined
          gasPrice: '0x00', // Placeholder value, to be determined
          nonce,
          chainId: network.chainId, //314159 for calibration 0x4cb2f or 314 for Mainnet 0x13a
          data: serializedInvokeData,
        }

        // gas price
        let gasPrice
        try {
          const gasPriceResponse = await axios.post(
            getBeryxUrl(network.chainSlug, network.name).node,
            {
              jsonrpc: '2.0',
              method: 'eth_gasPrice',
              params: [],
              id: 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          gasPrice = gasPriceResponse.data.result
        } catch (e) {
          errorMessage = 'Failed to get the gas price'
          throw e
        }

        // max priority fee per gas
        let maxPriorityFeePerGas
        try {
          const maxPriorityFeePerGasResponse = await axios.post(
            getBeryxUrl(network.chainSlug, network.name).node,
            {
              jsonrpc: '2.0',
              method: 'eth_maxPriorityFeePerGas',
              params: [],
              id: 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          maxPriorityFeePerGas = maxPriorityFeePerGasResponse.data.result
        } catch (e) {
          errorMessage = 'Failed to get the max priority fee per gas'
          throw e
        }

        // estimate gas
        let gasLimit
        try {
          const gasResponse = await axios.post(
            getBeryxUrl(network.chainSlug, network.name).node,
            {
              jsonrpc: '2.0',
              method: 'eth_estimateGas',
              params: [
                {
                  from: ethereumTx.from,
                  to: ethereumTx.to,
                  gasPrice: ethereumTx.gasPrice,
                  value: ethereumTx.value,
                  data: ethereumTx.data,
                },
                'latest',
              ],
              id: 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          gasLimit = gasResponse.data.result
          gasLimit = `0x${(parseInt(gasLimit, 16) * 2).toString(16)}`
        } catch (e) {
          errorMessage = 'Failed to get the gas limit'
          throw e
        }

        // serialize the transaction
        let serializedTx
        const ethersTx = new Transaction()
        try {
          ethersTx.to = ethereumTx.to
          ethersTx.value = ethereumTx.value
          ethersTx.data = ethereumTx.data
          ethersTx.gasLimit = gasLimit
          ethersTx.gasPrice = gasPrice
          ethersTx.maxPriorityFeePerGas = maxPriorityFeePerGas
          ethersTx.maxFeePerGas = `0x${(parseInt(gasLimit, 16) + parseInt(maxPriorityFeePerGas, 16)).toString(16)}`
          ethersTx.nonce = ethereumTx.nonce
          ethersTx.chainId = ethereumTx.chainId
          ethersTx.type = 2

          serializedTx = Buffer.from(ethersTx.unsignedSerialized.slice(2), 'hex')
        } catch (e) {
          errorMessage = 'Failed to serialize the unsigned transaction'
          throw e
        }

        // sign the message
        let signature
        try {
          set(s => ({ ...s, isSigning: true }))
          const signatureResponse = await filApp?.signETHTransaction(fromAddressDerivationPath, serializedTx.toString('hex'), null)

          //Parse the signature
          signatureResponse.r = `0x${signatureResponse.r}`
          signatureResponse.s = `0x${signatureResponse.s}`
          signatureResponse.v = parseInt(`0x${signatureResponse.v}`)

          signature = EthersSignature.from({ r: signatureResponse.r, s: signatureResponse.s, v: signatureResponse.v })
          ethersTx.signature = signature
          set(s => ({ ...s, isSigning: false }))
        } catch (e) {
          set(s => ({ ...s, isSigning: false }))
          errorMessage = 'Failed to sign the message'
          throw e
        }

        let serializedSignedTx
        try {
          serializedSignedTx = ethersTx.serialized
        } catch (e) {
          errorMessage = 'Failed to serialize the signed transaction'
          throw e
        }

        // push the message
        try {
          const response = await axios.post(
            getBeryxUrl(network.chainSlug, network.name).node,
            {
              jsonrpc: '2.0',
              method: 'eth_sendRawTransaction',
              params: [serializedSignedTx],
              id: 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            }
          )

          if (response.data.error) {
            errorMessage = response.data.error.message
            throw new Error(response.data.error.message)
          }

          useNotificationsStore.getState().addNotification({
            title: 'Transaction sent to the mempool',
            network: Networks.calibration,
            tx_to: to ?? undefined,
            tx_hash: response.data.result,
            value: `${invokeData.amount ?? 0} ${invokeData.unitAmount}`,
            status: 'mempool',
            tag: ['interact'],
            method: 'InvokeContract',
          })
        } catch (e) {
          errorMessage = 'Failed to interact with the contract'
          throw e
        }
      } catch (err) {
        useNotificationsStore.getState().addNotification({
          title: 'Error invoking contract',
          description: errorMessage,
          status: 'error',
          tag: ['wallet', 'ledger'],
        })
        captureException(`Error invoking contract (write method, EVM): ${err}`)
      }
    },
  }))
)
