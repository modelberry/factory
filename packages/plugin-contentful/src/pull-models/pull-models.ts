import { ContentType, Environment } from 'contentful-management/types'
import {
  createTsInterface,
  createTsImport,
  createDataVarStatement,
  firstUpperCase,
  Options,
  camelToKebab,
  firstLowerCase,
} from '@modelberry/mbfactory/plain'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { getPropertyTree } from './get-property-tree'
import { SourceFile, writeSourceFiles } from './write-source-files'
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
  const files: SourceFile[] = []
  const contentTypes: ContentType[] = []
  if (options.type) {
    const ctResponse = await contentfulEnvironment.getContentType(options.type)
    contentTypes.push(ctResponse)
  } else {
    const ctResponse = await contentfulEnvironment.getContentTypes()
    ctResponse.items.forEach((ct) => contentTypes.push(ct))
  }
  // Empty object that gets filled with validations
  const validations: Record<string, any> = {}
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
    const interfaceDeclaration = createTsInterface({
      blockTag: '@modelberry',
      inlineTags,
      propertyTree,
      isExported: true,
      name: 'Contentful' + firstUpperCase(contentType.name),
    })
    // Add imports for required types
    const uniqueNzmedImports = Array.from(new Set(namedImports))
    const importStatements = uniqueNzmedImports.map((ni) =>
      createTsImport({
        namedImports: [ni],
        from: `./${camelToKebab(firstLowerCase(ni))}.ts`,
      })
    )
    // Add source file for this interface
    files.push({
      filename: `${camelToKebab(contentType.name)}.ts`,
      nodes: [...importStatements, interfaceDeclaration],
      path,
    })
  }
  const dataObject = { '@modelberry/plugin-contentful/plain': { validations } }
  // Add source file that defines Contentful validation objects
  const mbPluginDataImport = createTsImport({
    namedImports: ['ModelberryPluginData'],
    from: `@modelberry/plugin-contentful/plain`,
  })

  const dataVarStatement = createDataVarStatement({ dataObject })
  files.push({
    filename: 'validations.ts',
    nodes: [mbPluginDataImport, dataVarStatement],
    path,
  })
  // Add source file that defines ContentfulAsset type
  const contentfulAsset = createContentfulAssetTypeDeclaration()
  files.push({
    filename: 'contentful-asset.ts',
    nodes: [contentfulAsset],
    path,
  })
  await writeSourceFiles({ files, options })
}
