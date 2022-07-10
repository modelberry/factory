jest.mock('../../call-handler/call-handler')
jest.mock('../../get-all-plugin-data/get-all-plugin-data', () => ({
  getAllPluginData: () => ({}),
}))

import { Arguments } from 'yargs'
import { callHandler } from '../../call-handler/call-handler'
import { logger } from '../../lib/logger'
import { PushArgv, pushCommand } from './push'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

const argv: Arguments<PushArgv> = {
  _: [''],
  $0: '',
  file: '',
  options: {},
  pushType: 'content',
}

describe('The push command should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('report an error on file does not exist', async () => {
    argv.file = './src/commands/push/__fixtures__/xxx.ts'
    await pushCommand({ argv })

    expect(logSpy.error).toHaveBeenCalledWith(
      '- file not found: ./src/commands/push/__fixtures__/xxx.ts'
    )
    expect(callHandler).toHaveBeenCalledTimes(0)
  })

  test('report nothing to process when file exists', async () => {
    argv.file = './src/commands/push/__fixtures__/dummy-file.ts'
    await pushCommand({ argv })
    expect(logSpy.error).toHaveBeenCalledWith(
      '- nothing to process in file: ./src/commands/push/__fixtures__/dummy-file.ts'
    )
    expect(callHandler).toHaveBeenCalledTimes(0)
  })
})
