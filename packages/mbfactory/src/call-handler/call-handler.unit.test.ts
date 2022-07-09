jest.mock('../lib/logger')

import { logger } from '../lib/logger'
import { callHandler } from './call-handler'

describe('The call handler should', () => {
  test('show an error when a plugin does not exist', async () => {
    await callHandler({
      command: 'push',
      options: {},
      pluginName: '@modelberry/does-not-exist',
      type: 'content',
    })
    expect(logger.h1).toHaveBeenLastCalledWith(`\nRunning plugin`)
    expect(logger.p).toHaveBeenLastCalledWith(
      '- plugin: @modelberry/does-not-exist'
    )
    expect(logger.error).toHaveBeenCalledWith(
      '- could not find plugin (MODULE_NOT_FOUND)'
    )
  })

  test('show an error when a plugin does not have a handler', async () => {
    await callHandler({
      command: 'push',
      options: {},
      pluginName: 'chalk',
      type: 'content',
    })
    expect(logger.h1).toHaveBeenLastCalledWith(`\nRunning plugin`)
    expect(logger.p).toHaveBeenLastCalledWith(`- plugin: chalk`)
    expect(logger.error).toHaveBeenLastCalledWith(
      `- could not find handler method on plugin`
    )
  })
})
