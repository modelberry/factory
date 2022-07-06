jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import { writeSourceFiles } from './write-source-files'

describe('writeSourceFiles should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })
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
      options: { force: true },
    })
    expect(writeFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- new source file /test-path/main.ts')],
      [chalk('- new source file /test-path/second.ts')],
    ])
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
      options: { force: true, dryRun: true },
    })
    expect(writeFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- skipping source file /test-path/main.ts')],
      [chalk('- skipping source file /test-path/second.ts')],
    ])
  })
})
