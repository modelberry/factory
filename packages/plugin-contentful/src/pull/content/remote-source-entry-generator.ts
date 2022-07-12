import { firstUpperCase, Options } from '@modelberry/mbfactory/plain'
import { Environment } from 'contentful-management/types'
import { fetchContentTypes } from '../../fetch-content-types/fetch-content-types'
import { fetchEntries } from './fetch-entries'
import { organizeEntriesByContentType } from './organize-entries-by-content-type'
import { entriesToJsVariables } from './entries-to-js-variables'

export interface RemoteEntryGenerator {
  contentfulEnvironment: Environment
  localeCode: string
  options: Options
}

export type RemoteSourceEntryYields = {
  contentTypeId: string
  varType: string
  varName: string
  contentArray: any[]
}

export type RemoteSourceEntryIterator = AsyncGenerator<
  RemoteSourceEntryYields,
  void,
  unknown
>

// Fetch all required data, then loop and yield an object for each entry
export async function* remoteSourceEntryGenerator({
  contentfulEnvironment,
  localeCode,
  options,
}: RemoteEntryGenerator) {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  // Fetch all entries
  const remoteEntries = await fetchEntries({
    contentfulEnvironment,
    options,
    localeCode,
  })
  const entriesByContentTypeId = organizeEntriesByContentType({
    contentTypes,
    remoteEntries,
  })

  // Each content type is a file with: export const myType: MyType = [...]
  for (const remoteContentTypeId of Object.keys(entriesByContentTypeId)) {
    const remoteVarType = `Contentful${firstUpperCase(remoteContentTypeId)}`
    const remoteVarName = remoteContentTypeId
    // Get the content of the js variables from the Contentful entries
    const remoteContentArray: any[] = entriesToJsVariables({
      entryTypeList: entriesByContentTypeId[remoteContentTypeId].entryTypeList,
      localeCode,
    })
    yield {
      contentTypeId: remoteContentTypeId,
      varType: remoteVarType,
      varName: remoteVarName,
      contentArray: remoteContentArray,
    }
  }
}
