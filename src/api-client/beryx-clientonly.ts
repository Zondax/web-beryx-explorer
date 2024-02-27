import { getBeryxUrl } from '@/config/config'
import { NetworkType } from '@/config/networks'
import { serializeZipFiles } from '@/utils/serialize'

import { authenticatedREST } from './rest'

/**
 * @description Function to get the IPFS data.
 * @param network - The network type.
 * @param ipfs - The IPFS string.
 * @returns The response data.
 */
export const fetchContractIPFS = async (network: NetworkType, ipfs: string) => {
  const restAPI = await authenticatedREST()
  const myUrl = `${getBeryxUrl(network.chainSlug, network.name).backend}/ipfs/${ipfs}`
  const res = await restAPI.get(myUrl)

  const contentType = res.headers['content-type']

  if (contentType === 'application/zip') {
    const blob = await res.data.blob()
    return {
      files: await serializeZipFiles(blob),
    }
  }

  const textData = await res.data
  return {
    files: JSON.stringify({ 'untitled.sol': { type: 'file', content: textData } }, null, 2),
  }
}
