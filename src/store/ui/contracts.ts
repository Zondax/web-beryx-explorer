import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { LoadingStatus } from '@/config/config'
import { File, FileSystemObject } from '@/utils/serialize'

import { DecodedABI } from '../../../components/views/ResultsView/ContractView/config'

/**
 * FormInputsProps
 * @property total - The total number of form inputs.
 * @property completed - The number of completed form inputs.
 */
export interface FormInputsProps {
  total: number
  completed: number
}

/**
 * ContractCodeProps
 * @property functions - The functions of the contract code.
 * @property byteCode - The byte code of the contract.
 * @property erc - The ERC standard of the contract.
 * @property opCode - The operation code of the contract.
 * @property sourceCode - The source code of the contract.
 * @property abi - The ABI of the contract.
 * @property selectors - The selectors of the contract.
 */
interface ContractCodeProps {
  functions: string | undefined
  byteCode: string | undefined
  erc: string | undefined
  opCode: string | undefined
  sourceCode: Record<string, FileSystemObject>
  abi: string | undefined
  selectors: { [key: string]: string }
}

/**
 * ContractState
 * @property ethAddress - The Ethereum address of the contract.
 * @property rpcResponse - The RPC response.
 * @property testInteract - A flag indicating whether to test interaction with the contract.
 * @property form - The form state.
 * @property decodingStatus - The status of the decoding process.
 * @property methods - The methods of the contract.
 * @property contractCode - The contract code.
 * @property code - The code state.
 */
interface ContractState {
  ethAddress: string | undefined
  rpcResponse?: any
  testInteract: boolean
  form: {
    isOpen: boolean
    inputs?: FormInputsProps
  }
  decodingStatus: LoadingStatus
  methods: DecodedABI[] | undefined
  contractCode: ContractCodeProps
  code: {
    currentFile: { openedFilesIndex: string; content: string } | undefined
    openedFiles: Record<string, File>
  }
}

/**
 * The initial state of the contract.
 */
const InitialState: ContractState = {
  ethAddress: undefined,
  rpcResponse: undefined,
  testInteract: false,
  form: {
    isOpen: false,
    inputs: undefined,
  },
  decodingStatus: LoadingStatus.Idle,
  methods: undefined,
  contractCode: {
    functions: undefined,
    byteCode: undefined,
    erc: undefined,
    opCode: undefined,
    sourceCode: {},
    abi: undefined,
    selectors: {},
  },
  code: {
    currentFile: undefined,
    openedFiles: {},
  },
}

/**
 * ContractActions
 * @property setRpcResponse - Sets the RPC response.
 * @property setTestInteract - Sets the test interact flag.
 * @property handleForm - Handles the form state.
 * @property setContractCode - Sets the contract code.
 * @property setEthAddress - Sets the Ethereum address.
 * @property setDecodingStatus - Sets the decoding status.
 * @property setMethods - Sets the methods of the contract.
 * @property setSourceCode - Sets the source code of the contract.
 * @property openFile - Opens a file.
 * @property closeFile - Closes a file.
 * @property cleanCode - Cleans the code.
 * @property cleanSourceCode - Cleans the source code of the contract.
 * @property setFormInputs - Sets the form inputs.
 */
interface ContractActions {
  setRpcResponse: (response: any) => void
  setTestInteract: (value: boolean) => void
  handleForm: (value: boolean) => void
  setContractCode: (contractCode: {
    functions: DecodedABI[] | undefined
    byteCode: string | undefined
    erc: any[] | undefined
    opCode: string[] | undefined
    selectors: { [key: string]: string }
  }) => void
  setEthAddress: (ethAddress: string | undefined) => void
  setDecodingStatus: (decodingStatus: LoadingStatus) => void
  setMethods: (methods: DecodedABI[] | undefined) => void
  setSourceCode: (sourceCode: Record<string, FileSystemObject>) => void
  openFile: ({ fileName, file }: { fileName: string; file: File }) => void
  updateCurrentOpenedFile: (fileIndex: number) => void
  closeFile: (fileName: string) => void
  cleanOpenedFiles: () => void
  cleanSourceCode: () => void
  setFormInputs: (inputs: FormInputsProps) => void
}

/**
 * The contracts store.
 * It uses the zustand library for state management and the immer middleware for handling immutable data.
 *
 * @returns The state and actions of the contracts store.
 */
export const useContractsStore = create<ContractState & ContractActions>()(
  immer((set, get) => ({
    ...InitialState,

    setRpcResponse: response => {
      set(state => ({
        ...state,
        rpcResponse: response,
      }))
    },
    setTestInteract: value => {
      set(state => ({
        ...state,
        testInteract: value,
      }))
    },
    handleForm: value => {
      set(state => ({
        ...state,
        form: { isOpen: value },
      }))
    },
    setContractCode: value => {
      const contractCode = { ...get().contractCode, ...value }
      const sourceCode: Record<string, FileSystemObject> = { ...contractCode.sourceCode }

      Object.entries(value).forEach(([name, file]) => {
        sourceCode[name] = { type: 'file', content: file as string } as FileSystemObject
      })
      set(state => ({
        ...state,
        contractCode: { ...contractCode, sourceCode },
      }))
    },
    setEthAddress: value => {
      set(state => ({
        ...state,
        ethAddress: value,
      }))
    },
    setDecodingStatus: value => {
      set(state => ({
        ...state,
        decodingStatus: value,
      }))
    },
    setMethods: value => {
      set(state => ({
        ...state,
        decodingStatus: value,
      }))
    },
    setSourceCode: value => {
      const previousContractCode = get().contractCode
      const updatedSourceCode = {
        ...previousContractCode.sourceCode,
        ...value,
      }

      set(state => ({
        ...state,
        contractCode: {
          ...previousContractCode,
          sourceCode: updatedSourceCode,
        },
      }))
    },
    openFile: ({ fileName, file }: { fileName: string; file: File }) => {
      const openedFiles = { ...get().code.openedFiles }
      openedFiles[fileName] = file

      const index = Object.entries(openedFiles).findIndex(([key]) => key === fileName)

      let currentFile = get().code.currentFile
      if (index === -1) {
        currentFile = undefined
      } else {
        currentFile = { openedFilesIndex: index.toString(), content: file.content }
      }

      set(state => ({
        ...state,
        code: {
          openedFiles,
          currentFile,
        },
      }))
    },
    updateCurrentOpenedFile: (fileIndex: number) => {
      const openedFiles = { ...get().code.openedFiles }
      const fileName = Object.keys(openedFiles)[fileIndex]
      const file = openedFiles[fileName]

      const currentFile = { openedFilesIndex: fileIndex.toString(), content: file.content }

      set(state => ({
        ...state,
        code: {
          openedFiles,
          currentFile,
        },
      }))
    },
    closeFile: (fileName: string) => {
      const codeTab = get().code
      const newOpenedFiles = { ...codeTab.openedFiles }
      delete newOpenedFiles[fileName]

      let newCurrentFile = codeTab.currentFile
      if (!newCurrentFile || newCurrentFile?.openedFilesIndex === '0') {
        newCurrentFile = undefined
      } else {
        const newIndex = Number(newCurrentFile.openedFilesIndex) - 1
        const newFile = newOpenedFiles[Object.keys(newOpenedFiles)[newIndex]]
        newCurrentFile = {
          ...newCurrentFile,
          openedFilesIndex: newIndex.toString(),
          content: newFile.content,
        }
      }
      set(state => ({
        ...state,
        code: {
          ...codeTab,
          openedFiles: newOpenedFiles,
          currentFile: newCurrentFile,
        },
      }))
    },
    cleanOpenedFiles: () => {
      set(state => ({
        ...state,
        code: { currentFile: undefined, openedFiles: {} },
      }))
    },
    cleanSourceCode: () => {
      set(state => ({
        ...state,
        contractCode: {
          functions: undefined,
          byteCode: undefined,
          erc: undefined,
          opCode: undefined,
          sourceCode: {},
          abi: undefined,
          selectors: {},
        },
        rpcResponse: undefined,
      }))
    },
    setFormInputs: (inputs: FormInputsProps) => {
      set(state => ({
        ...state,
        form: {
          inputs,
        },
      }))
    },
  }))
)
