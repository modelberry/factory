import chalk from 'chalk'
import { callHandler } from './call-handler'

describe('The call handler should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('show an error when a plugin does not exist', async () => {
    await callHandler({
      command: 'push',
      type: 'content',
      pluginName: '@modelberry/does-not-exist',
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline(`\nRunning plugin`)],
      [chalk('- plugin: @modelberry/does-not-exist')],
      [chalk.red('- could not find plugin (MODULE_NOT_FOUND)')],
    ])
  })

  test('show an error when a plugin does not have a handler', async () => {
    await callHandler({
      command: 'push',
      type: 'content',
      pluginName: 'chalk',
    })
    expect(consoleSpy.mock.calls).toEqual([
      [chalk.bold.underline(`\nRunning plugin`)],
      [chalk('- plugin: chalk')],
      [chalk.red('- could not find handler method on plugin')],
    ])
  })
})
