jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { pullModels } from './pull-models'

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
    expect(writeFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- new source file ./dummy/test-topic.ts')],
      [chalk('- new source file ./dummy/test-action.ts')],
      [chalk('- new source file ./dummy/navigation-section.ts')],
      [chalk('- new source file ./dummy/topic-section.ts')],
      [chalk('- new source file ./dummy/topic.ts')],
      [chalk('- new source file ./dummy/text-section.ts')],
      [chalk('- new source file ./dummy/navigation-segment.ts')],
      [chalk('- new source file ./dummy/page.ts')],
      [chalk('- new source file ./dummy/globals.ts')],
      [chalk('- new source file ./dummy/embed.ts')],
      [chalk('- new source file ./dummy/action.ts')],
      [chalk('- new source file ./dummy/validations.ts')],
      [chalk('- new source file ./dummy/contentful-asset.ts')],
    ])
  })
  test('pull correctly with type filter', async () => {
    await pullModels({
      contentfulEnvironment: environmentMock,
      options: { force: true, type: 'testTopic' },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- new source file ./dummy/test-topic.ts')],
      [chalk('- new source file ./dummy/validations.ts')],
      [chalk('- new source file ./dummy/contentful-asset.ts')],
    ])
  })
})
