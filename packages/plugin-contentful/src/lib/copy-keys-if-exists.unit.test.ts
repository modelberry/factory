import { copyKeysIfExists } from './copy-keys-if-exists'

describe('copyKeysIfExists should', () => {
  test('copy existing keys', async () => {
    const source = { keyA: 'A value', keyB: 'B value' }
    const target = {}
    copyKeysIfExists({
      keys: ['keyA', 'keyB', 'keyC'],
      source,
      target,
    })
    expect(target).toEqual({ keyA: 'A value', keyB: 'B value' })
  })
  test('copy existing keys as tags', async () => {
    const source = { tagA: 'A value', tagB: 'B value' }
    const target = {}
    copyKeysIfExists({
      asTag: true,
      keys: ['tagA', 'tagB', 'tagC'],
      source,
      target,
    })
    expect(target).toEqual({ '@tagA': 'A value', '@tagB': 'B value' })
  })
  test('copy existing keys as items', async () => {
    const source = { keyA: 'A value', keyB: 'B value' }
    const target = {}
    copyKeysIfExists({
      asItems: true,
      keys: ['keyA', 'keyB', 'keyC'],
      source,
      target,
    })
    expect(target).toEqual({ itemsKeyA: 'A value', itemsKeyB: 'B value' })
  })
  test('copy existing keys as tags and items', async () => {
    const source = { keyA: 'A value', keyB: 'B value' }
    const target = {}
    copyKeysIfExists({
      asItems: true,
      asTag: true,
      keys: ['keyA', 'keyB', 'keyC'],
      source,
      target,
    })
    expect(target).toEqual({ '@itemsKeyA': 'A value', '@itemsKeyB': 'B value' })
  })
})
