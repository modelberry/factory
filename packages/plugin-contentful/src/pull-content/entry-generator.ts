import { firstUpperCase } from '@modelberry/mbfactory/plain'
import { entriesToJsVariables } from '../lib/entries-to-js-variables'
import { EntriesByContentTypeId } from '../lib/entries-by-content-type-id'

export interface EntryGenerator {
  /** Empty node list, for each generated type an import statement is added */
  entriesByContentTypeId: EntriesByContentTypeId
  localeCode: string
}

export function* entryGenerator({
  entriesByContentTypeId,
  localeCode,
}: EntryGenerator) {
  // Each content type is a file with: export const myType: MyType = [...]
  for (const contentTypeId of Object.keys(entriesByContentTypeId)) {
    const varType = `Contentful${firstUpperCase(contentTypeId)}`
    const varName = contentTypeId
    // Get the content of the js variables from the Contentful entries
    const contentArray: any[] = entriesToJsVariables({
      entryTypeList: entriesByContentTypeId[contentTypeId].entryTypeList,
      localeCode,
    })
    yield { contentTypeId, varType, varName, contentArray }
  }
}
