jest.mock('../../call-handler/call-handler')
jest.mock('../../get-all-plugin-data/get-all-plugin-data', () => ({
  getAllPluginData: () => ({}),
}))

import chalk from 'chalk'
import { Arguments } from 'yargs'
import { callHandler } from '../../call-handler/call-handler'
import { DiffArgv, diffCommand } from './diff'

const argv: Arguments<DiffArgv> = {
  _: [''],
  $0: '',
  file: '',
  options: {},
  diffType: 'content',
}

describe('The diff command should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('report an error on file does not exist', async () => {
    argv.file = './src/commands/diff/__fixtures__/xxx.ts'
    await diffCommand({ argv })

    expect(consoleSpy).toHaveBeenNthCalledWith(
      2,
      chalk.red('- file not found: ./src/commands/diff/__fixtures__/xxx.ts')
    )
    expect(callHandler).toHaveBeenCalledTimes(0)
  })

  test('report nothing to process when file exists', async () => {
    argv.file = './src/commands/diff/__fixtures__/dummy-file.ts'
    await diffCommand({ argv })
    expect(consoleSpy).toHaveBeenNthCalledWith(
      2,
      chalk.red(
        '- nothing to process in file: ./src/commands/diff/__fixtures__/dummy-file.ts'
      )
    )
    expect(callHandler).toHaveBeenCalledTimes(0)
  })
})
