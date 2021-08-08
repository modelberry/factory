import { environmentMock } from '../lib/contentful-mock'
import { pushContent } from './push-content'
import { topicAction } from './__fixtures__/topic-action'

describe('Push content should', () => {
  // const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  // beforeEach(() => {
  //   consoleSpy.mockReset()
  // })

  test('process topicAction correctly', async () => {
    await pushContent({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: topicAction,
    })
  })
})
