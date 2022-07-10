jest.mock('fs/promises')

import { logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { allTags } from './__fixtures__/all-tags'
import { diffContent } from './diff-content'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('Diff content should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('show content differences correctly', async () => {
    await diffContent({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: allTags,
    })
  })
  expect(logSpy.p).toHaveBeenCalledTimes(0)
})
