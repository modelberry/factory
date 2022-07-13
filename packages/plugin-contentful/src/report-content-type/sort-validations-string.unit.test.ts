import { sortValidationsString } from './sort-validations-string'

describe('sortValidationsString should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('sort the validations string', async () => {
    const validations = 'valA valC valB'
    const sorted = sortValidationsString(validations)
    expect(sorted).toEqual('valA valB valC')
  })
})
