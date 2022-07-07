import { camelToKebab, createTsExport, Node } from '@modelberry/mbfactory/plain'
import { SourceFile } from '../lib/write-source-files'
import { EntriesByContentTypeId } from '../lib/entries-by-content-type-id'
import { entryGenerator } from './entry-generator'
import { createAstNodes } from './create-ast-nodes'

export interface GetSourceFiles {
  entriesByContentTypeId: EntriesByContentTypeId
  localeCode: string
  path: string
}

export const getSourceFiles = ({
  entriesByContentTypeId,
  localeCode,
  path,
}: GetSourceFiles) => {
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements: Node[] = []
  const files: SourceFile[] = []
  const entryGen = entryGenerator({ entriesByContentTypeId, localeCode })
  for (const entry of entryGen) {
    const nodes = createAstNodes(entry)
    const filenameWithoutExt = `contentful-${camelToKebab(
      entry.contentTypeId
    )}-content`
    files.push({
      filename: `${filenameWithoutExt}.ts`,
      nodes,
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
  files.push({
    filename: 'main-content.ts',
    nodes: allTypesImportStatements,
    path,
  })
  return files
}
