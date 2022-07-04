import {
  createTsInterface,
  createTsExport,
  createTsImport,
  firstUpperCase,
  camelToKebab,
  firstLowerCase,
  Node,
} from '@modelberry/mbfactory/plain'
import { ContentType } from 'contentful-management/types'
import { SourceFile } from '../lib/write-source-files'
import { contentTypeFieldsToPropertyTree } from '../lib/content-type-fields-to-property-tree'
import { contentTypeToInlineTags } from '../lib/content-type-to-inline-tags'
import { fetchEditorInterfaces } from '../lib/fetch-editor-interfaces'
import { createContentfulAssetTypeDeclaration } from './create-contentful-asset-type-declaration'
import { createContentfulReferenceTypeDeclaration } from './create-contentful-reference-type-declaration'

export interface GetSourceFiles {
  /** Empty node list, for each generated type an import statement is added */
  allTypesImportStatements: Node[]
  /** Content types to generate source file for */
  contentTypes: ContentType[]
  /** Source files path */
  path: string
  /** Empty object to save Contentful validations to */
  validations: Record<string, any>
}

export const getSourceFiles = async ({
  allTypesImportStatements,
  contentTypes,
  path,
  validations,
}: GetSourceFiles) => {
  const files: SourceFile[] = []
  for (const contentType of contentTypes) {
    const inlineTags = contentTypeToInlineTags({ contentType })
    const contentTypeId = contentType.sys.id
    // Fetch editor interfaces from Contentful remote API
    const editorInterfaces = await fetchEditorInterfaces({ contentType })
    // Empty array that gets filled with named imports
    const namedImports: string[] = []
    // Get propterty tree that defines all fields for the interface
    const propertyTree = contentTypeFieldsToPropertyTree({
      contentTypeFields: contentType.fields,
      editorInterfaces,
      namedImports,
      validations,
    })
    const interfaceName = 'Contentful' + firstUpperCase(contentTypeId)
    const interfaceDeclaration = createTsInterface({
      blockTag: '@modelberry',
      inlineTags,
      propertyTree,
      isExported: true,
      name: interfaceName,
    })

    // Add imports for required types
    const uniqueNamedImports = Array.from(new Set(namedImports))
    const entryImportStatements = uniqueNamedImports.map((ni) =>
      createTsImport({
        namedImports: [`${ni}`],
        from: `./${camelToKebab(firstLowerCase(ni))}`,
      })
    )
    // Add source file for this interface
    const filenameWithoutExt = `contentful-${camelToKebab(contentTypeId)}`
    files.push({
      filename: `${filenameWithoutExt}.ts`,
      nodes: [...entryImportStatements, interfaceDeclaration],
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

  return files
}
