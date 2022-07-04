import {
  createContentVarStatement,
  firstUpperCase,
  camelToKebab,
  createTsExport,
  createTsImport,
  Node,
} from '@modelberry/mbfactory/plain'
import { SourceFile } from '../lib/write-source-files'
import { entriesToJsVariables } from '../lib/entries-to-js-variables'
import { EntriesByContentTypeId } from './entries-by-content-type-id'

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
    // Get the content of the js variables from the Contentful entries
    const contentArray: any[] = entriesToJsVariables({
      entryTypeList: entriesByContentTypeId[contentTypeId].entryTypeList,
      localeCode,
    })
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
