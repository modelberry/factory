import {
  camelToKebab,
  createDataVarStatement,
  createTsExport,
  createTsImport,
  Node,
} from '@modelberry/mbfactory/plain'
import { SourceFile } from '../lib/write-source-files'
import { createAstNodes } from './create-ast-nodes'
import { createContentfulAssetTypeDeclaration } from './create-contentful-asset-type-declaration'
import { createContentfulReferenceTypeDeclaration } from './create-contentful-reference-type-declaration'
import { RemoteContentTypeIterator } from './remote-content-type-generator'

export interface GetSourceFiles {
  /** Source files path */
  path: string
  /** Empty object to save Contentful validations to */
  validations: Record<string, any>
  remoteContentTypeIterator: RemoteContentTypeIterator
}

export const getSourceFiles = async ({
  path,
  validations,
  remoteContentTypeIterator,
}: GetSourceFiles) => {
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements: Node[] = []

  const files: SourceFile[] = []

  for await (const remoteContentType of remoteContentTypeIterator) {
    const nodes = createAstNodes(remoteContentType)

    // Add source file for this interface
    const filenameWithoutExt = `contentful-${camelToKebab(
      remoteContentType.contentTypeId
    )}`
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

  // Add source file that defines ContentfulAsset type
  const contentfulAsset = createContentfulAssetTypeDeclaration()
  files.push({
    filename: 'contentful-asset.ts',
    nodes: [contentfulAsset],
    path,
  })
  // Add source file that defines ContentfulReference type
  const contentfulReference = createContentfulReferenceTypeDeclaration()
  files.push({
    filename: 'contentful-reference.ts',
    nodes: [contentfulReference],
    path,
  })

  // Add main source file that imports all types and defines Contentful
  // validation objects
  const dataObject = { '@modelberry/plugin-contentful/plain': { validations } }
  const dataVarStatement = createDataVarStatement({ dataObject })
  const mbPluginDataImport = createTsImport({
    namedImports: ['ModelberryPluginData'],
    from: `@modelberry/plugin-contentful/plain`,
  })
  files.push({
    filename: 'main.ts',
    nodes: [mbPluginDataImport, ...allTypesImportStatements, dataVarStatement],
    path,
  })

  return files
}
