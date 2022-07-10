import { getFieldIdWithoutPostfix } from './get-field-id-without-postfix'

describe('getFieldIdWithoutPostfix should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('get fieldId without postfix when no postfix is present', async () => {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({
      fieldId: 'testField',
    })
    expect(fieldIdWithoutPostfix).toEqual('testField')
  })
  test('get fieldId without postfix when postfix is present', async () => {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({
      fieldId: 'someFieldCollection',
    })
    expect(fieldIdWithoutPostfix).toEqual('someField')
  })
})
