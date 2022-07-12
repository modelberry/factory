jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import { logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { pullContent } from './pull-content'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('Pull content should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('pull correctly with type filter', async () => {
    await pullContent({
      contentfulEnvironment: environmentMock,
      options: { yes: true, filter: 'testTopic' },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledWith('- remote default locale: en-US')
    expect(logSpy.p).toHaveBeenCalledWith('- fetching content types')
    expect(logSpy.p).toHaveBeenCalledWith('- fetched 1 content type')
    expect(logSpy.p).toHaveBeenCalledWith('- fetching entries')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- fetched 7 of 7 entries (in batches of 100)'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-test-topic-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/main-content.ts'
    )
  })
  test('pull correctly without type filter', async () => {
    await pullContent({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()
    expect(logSpy.p).toHaveBeenCalledWith('- remote default locale: en-US')
    expect(logSpy.p).toHaveBeenCalledWith('- fetching content types')
    expect(logSpy.p).toHaveBeenCalledWith('- fetched 11 content types')
    expect(logSpy.p).toHaveBeenCalledWith('- fetching entries')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- fetched 96 of 96 entries (in batches of 100)'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-test-topic-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-test-action-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-navigation-section-content.ts'
    )

    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-topic-section-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-topic-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-text-section-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-navigation-segment-content.ts'
    )

    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-page-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-globals-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-embed-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-action-content.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/main-content.ts'
    )
  })
})
