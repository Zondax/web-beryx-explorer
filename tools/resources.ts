/**
 * @deprecated This file is deprecated and will be removed in the next major release.
 * @file This file contains utility functions for reading and writing files and folders.
 * @see {@link src/utils/resources.ts}
 */
import { promises as fs } from 'fs'
import path from 'path'

import { File, Folder } from '@/utils/serialize'

/**
 * Reads the content of a folder and its subfolders recursively.
 * @param folderPath - The path of the folder to read.
 * @returns A promise that resolves to an object representing the folder structure.
 */
async function readFolder(folderPath: string): Promise<{ [key: string]: Folder | File }> {
  const files = await fs.readdir(folderPath)
  const result: { [key: string]: Folder | File } = {}

  for (const file of files) {
    if (file !== '.DS_Store') {
      const filePath = path.join(folderPath, file)
      const stats = await fs.stat(filePath)

      if (stats.isDirectory()) {
        const subFiles = await readFolder(filePath)
        result[file] = {
          type: 'folder',
          children: subFiles,
        }
      } else {
        const fileContent = await fs.readFile(filePath, 'utf-8')
        result[file] = {
          type: 'file',
          content: fileContent,
        }
      }
    }
  }

  return result
}

interface ContractFiles {
  title: string
  description: string
  files: {
    [key: string]: Folder | File
  }
}

/**
 * Reads the content of a contract folder and its subfolders recursively.
 * @param folderPath - The path of the contract folder to read.
 * @returns A promise that resolves to an array representing the contract folder structure.
 */
async function readContract(folderPath: string): Promise<ContractFiles[]> {
  const files = await fs.readdir(folderPath)
  const result = []

  for (const file of files) {
    const filePath = path.join(folderPath, file)
    const stats = await fs.stat(filePath)

    if (stats.isDirectory()) {
      if (file !== '.DS_Store') {
        const subFiles = await readFolder(filePath)
        const folderObject = {
          title: file,
          description: '',
          files: subFiles,
        }

        result.push(folderObject)
      }
    }
  }

  return result
}

/**
 * Saves data to a file in JSON format.
 * @param filePath - The path of the file to write to.
 * @param data - The data to write to the file.
 * @returns A promise that resolves when the file has been written.
 */
async function saveToFile(filePath: string, data: ContractFiles[]): Promise<void> {
  const jsonData = JSON.stringify(data, null, 2)
  await fs.writeFile(filePath, jsonData)
}

// Usage example:
/**
 * Main function to read contract and save to file.
 */
async function main() {
  const folderPath = 'public/docs/contracts'
  const contractContent = await readContract(folderPath)

  const outputFile = 'public/docs/test.json'
  await saveToFile(outputFile, contractContent)
}

main()
