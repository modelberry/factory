import { Environment } from 'contentful-management/types'
import {
  createTsInterface,
  createTsImport,
  createDataVarStatement,
  firstUpperCase,
  Options,
  camelToKebab,
  firstLowerCase,
} from '@modelberry/mbfactory/plain'
import { SourceFile, writeSourceFiles } from '../lib/write-source-files'
import { fetchContentTypes } from '../lib/fetch-content-types'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { getPropertyTree } from './get-property-tree'
import { getEditorInterfaces } from './get-editor-interfaces'
import { createContentfulAssetTypeDeclaration } from './create-contentful-asset-type-declaration'

export interface PullModels {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullModels = async ({
  contentfulEnvironment,
  options,
  path,
}: PullModels) => {
  const contentTypes = await fetchContentTypes({
    contentfulEnvironment,
    options,
  })
  // Generate import statements for each type to be added to the main file
  const allTypesImportStatements = []
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}
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
  const mbPluginDataImport = createTsImport({
    namedImports: ['ModelberryPluginData'],
    from: `@modelberry/plugin-contentful/plain`,
  })
  const dataObject = { '@modelberry/plugin-contentful/plain': { validations } }

  // Add source file that defines ContentfulAsset type
  const contentfulAsset = createContentfulAssetTypeDeclaration()
  files.push({
    filename: 'contentful-asset.ts',
    nodes: [contentfulAsset],
    path,
  })

  // Add main source file that imports all types and defines Contentful
  // validation objects
  const dataVarStatement = createDataVarStatement({ dataObject })
  files.push({
    filename: 'main.ts',
    nodes: [...allTypesImportStatements, mbPluginDataImport, dataVarStatement],
    path,
  })

  await writeSourceFiles({ files, options })
}
