import { ContentType, Environment } from 'contentful-management/types'
import {
  createTsInterface,
  createDataVarStatement,
  firstUpperCase,
  Options,
  camelToKebab,
} from '@modelberry/mbfactory/plain'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { getPropertyTree } from './get-property-tree'
import { SourceFile, writeSourceFiles } from './write-source-files'
import { getEditorInterfaces } from './get-editor-interfaces'

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
    const editorInterfaces = await getEditorInterfaces({ contentType })
    const propertyTree = getPropertyTree({
      contentFields: contentType.fields,
      editorInterfaces,
      validations,
    })
    const interfaceDeclaration = createTsInterface({
      blockTag: '@modelberry',
      inlineTags,
      propertyTree,
      isExported: true,
      name: 'Contentful' + firstUpperCase(contentType.name),
    })
    const filename = `${camelToKebab(contentType.name)}.ts`
    files.push({ nodes: [interfaceDeclaration], path, filename })
  }
  const dataVarStatement = createDataVarStatement({ dataObject: validations })
  const filename = 'validations.ts'
  files.push({
    filename,
    nodes: [dataVarStatement],
    path,
  })
  await writeSourceFiles({ files, options })
}
