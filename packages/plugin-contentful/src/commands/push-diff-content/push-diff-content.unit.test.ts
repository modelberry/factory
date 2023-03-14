jest.mock('fs/promises')

import { logger } from '@modelberry/mbfactory'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { multipleContentTypes } from './__fixtures__/multiple-content-types'
import { pushDiffContent } from './push-diff-content'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('Push diff content should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('show content differences correctly', async () => {
    await pushDiffContent({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData:
        multipleContentTypes['@modelberry/plugin-contentful'].types,
    })
    expect(logSpy.p).toHaveBeenCalledTimes(0)
  })
})
