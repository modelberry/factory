jest.mock('fs/promises')

import { environmentMock } from '../contentful-mock/contentful-mock'
import { allTags } from './__fixtures__/all-tags'
import { diffModels } from './diff-models'

describe('Diff models should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('show model differences correctly', async () => {
    await diffModels({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: allTags,
      validationsMap: { mockedValidation: {} },
    })
  })
})
