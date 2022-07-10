jest.mock('../../call-handler/call-handler')
jest.mock('../../get-all-plugin-data/get-all-plugin-data', () => ({
  getAllPluginData: () => ({}),
}))

import { Arguments } from 'yargs'
import { callHandler } from '../../call-handler/call-handler'
import { logger } from '../../lib/logger'
import { DiffArgv, diffCommand } from './diff'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

const argv: Arguments<DiffArgv> = {
  _: [''],
  $0: '',
  file: '',
  options: {},
  diffType: 'content',
}

describe('The diff command should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('report an error on file does not exist', async () => {
    argv.file = './src/commands/diff/__fixtures__/xxx.ts'
    await diffCommand({ argv })

    expect(logSpy.error).toHaveBeenCalledWith(
      '- file not found: ./src/commands/diff/__fixtures__/xxx.ts'
    )
    expect(callHandler).toHaveBeenCalledTimes(0)
  })

  test('report nothing to process when file exists', async () => {
    argv.file = './src/commands/diff/__fixtures__/dummy-file.ts'
    await diffCommand({ argv })
    expect(logSpy.error).toHaveBeenCalledWith(
      '- nothing to process in file: ./src/commands/diff/__fixtures__/dummy-file.ts'
    )
    expect(callHandler).toHaveBeenCalledTimes(0)
  })
})
