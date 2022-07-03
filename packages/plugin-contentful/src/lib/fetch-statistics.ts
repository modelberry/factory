import { Environment, QueryOptions } from 'contentful-management/types'

export type Statistics = {
  contentTypesTotal: number
  entriesTotal: number
}

export interface FetchStatistics {
  contentfulEnvironment: Environment
}

// Fetch total number of entries and models defined on remote
export const fetchStatistics = async ({
  contentfulEnvironment,
}: FetchStatistics) => {
  const query: QueryOptions = { skip: 0, limit: 1 }
  const entriesCollection = await contentfulEnvironment.getEntries(query)
  const contentTypesCollection = await contentfulEnvironment.getContentTypes(
    query
  )
  const statistics: Statistics = {
    contentTypesTotal: contentTypesCollection.total,
    entriesTotal: entriesCollection.total,
  }
  return statistics
}
