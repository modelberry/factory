jest.mock('./write-source-file')

import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { pullModels } from './pull-models'
import { writeSourceFile } from './write-source-file'

describe('Pull content should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('pull correctly without type filter', async () => {
    await pullModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      path: './dummy',
    })
    expect(writeSourceFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- writing source file ./dummy/test-topic.ts')],
      [chalk('- writing source file ./dummy/test-action.ts')],
      [chalk('- writing source file ./dummy/navigation-section.ts')],
      [chalk('- writing source file ./dummy/topic-section.ts')],
      [chalk('- writing source file ./dummy/topic.ts')],
      [chalk('- writing source file ./dummy/text-section.ts')],
      [chalk('- writing source file ./dummy/navigation-segment.ts')],
      [chalk('- writing source file ./dummy/page.ts')],
      [chalk('- writing source file ./dummy/globals.ts')],
      [chalk('- writing source file ./dummy/embed.ts')],
      [chalk('- writing source file ./dummy/action.ts')],
      [chalk('- writing source file ./dummy/validations.ts')],
    ])
  })
  test('pull correctly with type filter', async () => {
    await pullModels({
      contentfulEnvironment: environmentMock,
      options: { force: true, type: 'testTopic' },
      path: './dummy',
    })
    expect(writeSourceFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- writing source file ./dummy/test-topic.ts')],
      [chalk('- writing source file ./dummy/validations.ts')],
    ])
  })
})
