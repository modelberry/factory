import {
  createContentVarStatement,
  firstUpperCase,
  camelToKebab,
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

/**
 * Create a file for each content type. Each file contains an exported constant.
 * The constant is an array with entries.
 *
 * Entries links are handled depending on the entry data. Three possible entry
 * link formats exist:
 *
 * 1. ( fieldA, fieldB ) - No sys field exists, this will create a new entry.
 * 2. ( fieldA, fieldB, sys: ( id ) ) - The existing sys.id field will be
 *    updated, if the id does not exist, a new entry with the id is created.
 * 3. ( sys: ( id ) ) - A link to the entry with sys.id is created
 *
 * Data pulled from Contentful is written to a source file using format #3
 *
 *
 */
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
            addEntry[`${fieldId}Collection`] = {
              items: remoteEntryFieldValue,
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
      createTsImport({
        namedImports: [varName],
        from: `./${filenameWithoutExt}`,
      })
    )
  }
  return files
}
