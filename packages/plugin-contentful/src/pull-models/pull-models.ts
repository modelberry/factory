import { ContentType, Environment } from 'contentful-management/types'
import {
  createTsInterface,
  createDataVarStatement,
  firstUpperCase,
  Options,
  camelToKebab,
} from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { createFields } from './create-fields'
import { writeSourceFile } from './write-source-file'
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
  const log = console.log
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
    const fields = createFields({
      contentFields: contentType.fields,
      editorInterfaces,
      validations,
    })
    const interfaceDeclaration = createTsInterface({
      blockTag: '@modelberry',
      inlineTags,
      fields,
      isExported: true,
      name: 'Contentful' + firstUpperCase(contentType.name),
    })
    const filename = `${camelToKebab(contentType.name)}.ts`
    log(chalk(`- writing source file ${path}/${filename}`))
    await writeSourceFile({ nodes: [interfaceDeclaration], path, filename })
  }
  const dataVarStatement = createDataVarStatement({ dataObject: validations })
  const filename = 'validations.ts'
  log(chalk(`- writing source file ${path}/${filename}`))
  await writeSourceFile({
    filename,
    nodes: [dataVarStatement],
    path,
  })

  // TODO: Write proper tsSyntaxKind, all are StringKeyword string now
}
