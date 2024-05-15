import { useCallback } from 'react'

import { fetchContractIPFS } from '@/api-client/beryx-clientonly'
import useAppSettingsStore from '@/store/ui/settings'
import { downloadSourceCode } from '@/utils/download'
import { FileSystemObject } from '@/utils/serialize'
import { Download } from '@carbon/icons-react'
import { Button } from '@mui/material'
import { captureException } from '@sentry/nextjs'

/**
 * Component for downloading IPFS data.
 * @param props - Component props.
 * @param props.CID - The CID of the IPFS data to download.
 */
export const DownloadIpfs = ({ CID }: { CID: string }) => {
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  /**
   * Function to download the source code from IPFS.
   * @async
   */
  const downloadCode = useCallback(async () => {
    try {
      const ipfsData = await fetchContractIPFS(network, CID)

      if (ipfsData.files) {
        const files = ipfsData.files

        if (!files) {
          return
        }
        const code: Record<string, FileSystemObject> = { 'Source Code': { type: 'folder', children: JSON.parse(files) } }
        await downloadSourceCode(code, 'SourceCode')
      }
    } catch (err) {
      captureException(err)
      throw err
    }
  }, [network, CID])

  /**
   * Render the download button.
   */
  return (
    <Button variant={'outlined'} size="small" endIcon={<Download />} aria-label="Download" onClick={downloadCode}>
      Source Code
    </Button>
  )
}
