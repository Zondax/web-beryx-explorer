import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { File } from '@/utils/serialize'

/**
 * @interface ResourcesState
 * @description Interface for the resources state
 */
interface ResourcesState {
  isOpen: boolean
  currentPage: string | undefined
  documentationCurrentFile: string | undefined
  currentContract: string | undefined
  currentContractOpenedFiles: Record<string, File>
  currentContractOpenedFile: { openedFilesIndex: string } | undefined
}

/**
 * @constant InitialState
 * @description Initial state for the resources
 */
const InitialState: ResourcesState = {
  isOpen: false,
  currentPage: undefined,
  documentationCurrentFile: undefined,
  currentContract: undefined,
  currentContractOpenedFile: undefined,
  currentContractOpenedFiles: {},
}

/**
 * @interface ResourcesActions
 * @description Interface for the resources actions
 */
interface ResourcesActions {
  setIsOpen: (isOpen: boolean) => void
  setCurrentPage: (page: string | undefined) => void
  setDocumentationCurrentFile: (content: string | undefined) => void
  setCurrentContract: (contractName: string | undefined) => void
  openFile: (fileName: string, file: File) => void
  closeFile: (fileName: string) => void
  clearCurrentContractOpenedFiles: () => void
}

/**
 * @function useResourcesStore
 * @description Zustand store for resources
 * @returns {ResourcesState & ResourcesActions}
 */
export const useResourcesStore = create<ResourcesState & ResourcesActions>()(
  immer((set, get) => ({
    ...InitialState,
    setIsOpen: (isOpen: boolean) => {
      set({ isOpen })
    },
    setDocumentationCurrentFile: (content: string | undefined) => {
      set({ documentationCurrentFile: content })
    },
    setCurrentPage: (page: string | undefined) => {
      set({ currentPage: page })
    },
    setCurrentContract: (contractName: string | undefined) => {
      set({ currentContract: contractName })
    },
    openFile: (fileName: string, file: File) => {
      const openedFiles = get().currentContractOpenedFiles || {}
      openedFiles[fileName] = file

      const index = Object.entries(openedFiles).findIndex(([key]) => key === fileName)

      if (index === -1) {
        set({
          currentContractOpenedFile: undefined,
          currentContractOpenedFiles: openedFiles,
        })
        return
      }
      set({
        currentContractOpenedFile: { openedFilesIndex: index.toString() },
        currentContractOpenedFiles: openedFiles,
      })
    },
    closeFile: (fileName: string) => {
      const openedFiles = get().currentContractOpenedFiles
      const currentFile = get().currentContractOpenedFile
      delete openedFiles[fileName]

      if (!currentFile || currentFile?.openedFilesIndex === '0') {
        set({
          currentContractOpenedFile: undefined,
        })
        return
      }
      set({
        currentContractOpenedFile: { openedFilesIndex: (Number(currentFile.openedFilesIndex) - 1).toString() },
      })
    },
    clearCurrentContractOpenedFiles: () => {
      set({ currentContractOpenedFiles: undefined })
    },
  }))
)
