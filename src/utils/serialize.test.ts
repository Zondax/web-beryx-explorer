import JSZip from 'jszip'

import { blobToArrayBuffer, serializeZipFiles } from './serialize'

/**
 * Test suite for blobToArrayBuffer function.
 */
describe('blobToArrayBuffer', () => {
  /**
   * Test for converting Blob to ArrayBuffer.
   */
  it('should convert Blob to ArrayBuffer', async () => {
    const blob = new Blob(['test'], { type: 'text/plain' })
    const arrayBuffer = await blobToArrayBuffer(blob)
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
  })

  // Converts an empty Blob object to an ArrayBuffer.
  it('should convert empty Blob to ArrayBuffer', async () => {
    const blob = new Blob([], { type: 'text/plain' })
    const arrayBuffer = await blobToArrayBuffer(blob)
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
    expect(arrayBuffer.byteLength).toBe(0)
  })

  // Handles a Blob object with large data.
  it('should handle Blob with large data', async () => {
    const largeData = new Uint8Array(1024 * 1024) // 1MB
    const blob = new Blob([largeData], { type: 'application/octet-stream' })
    const arrayBuffer = await blobToArrayBuffer(blob)
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
    expect(arrayBuffer.byteLength).toBe(largeData.length)
  })

  // Converts a Blob object with binary data to an ArrayBuffer.
  it('should convert Blob with binary data to ArrayBuffer', async () => {
    const binaryData = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]) // "Hello"
    const blob = new Blob([binaryData], { type: 'application/octet-stream' })
    const arrayBuffer = await blobToArrayBuffer(blob)
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
    expect(arrayBuffer.byteLength).toBe(binaryData.length)
  })

  // Checks if the blobToArrayBuffer function resolves when a FileReader error occurs.
  it('should resolve on FileReader error', async () => {
    const blob = new Blob(['invalid'], { type: 'text/plain' })
    await expect(blobToArrayBuffer(blob)).resolves.toBeDefined()
  })
})

describe('serializeZipFiles', () => {
  it('Serialize zip files', async () => {
    const zip = new JSZip()

    // The text file shouldn't be shown
    zip.file('test1.txt', 'It is a test\n')

    // The json and sol files should be shown
    zip.file('test2.json', JSON.stringify({ key: 'It is a test' }))

    const messages = zip.folder('messages')
    messages?.file('test3.sol', 'It is a test\n')
    const blob = await zip.generateAsync({ type: 'blob' })

    const expected = {
      messages: {
        type: 'folder',
        children: {
          'test3.sol': {
            type: 'file',
            content: 'It is a test\n',
          },
        },
      },
      'test2.json': {
        type: 'file',
        content: '{"key":"It is a test"}',
      },
    }
    const result = await serializeZipFiles(blob)

    expect(result).toBe(JSON.stringify(expected, null, 2))
  })

  it('If the file has not extension or the file name starts with __MACOSX/, it should be shown', async () => {
    const zip = new JSZip()

    // The file without extension shouldn't be shown
    zip.file('test1', 'It is a test\n')

    // The text file shouldn't be shown
    zip.file('__MACOSX/.sol', 'It is a test\n')

    // The json and sol files should be shown
    zip.file('test2.json', JSON.stringify({ key: 'It is a test' }))

    const blob = await zip.generateAsync({ type: 'blob' })

    const expected = {
      'test2.json': {
        type: 'file',
        content: '{"key":"It is a test"}',
      },
    }
    const result = await serializeZipFiles(blob)

    expect(result).toBe(JSON.stringify(expected, null, 2))
  })
})
