import {
  createContentVarStatement,
  firstUpperCase,
  camelToKebab,
  createTsExport,
  createTsImport,
  Node,
} from '@modelberry/mbfactory/plain'
import { SourceFile } from '../lib/write-source-files'
import { EntriesByContentTypeId, EntryType } from './entries-by-content-type-id'
import { removeLinkAndLinkType } from './remove-link-and-link-type'

export interface GetSourceFiles {
  /** Empty node list, for each generated type an import statement is added */
  allTypesImportStatements: Node[]
  entriesByContentTypeId: EntriesByContentTypeId
  localeCode: string
  path: string
}

export const getSourceFiles = ({
  allTypesImportStatements,
  entriesByContentTypeId,
  localeCode,
  path,
}: GetSourceFiles) => {
  const files: SourceFile[] = []
  // Each content type is a file with: export const myType: MyType = [...]
  for (const contentTypeId of Object.keys(entriesByContentTypeId)) {
    const varType = `Contentful${firstUpperCase(contentTypeId)}`
    const varName = contentTypeId
    const contentArray: any[] = []
    // Add entries, convert arrays into Collections, etc.
    entriesByContentTypeId[contentTypeId].entryTypeList.forEach(
      (entryType: EntryType) => {
        // Create a new entry with sys.id
        const addEntry: Record<string, any> = {
          sys: { id: entryType.sys.id },
        }
        // Add fields to entry
        Object.keys(entryType.fields).forEach((fieldId: string) => {
          // Remove type and linkType attributes because they can be resolved
          // by lookup up the content type
          const remoteEntryFieldValue = removeLinkAndLinkType({
            fieldValue: entryType.fields[fieldId].fieldValue[localeCode],
          })
          const remoteFieldType = entryType.fields[fieldId].contentFieldType
          if (remoteFieldType?.type === 'Array') {
            const itemsType =
              entryType.fields[fieldId].contentFieldType?.items?.type
            if (itemsType === 'Symbol') {
              // Same as the default below, but more explicit to code it this way
              addEntry[fieldId] = remoteEntryFieldValue
            } else {
              addEntry[`${fieldId}Collection`] = {
                items: remoteEntryFieldValue,
              }
            }
          } else if (remoteFieldType?.type === 'RichText') {
            // TODO: (maybe?) Convert all nodeTypes from string into numbers
            addEntry[fieldId] = {
              json: remoteEntryFieldValue,
            }
          } else {
            addEntry[fieldId] = remoteEntryFieldValue
          }
        })
        contentArray.push(addEntry)
      }
    )
    // Add import statements to be added to the main file
    const modelFilenameWithoutExt = `contentful-${camelToKebab(contentTypeId)}`
    const modelImportStatement = createTsImport({
      namedImports: [varType],
      from: `./${modelFilenameWithoutExt}`,
    })

    const contentVarStatement = createContentVarStatement({
      contentArray,
      varName,
      varType,
    })
    const filenameWithoutExt = `contentful-${camelToKebab(
      contentTypeId
    )}-content`
    files.push({
      filename: `${filenameWithoutExt}.ts`,
      nodes: [modelImportStatement, contentVarStatement],
      path,
    })
    // Add import statements to be added to the main file
    allTypesImportStatements.push(
      createTsExport({
        namedExports: [],
        from: `./${filenameWithoutExt}`,
      })
    )
  }
  return files
}
