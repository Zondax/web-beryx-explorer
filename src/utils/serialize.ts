/**
 * @module serialize
 * @description This module provides utilities for serializing and deserializing data.
 */
import JSZip from 'jszip'

import { captureException } from '@sentry/nextjs'

// Limit for compressed data size (1MB)
const COMPRESSED_DATA_LIMIT = 1024 * 1024

// Limit for decompressed data size (1MB)
const DECOMPRESSED_LIMIT_SIZE = 1024 * 1024

/**
 * Converts a Blob to an ArrayBuffer.
 * @param blob - The Blob to convert.
 * @returns The converted ArrayBuffer.
 */
export function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer
      resolve(arrayBuffer)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(blob)
  })
}

/**
 * Type definition for FileSystemObject.
 * FileSystemObject
 * @property type - The type of the object (either 'file' or 'folder').
 * @property content - The content of the file (only for 'file' type).
 * @property {Record<string, FileSystemObject>} children - The children of the folder (only for 'folder' type).
 */
export type FileSystemObject = File | Folder

/**
 * Interface for Folder.
 * @interface Folder
 * @property type - The type of the object ('folder').
 * @property {Record<string, FileSystemObject>} children - The children of the folder.
 */
export interface Folder {
  type: 'folder'
  children: Record<string, FileSystemObject>
}

/**
 * Interface for File.
 * @interface File
 * @property type - The type of the object ('file').
 * @property content - The content of the file.
 */
export interface File {
  type: 'file'
  content: string
}

/**
 * Transforms an object into a nested form.
 * @param input - The input object.
 * @returns The transformed object.
 */
const transformObject = (input: Record<string, FileSystemObject> | undefined): Record<string, FileSystemObject> | undefined => {
  const output: Record<string, FileSystemObject> = {}

  if (!input) {
    return output
  }

  /**
   * Traverse the input object and transform it into a nested form.
   * @param path - The path of the current item.
   * @param item - The current item.
   * @param currentLevel - The current level of the output object.
   */
  const traverse = (path: string, item: FileSystemObject, currentLevel: Record<string, FileSystemObject>) => {
    const segments = path.split('/').filter(Boolean)
    const name = segments[0]

    if (segments.length === 1) {
      currentLevel[name] = item
    } else {
      if (!currentLevel[name]) {
        currentLevel[name] = { type: 'folder', children: {} }
      }

      if (currentLevel[name] instanceof Object) {
        const thisLevel = currentLevel[name] as Folder
        const nextLevel = thisLevel.children

        const remainingPath = segments.slice(1).join('/')
        traverse(remainingPath, item, nextLevel)
      }
    }
  }

  Object.entries(input).forEach(([path, item]) => {
    traverse(path, item, output)
  })

  return output
}

/**
 * Gets the file extension of a file.
 * @param fileName - The name of the file.
 * @returns The file extension.
 */
const getFileExtension = (fileName: string): string | undefined => {
  const dotIndex = fileName.lastIndexOf('.')
  if (dotIndex !== -1) {
    return fileName.substring(dotIndex + 1).toLowerCase()
  }
  return undefined
}

/**
 * Checks if the compressed size of the data is dangerous.
 * @param data - The data to check.
 * @returns Whether the compressed size is dangerous.
 */
const checkCompressedSize = (data: Blob): boolean => {
  return data.size > COMPRESSED_DATA_LIMIT
}

/**
 * Serializes ZIP files.
 * @param response - The response to serialize.
 * @returns The serialized data.
 */
export const serializeZipFiles = async (response: Blob): Promise<string | undefined> => {
  try {
    const isCompressedSizeDangerous = checkCompressedSize(response)
    const isDecompressedSizeDangerous = await checkDecompressedSize(response)

    if (isCompressedSizeDangerous || isDecompressedSizeDangerous) {
      return ''
    }

    const data = await blobToArrayBuffer(response)
    const zipData = new Uint8Array(data)

    const zip = await JSZip.loadAsync(zipData)
    const filesData: Record<string, FileSystemObject> = {}

    // Iterating over all the files in the ZIP
    // and creating a JSON object with the file names as keys and
    // the file contents as values.
    await Promise.all(
      Object.keys(zip.files).map(async filename => {
        const file = zip.files[filename]
        if (filename.startsWith('__MACOSX/')) {
          return
        }
        if (file.dir) {
          // Handling folders (directories)
          filesData[filename] = { type: 'folder', children: {} }
        } else {
          const fileExtenstion = getFileExtension(filename)

          // Excluding files other than .sol or .json
          if (!fileExtenstion || !['sol', 'json'].includes(fileExtenstion)) {
            return
          }

          // Handling files
          const content = await file.async('text')
          filesData[filename] = { type: 'file', content }
        }
      })
    )

    // Transforming result into nested form
    const filesDataTree = transformObject(filesData)

    // Serializing the filesData object to JSON
    return JSON.stringify(filesDataTree, null, 2)
  } catch (error) {
    captureException(error)
    throw error
  }
}

/**
 * Checks if the decompressed size of the data is dangerous.
 * @param data - The data to check.
 * @returns Whether the decompressed size is dangerous.
 */
async function checkDecompressedSize(data: Blob): Promise<boolean> {
  const zip = new JSZip()
  const contents = await zip.loadAsync(data)

  let totalSize = 0
  for (const filename of Object.keys(contents.files)) {
    const file = contents.files[filename]
    if (!file.dir) {
      const content = await file.async('uint8array')
      totalSize += content.byteLength

      if (totalSize > DECOMPRESSED_LIMIT_SIZE) {
        return true
      }
    }
  }

  return false
}
