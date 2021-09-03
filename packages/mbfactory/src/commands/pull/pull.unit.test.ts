// import chalk from 'chalk'
jest.mock('../../lib/call-handler')

import { callHandler } from '../../lib/call-handler'
import { pullCommand } from './pull'

describe('The pull command should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('call call handler', async () => {
    await pullCommand({
      argv: {
        _: [''],
        $0: '',
        options: {},
        path: './dummy-path',
        plugin: 'contentful',
        pullType: 'content',
      },
    })
    expect(consoleSpy.mock.calls).toEqual([])
    expect(callHandler).toHaveBeenCalledTimes(1)
  })
})
