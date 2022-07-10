jest.mock('fs/promises')

import { logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { allTags } from './__fixtures__/all-tags'
import { diffModels } from './diff-models'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
  log: jest.spyOn(logger, 'log').mockImplementation(),
}

describe('Diff models should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('show model differences correctly', async () => {
    await diffModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: allTags,
      validationsMap: { mockedValidation: {} },
    })
  })
  expect(logSpy.p).toHaveBeenCalledTimes(0)
})
