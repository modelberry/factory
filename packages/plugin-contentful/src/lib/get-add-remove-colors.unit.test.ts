import chalk from 'chalk'
import { getAddRemoveColor } from './get-add-remove-color'

describe('getAddRemoveColor should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const compared = {
    aOnly: ['OPT_1', 'OPT_2', 'OPT_3', 'OPT_4'],
    bOnly: ['OPT_7', 'OPT_8'],
    intersect: ['OPT_5', 'OPT_6'],
    union: [
      'OPT_1',
      'OPT_2',
      'OPT_3',
      'OPT_4',
      'OPT_5',
      'OPT_6',
      'OPT_7',
      'OPT_8',
    ],
  }

  test('return green', async () => {
    const item = 'OPT_1'
    const color = getAddRemoveColor({ compared, item })
    expect(color).toEqual(chalk('green'))
  })
  test('return red', async () => {
    const item = 'OPT_8'
    const color = getAddRemoveColor({ compared, item })
    expect(color).toEqual(chalk('red'))
  })
  test('return black', async () => {
    const item = 'OPT_5'
    const color = getAddRemoveColor({ compared, item })
    expect(color).toEqual(chalk('black'))
  })
})
