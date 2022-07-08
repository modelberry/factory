import { camelToKebab, createTsExport, Node } from '@modelberry/mbfactory/plain'
import { SourceFile } from '../lib/write-source-files'
import { RemoteEntryIterator } from './remote-entry-generator'
import { createAstNodes } from './create-ast-nodes'

export interface GetSourceFiles {
  remoteEntryIterator: RemoteEntryIterator
  path: string
}

export const getSourceFiles = async ({
  remoteEntryIterator,
  path,
}: GetSourceFiles) => {
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements: Node[] = []
  const files: SourceFile[] = []
  for await (const entry of remoteEntryIterator) {
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
