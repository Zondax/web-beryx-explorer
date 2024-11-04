import { act } from 'react'

import { hookHelper } from '@/helpers/jest'

import { useResourcesStore } from './resources'

describe('useResourcesStore', () => {
  it('hookHelper works', () => {
    const resourcesStore = hookHelper(useResourcesStore)
    expect(resourcesStore()).toBeDefined()
  })

  // The setIsOpen action should correctly change the isOpen state in the resources store.

  it('setIsOpen changes isOpen state', () => {
    const resourcesStore = hookHelper(useResourcesStore)
    const isOpen = true
    act(() => {
      resourcesStore().setIsOpen(isOpen)
    })
    expect(resourcesStore().isOpen).toBe(isOpen)
  })

  // The setCurrentPage action should correctly change the currentPage state in the resources store.

  it('setCurrentPage changes currentPage state', () => {
    const resourcesStore = hookHelper(useResourcesStore)
    const page = 'testPage'
    act(() => {
      resourcesStore().setCurrentPage(page)
    })
    expect(resourcesStore().currentPage).toBe(page)
  })

  // The setDocumentationCurrentFile action should correctly change the documentationCurrentFile state in the resources store.

  it('setDocumentationCurrentFile changes documentationCurrentFile state', () => {
    const resourcesStore = hookHelper(useResourcesStore)
    const file = 'testFile'
    act(() => {
      resourcesStore().setDocumentationCurrentFile(file)
    })
    expect(resourcesStore().documentationCurrentFile).toBe(file)
  })

  // The setCurrentContract action should correctly change the currentContract state in the resources store.

  it('setCurrentContract changes currentContract state', () => {
    const resourcesStore = hookHelper(useResourcesStore)
    const contract = 'testContract'
    act(() => {
      resourcesStore().setCurrentContract(contract)
    })
    expect(resourcesStore().currentContract).toBe(contract)
  })
})
