import { logger } from '../lib/logger'
import { callHandler } from './call-handler'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('The call handler should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('show an error when a plugin does not exist', async () => {
    await callHandler({
      command: 'push',
      options: {},
      pluginName: '@modelberry/does-not-exist',
      type: 'content',
    })
    expect(logSpy.h1).toHaveBeenCalledWith(`\nRunning plugin`)
    expect(logSpy.p).toHaveBeenCalledWith(
      '- plugin: @modelberry/does-not-exist'
    )
    expect(logSpy.error.mock.calls[0][0].substring(0, 23)).toEqual('- could not find plugin')
  })

  test('show an error when a plugin does not have a handler', async () => {
    await callHandler({
      command: 'push',
      options: {},
      pluginName: 'chalk',
      type: 'content',
    })
    expect(logSpy.h1).toHaveBeenCalledWith(`\nRunning plugin`)
    expect(logSpy.p).toHaveBeenCalledWith(`- plugin: chalk`)
    expect(logSpy.error.mock.calls[0][0].substring(0, 23)).toEqual('- could not find plugin')
  })
})
