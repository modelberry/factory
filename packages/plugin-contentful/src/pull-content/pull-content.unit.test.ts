jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { pullContent } from './pull-content'

const localeResponse = [
  [chalk('- remote default locale: en-US')],
  [chalk('- pulling locale: en-US')],
]

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
      ...localeResponse,
      [chalk('- fetching content types')],
      [chalk('- fetched 1 content type')],
      [chalk('- fetching entries')],
      [chalk('- fetched 7 of 7 entries (limit: 100)')],
      [chalk('- new source file ./dummy/contentful-test-topic-content.ts')],
      [chalk('- new source file ./dummy/main-content.ts')],
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
      ...localeResponse,
      [chalk('- fetching content types')],
      [chalk('- fetched 11 content types')],
      [chalk('- fetching entries')],
      [chalk('- fetched 96 of 96 entries (limit: 100)')],
      [chalk('- new source file ./dummy/contentful-test-topic-content.ts')],
      [chalk('- new source file ./dummy/contentful-test-action-content.ts')],
      [
        chalk(
          '- new source file ./dummy/contentful-navigation-section-content.ts'
        ),
      ],
      [chalk('- new source file ./dummy/contentful-topic-section-content.ts')],
      [chalk('- new source file ./dummy/contentful-topic-content.ts')],
      [chalk('- new source file ./dummy/contentful-text-section-content.ts')],
      [
        chalk(
          '- new source file ./dummy/contentful-navigation-segment-content.ts'
        ),
      ],
      [chalk('- new source file ./dummy/contentful-page-content.ts')],
      [chalk('- new source file ./dummy/contentful-globals-content.ts')],
      [chalk('- new source file ./dummy/contentful-embed-content.ts')],
      [chalk('- new source file ./dummy/contentful-action-content.ts')],
      [chalk('- new source file ./dummy/main-content.ts')],
    ])
  })
})
