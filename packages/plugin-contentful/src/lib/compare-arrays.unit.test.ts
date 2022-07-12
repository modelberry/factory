import { compareArrays } from './compare-arrays'

describe('compare arrays should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('compare two arrays', async () => {
    const arrayA = [1, 2, 3, 4, 5, 6]
    const arrayB = [5, 6, 7, 8]
    const result = compareArrays(arrayA, arrayB)
    expect(result).toEqual({
      aOnly: [1, 2, 3, 4],
      bOnly: [7, 8],
      intersect: [5, 6],
      union: [1, 2, 3, 4, 5, 6, 7, 8],
    })
  })
})
