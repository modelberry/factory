jest.mock('fs/promises')

import { ExitCodes, logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { multipleContentTypes } from './__fixtures__/multiple-content-types'
import { pushDiffModels } from './push-diff-models'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
  log: jest.spyOn(logger, 'log').mockImplementation(),
}

describe('Push diff models should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('show model differences correctly', async () => {
    await pushDiffModels({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData:
        multipleContentTypes['@modelberry/plugin-contentful/plain'].types,
      validationsMap: { mockedValidation: {} },
    })
    expect(logSpy.h1).toHaveBeenCalledTimes(4)
    expect(logSpy.h2).toHaveBeenCalledTimes(12)
    expect(logSpy.p).toHaveBeenCalledTimes(827)
    expect(logSpy.info).toHaveBeenCalledTimes(0)
    expect(process.exitCode).toEqual(ExitCodes.DiffNonEqual)
  })
})
