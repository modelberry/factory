jest.mock('fs/promises')

import { environmentMock } from '../contentful-mock/contentful-mock'
import { allTags } from './__fixtures__/all-tags'
import { diffContent } from './diff-content'

describe('Diff content should', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  beforeEach(() => {
    consoleSpy.mockReset()
  })

  test('show content differences correctly', async () => {
    await diffContent({
      contentfulEnvironment: environmentMock,
      options: { force: true },
      typeData: allTags,
    })
  })
})
