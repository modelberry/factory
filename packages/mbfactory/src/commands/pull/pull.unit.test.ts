jest.mock('../../call-handler/call-handler')
jest.mock('fs/promises')

import { mkdir } from 'fs/promises'
import { callHandler } from '../../call-handler/call-handler'
import { pullCommand } from './pull'

describe('The pull command should', () => {
  afterEach(() => {
    jest.clearAllMocks()
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
    expect(callHandler).toHaveBeenCalledTimes(1)
    expect(mkdir).toHaveBeenCalledWith('./dummy-path', { recursive: true })
  })
})
