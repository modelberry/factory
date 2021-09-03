// import chalk from 'chalk'
import { environmentMock } from '../contentful-mock/contentful-mock'
import { pullModels } from './pull-models'

describe('Pull content should', () => {
  // const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  // beforeEach(() => {
  //   consoleSpy.mockReset()
  // })

  test('pull correctly', async () => {
    await pullModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      path: './dummy',
    })
    // expect(consoleSpy).toHaveBeenCalledTimes(1)
  })
})
