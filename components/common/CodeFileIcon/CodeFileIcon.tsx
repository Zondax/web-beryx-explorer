import { DataObject, Notes } from '@mui/icons-material'

import EthereumIcon from '../Icons/Ethereum'

/**
 * The getFileExtension function accepts a filename and returns its extension if exists.
 *
 * @param fileName The filename.
 *
 * @returns The file extension in lower case if it exists, null otherwise.
 */
const getFileExtension = (fileName: string): string | null => {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === 0 || lastDotIndex === fileName.length - 1) {
    return null
  }
  return fileName.substring(lastDotIndex + 1).toLowerCase()
}

/**
 * The SourceCodeFileIcon component accepts a filename and determines
 * what icon should be displayed based on the file's extension.
 *
 * @param props The props object.
 * @param props.fileName The filename.
 *
 * @returns An appropriate icon based on the file extension.
 */
const SourceCodeFileIcon = ({ fileName }: { fileName: string }) => {
  switch (getFileExtension(fileName)) {
    case 'sol':
      return <EthereumIcon size={16} className="ethereum-icon" />
    case 'json':
      return <DataObject color={'warning'} className="mui-data-object" />
    default:
      return <Notes className="mui-notes" />
  }
}

export default SourceCodeFileIcon
