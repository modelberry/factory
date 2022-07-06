import { contentTypesToString } from './content-types-to-string'

describe('contentTypesToString should', () => {
  test('convert three contentTypes to a string', async () => {
    const contentTypes = ['Action', 'Page', 'Topic']
    const stringValue = contentTypesToString({
      contentTypes,
    })

    expect(stringValue).toEqual('Action | Page | Topic')
  })
  test('convert two contentTypes to a string', async () => {
    const contentTypes = ['Action', 'Page']
    const stringValue = contentTypesToString({
      contentTypes,
    })

    expect(stringValue).toEqual('Action | Page')
  })
  test('convert one contentTypes to a string', async () => {
    const contentTypes = ['Action']
    const stringValue = contentTypesToString({
      contentTypes,
    })

    expect(stringValue).toEqual('Action')
  })
  test('convert no contentTypes to a string', async () => {
    const contentTypes: string[] = []
    const stringValue = contentTypesToString({
      contentTypes,
    })
    expect(stringValue).toEqual('ContentTypesNotFound')
  })
})
