jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import { logger } from '@modelberry/mbfactory/plain'
import { writeSourceFiles } from './write-source-files'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('writeSourceFiles should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('write files', async () => {
    const files = [
      {
        filename: 'main.ts',
        nodes: [],
        path: '/test-path',
      },
      {
        filename: 'second.ts',
        nodes: [],
        path: '/test-path',
      },
    ]
    await writeSourceFiles({
      files,
      options: { yes: true },
    })
    expect(writeFile).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file /test-path/main.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file /test-path/second.ts'
    )
  })
  test('do not write files on dry run', async () => {
    const files = [
      {
        filename: 'main.ts',
        nodes: [],
        path: '/test-path',
      },
      {
        filename: 'second.ts',
        nodes: [],
        path: '/test-path',
      },
    ]
    await writeSourceFiles({
      files,
      options: { yes: true, dryRun: true },
    })
    expect(writeFile).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledWith(
      '- skipping source file /test-path/main.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- skipping source file /test-path/second.ts'
    )
  })
})
