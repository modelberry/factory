import { camelToKebab, createTsExport, Node } from '@modelberry/mbfactory'
import { SourceFile } from '../../write-source-files/write-source-files'
import { RemoteSourceEntryIterator } from '../../generators/remote-source-entry-generator/remote-source-entry-generator'
import { createAstNodes } from './create-ast-nodes'

export interface PrepareTsFiles {
  remoteSourceEntryIterator: RemoteSourceEntryIterator
  path: string
}

export const prepareTsFiles = async ({
  remoteSourceEntryIterator,
  path,
}: PrepareTsFiles) => {
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements: Node[] = []
  const files: SourceFile[] = []
  for await (const remoteSourceEntry of remoteSourceEntryIterator) {
    const nodes = createAstNodes(remoteSourceEntry)
    const filenameWithoutExt = `contentful-${camelToKebab(
      remoteSourceEntry.contentTypeId
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
