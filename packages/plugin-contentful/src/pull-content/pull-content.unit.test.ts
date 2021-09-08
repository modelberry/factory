jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { pullContent } from './pull-content'

describe('Pull content should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('pull correctly with type filter', async () => {
    await pullContent({
      contentfulEnvironment: environmentMock,
      options: { force: true, type: 'testTopic' },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- new source file ./dummy/contentful-test-topic.ts')],
    ])
  })
  test('pull correctly without type filter', async () => {
    await pullContent({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()
    expect(consoleSpy.mock.calls).toEqual([
      [chalk('- new source file ./dummy/contentful-test-topic.ts')],
      [chalk('- new source file ./dummy/contentful-test-action.ts')],
      [chalk('- new source file ./dummy/contentful-navigation-section.ts')],
      [chalk('- new source file ./dummy/contentful-topic-section.ts')],
      [chalk('- new source file ./dummy/contentful-topic.ts')],
      [chalk('- new source file ./dummy/contentful-text-section.ts')],
      [chalk('- new source file ./dummy/contentful-navigation-segment.ts')],
      [chalk('- new source file ./dummy/contentful-page.ts')],
      [chalk('- new source file ./dummy/contentful-globals.ts')],
      [chalk('- new source file ./dummy/contentful-embed.ts')],
      [chalk('- new source file ./dummy/contentful-action.ts')],
    ])
  })
})
