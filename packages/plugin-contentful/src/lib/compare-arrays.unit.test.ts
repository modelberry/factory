import { compareArrays } from './compare-arrays'

describe('compare arrays should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('compare two arrays', async () => {
    const arrayA = [1, 2, 3, 4, 5, 6]
    const arrayB = [5, 6, 7, 8]
    const result = compareArrays({ a: arrayA, b: arrayB })
    expect(result).toEqual({
      aOnly: [1, 2, 3, 4],
      bOnly: [7, 8],
      intersect: [5, 6],
      union: [1, 2, 3, 4, 5, 6, 7, 8],
    })
  })
  test('compare two arrays in reverse', async () => {
    const arrayA = [1, 2, 3, 4, 5, 6]
    const arrayB = [5, 6, 7, 8]
    const result = compareArrays({ a: arrayA, b: arrayB, reverse: true })
    expect(result).toEqual({
      aOnly: [7, 8],
      bOnly: [1, 2, 3, 4],
      intersect: [5, 6],
      union: [5, 6, 7, 8, 1, 2, 3, 4],
    })
  })
})
