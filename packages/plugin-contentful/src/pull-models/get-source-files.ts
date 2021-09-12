import {
  createTsInterface,
  createTsImport,
  firstUpperCase,
  camelToKebab,
  firstLowerCase,
  Node,
} from '@modelberry/mbfactory/plain'
import { ContentType } from 'contentful-management/types'
import { SourceFile } from '../lib/write-source-files'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { getPropertyTree } from './get-property-tree'
import { getEditorInterfaces } from './get-editor-interfaces'
import { createContentfulAssetTypeDeclaration } from './create-contentful-asset-type-declaration'

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
    const inlineTags: Record<string, any> = {}
    inlineTags['@plugin'] = '"@modelberry/plugin-contentful/plain"'
    inlineTags['@type'] = contentType.name
    copyKeysIfExists({
      asTag: true,
      keys: ['displayField', 'description'],
      source: contentType,
      target: inlineTags,
    })
    // Fetch editor interfaces from Contentful remote API
    const editorInterfaces = await getEditorInterfaces({ contentType })
    // Empty array that gets filled with named imports
    const namedImports: string[] = []
    // Get propterty tree that defines all fields for the interface
    const propertyTree = getPropertyTree({
      contentFields: contentType.fields,
      editorInterfaces,
      namedImports,
      validations,
    })
    const interfaceName = 'Contentful' + firstUpperCase(contentType.name)
    const interfaceDeclaration = createTsInterface({
      blockTag: '@modelberry',
      inlineTags,
      propertyTree,
      isExported: true,
      name: interfaceName,
    })
    // Add imports for required types
    const uniqueNzmedImports = Array.from(new Set(namedImports))
    const entryImportStatements = uniqueNzmedImports.map((ni) =>
      createTsImport({
        namedImports: [`${ni}`],
        from: `./${camelToKebab(firstLowerCase(ni))}`,
      })
    )
    // Add source file for this interface
    const filename = `contentful-${camelToKebab(contentType.name)}.ts`
    files.push({
      filename,
      nodes: [...entryImportStatements, interfaceDeclaration],
      path,
    })
    // Add import statements to be added to the main file
    allTypesImportStatements.push(
      createTsImport({ namedImports: [interfaceName], from: `./${filename}` })
    )
  }

  // Add source file that defines ContentfulAsset type
  const contentfulAsset = createContentfulAssetTypeDeclaration()
  files.push({
    filename: 'contentful-asset.ts',
    nodes: [contentfulAsset],
    path,
  })
  return files
}
