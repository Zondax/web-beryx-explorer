import { useEffect } from 'react'

import { useContractsStore } from '@/store/ui/contracts'
import { File } from '@/utils/serialize'
import { useMediaQuery, useTheme } from '@mui/material'

import ContractFilesDesktop from './ContractFilesDesktop'
import ContractFilesMobile from './ContractFilesMobile'

/**
 * Component to render the contract files. On medium and larger screens, it will render a desktop view.
 * On smaller screens, it will render a mobile view.
 */
const ContractFiles = () => {
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

  const sourceCode = useContractsStore(state => state.contractCode.sourceCode)
  const openFile = useContractsStore.getState().openFile

  /**
   * If source code is available, find the first file in the source code and open it.
   */
  useEffect(() => {
    if (sourceCode) {
      const firstFile = Object.entries(sourceCode).find(([_, value]) => value.type === 'file')
      if (firstFile) {
        openFile({ fileName: firstFile[0], file: firstFile[1] as File })
      }
    }
  }, [sourceCode, openFile])

  /**
   * If the viewport is medium or larger, render the desktop view. Otherwise, render the mobile view.
   */
  if (upMd) {
    return <ContractFilesDesktop />
  }

  return <ContractFilesMobile />
}

export default ContractFiles
