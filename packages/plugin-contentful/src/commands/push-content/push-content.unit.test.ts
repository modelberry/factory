import { logger } from '@modelberry/mbfactory/plain'
import { environmentMock } from '../../contentful-mock/contentful-mock'
import { pushContent } from './push-content'
import { topicAction } from './__fixtures__/topic-action'

const logSpy = {
  h1: jest.spyOn(logger, 'h1').mockImplementation(),
  h2: jest.spyOn(logger, 'h2').mockImplementation(),
  h3: jest.spyOn(logger, 'h3').mockImplementation(),
  p: jest.spyOn(logger, 'p').mockImplementation(),
  info: jest.spyOn(logger, 'info').mockImplementation(),
  error: jest.spyOn(logger, 'error').mockImplementation(),
}

describe('Push content should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('process topicAction correctly', async () => {
    await pushContent({
      contentfulEnvironment: environmentMock,
      options: { yes: true },
      typeData: topicAction,
    })
    expect(logSpy.p).toHaveBeenCalledWith('- remote default locale: en-US')
    expect(logSpy.h1).toHaveBeenCalledWith('\nContentfulAction')
    expect(logSpy.p).toHaveBeenCalledWith('- parsing js variable: myActions')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- pushing entry testAction with 1 fields (id:myContentActionId)'
    )
    expect(logSpy.h1).toHaveBeenCalledWith('\nContentfulTopic')
    expect(logSpy.p).toHaveBeenCalledWith('- parsing js variable: myTopics')
    expect(logSpy.p).toHaveBeenCalledWith(
      '- pushing entry testTopic with 2 fields'
    )
  })
})
