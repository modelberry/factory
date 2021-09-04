import { ContentType, Environment } from 'contentful-management/types'
import {
  createTsInterface,
  createTsPrinter,
  createTsSourceFile,
  firstUpperCase,
  formatWithPrettier,
  Node,
  Options,
  printTsNodes,
} from '@modelberry/mbfactory/plain'
import { copyKeysIfExists } from './copy-keys-if-exists'
import { createFields } from './create-fields'

export interface PullModels {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullModels = async ({
  contentfulEnvironment,
  options,
}: PullModels) => {
  const log = console.log
  const contentTypes: ContentType[] = []
  if (options.type) {
    const response = await contentfulEnvironment.getContentType(options.type)
    contentTypes.push(response)
  } else {
    const response = await contentfulEnvironment.getContentTypes()
    response.items.forEach((ct) => contentTypes.push(ct))
  }

  const nodes: Node[] = []
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
    const fields = createFields({ contentFields: contentType.fields })
    const interfaceDeclaration = createTsInterface({
      blockTag: '@modelberry',
      inlineTags,
      fields,
      isExported: true,
      name: 'Contentful' + firstUpperCase(contentType.name),
    })
    nodes.push(interfaceDeclaration)
  }

  const printer = createTsPrinter()
  const sourceFile = createTsSourceFile()

  const output = await printTsNodes({
    printer,
    sourceFile,
    nodes,
  })
  log(await formatWithPrettier({ source: output }))
}
