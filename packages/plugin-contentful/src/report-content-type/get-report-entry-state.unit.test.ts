import chalk from 'chalk'
import { getReportEntryState } from './get-report-entry-state'

describe('getReportEntryState should', () => {
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

  test('return add', async () => {
    const item = 'OPT_1'
    const color = getReportEntryState({ compared, item })
    expect(color).toEqual(chalk('add'))
  })
  test('return remove', async () => {
    const item = 'OPT_8'
    const color = getReportEntryState({ compared, item })
    expect(color).toEqual(chalk('remove'))
  })
  test('return equal', async () => {
    const item = 'OPT_5'
    const color = getReportEntryState({ compared, item })
    expect(color).toEqual(chalk('equal'))
  })
})
