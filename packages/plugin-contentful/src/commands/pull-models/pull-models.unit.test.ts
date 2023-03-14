jest.mock('fs/promises')

import { writeFile } from 'fs/promises'
import { logger } from '@modelberry/mbfactory'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { pullModels } from './pull-models'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('Pull models should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('pull correctly without type filter', async () => {
    await pullModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()

    expect(logSpy.p).toHaveBeenCalledWith('- fetching content types')
    expect(logSpy.p).toHaveBeenCalledWith('- fetched 11 content types')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-test-topic.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-test-action.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-navigation-section.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-topic-section.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-topic.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-text-section.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-navigation-segment.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-page.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-globals.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-embed.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-action.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-asset.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-reference.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith('- new source file ./dummy/main.ts')
  })
  test('pull correctly with type filter', async () => {
    await pullModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true, filter: 'testTopic' },
      path: './dummy',
    })
    expect(writeFile).toMatchSnapshot()

    expect(logSpy.p).toHaveBeenCalledWith('- fetching content types')
    expect(logSpy.p).toHaveBeenCalledWith('- fetched 1 content type')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-test-topic.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-asset.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith(
      '- new source file ./dummy/contentful-reference.ts'
    )
    expect(logSpy.p).toHaveBeenCalledWith('- new source file ./dummy/main.ts')
  })
})
