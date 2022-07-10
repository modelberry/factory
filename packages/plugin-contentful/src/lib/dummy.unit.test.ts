describe('dummy should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('run well', async () => {
    expect({}).toEqual({})
  })
})
