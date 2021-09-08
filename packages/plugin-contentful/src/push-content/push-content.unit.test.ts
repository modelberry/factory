import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { pushContent } from './push-content'
import { topicAction } from './__fixtures__/topic-action'

describe('Push content should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  const headingResponse = [[chalk('- remote default locale: en-US')]]

  const contentfulActionResponse = [
    [chalk.bold.underline('\nContentfulAction')],
    [chalk.underline('myActions')],
    [chalk('- pushing entry testAction with 1 fields (id:myContentActionId)')],
  ]

  const contentfulTopicResponse = [
    [chalk.bold.underline('\nContentfulTopic')],
    [chalk.underline('myTopics')],
    [chalk('- pushing entry testTopic with 2 fields')],
  ]

  test('process topicAction correctly', async () => {
    await pushContent({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: topicAction,
    })
    expect(consoleSpy.mock.calls).toEqual([
      ...headingResponse,
      ...contentfulActionResponse,
      ...contentfulTopicResponse,
    ])
  })
})
