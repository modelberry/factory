import { environmentMock } from '../contentful-mock/contentful-mock'
import { fetchStatistics } from './fetch-statistics'

describe('fetchStatistics should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('fetch statistics from mock', async () => {
    const statistics = await fetchStatistics({
      contentfulEnvironment: environmentMock,
    })
    expect(statistics).toEqual({
      contentTypesTotal: 11,
      entriesTotal: 96,
    })
  })
})
