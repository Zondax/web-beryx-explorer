/**
 * @file This file contains utility functions for downloading files.
 */
import JSZip from 'jszip'

import { File, FileSystemObject } from './serialize'

/**
 * ContentTypes
 * @description Defines the types of content that can be downloaded.
 */
export type ContentTypes = 'text/plain' | 'application/json' | string

/**
 * @function getContentType
 * @description Returns the content type based on the provided type.
 * @param type - The type of content.
 * @returns - The content type.
 */
export const getContentType = (type: string): ContentTypes => {
  switch (type) {
    case 'string':
      return 'text/plain'
    case 'object':
    default:
      return 'application/json'
  }
}

/**
 * @function getFormattedBody
 * @description Returns the formatted content based on the provided type.
 * @param content - The content to be formatted.
 * @param type - The type of content.
 * @returns - The formatted content.
 */
export const getFormattedBody = (content: string, type?: ContentTypes) => {
  switch (type) {
    case 'text/plain':
      return content.toString().replace(/\n/g, String.fromCharCode(13))
    case 'application/json':
      return JSON.stringify(content, null, 2)
    default:
      return content
  }
}

/**
 * @function downloadTxtFile
 * @description Downloads a text file with the provided content, file name, type, and extension.
 * @param content - The content of the file.
 * @param fileName - The name of the file.
 * @param type - The type of content.
 * @param extension - The extension of the file.
 */
export const downloadTxtFile = (content: any, fileName: string, type: ContentTypes, extension: string) => {
  // file object
  const file = new Blob([getFormattedBody(content, type)], { type: 'text/plain' })
  // anchor link
  const element = document.createElement('a')
  element.href = URL.createObjectURL(file)
  element.download = `${fileName}-${Date.now()}${extension}`
  // simulate link click
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

/**
 * @function addFile
 * @description Adds a file to the provided zip file.
 * @param zip - The zip file.
 * @param fileName - The name of the file.
 * @param fileContent - The content of the file.
 */
const addFile = (zip: JSZip, fileName: string, fileContent: File) => {
  const file = new Blob([getFormattedBody(fileContent.content, 'text/plain')], { type: 'text/plain' })
  zip.file(`${fileName.replace('.sol', '')}.sol`, file)
}

/**
 * @function addFolder
 * @description Adds a folder to the provided zip file.
 * @param zip - The zip file.
 * @param children - The children of the folder.
 */
const addFolder = (zip: JSZip, children: Record<string, FileSystemObject>) => {
  for (const [fileName, fileContent] of Object.entries(children)) {
    if (fileContent.type === 'file') {
      addFile(zip, fileName, fileContent)
    } else {
      const newFolder = zip.folder(fileName)
      if (newFolder) {
        addFolder(newFolder, fileContent.children)
      }
    }
  }
}

/**
 * @function downloadSourceCode
 * @description Downloads the source code of the provided files.
 * @param files - The files to be downloaded.
 * @param zipName - The name of the zip file.
 */
export const downloadSourceCode = async (files: Record<string, FileSystemObject>, zipName = 'files') => {
  const zip = new JSZip()

  for (const [fileName, fileContent] of Object.entries(files)) {
    if (fileContent.type === 'file') {
      addFile(zip, fileName, fileContent)
    } else if (fileContent.type === 'folder') {
      const newFolder = zip.folder(fileName)
      if (newFolder) {
        addFolder(newFolder, fileContent.children)
      }
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, `${zipName}.zip`)
}

/**
 * @function downloadBlob
 * @description Downloads a blob with the provided file name.
 * @param blob - The blob to be downloaded.
 * @param fileName - The name of the file.
 */
function downloadBlob(blob: Blob, fileName: string): void {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
