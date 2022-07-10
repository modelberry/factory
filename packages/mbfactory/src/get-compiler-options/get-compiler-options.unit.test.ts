import { getCompilerOptions } from './get-compiler-options'

describe('getCompilerOptions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should get compiler options', async () => {
    expect(getCompilerOptions().options).toMatchSnapshot()
  })
})
