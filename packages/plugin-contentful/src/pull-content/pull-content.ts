import { Environment } from 'contentful-management/types'
import { Options } from '@modelberry/mbfactory/plain'

export interface PullContent {
  contentfulEnvironment: Environment
  options: Options
  path: string
}

export const pullContent = async ({
  contentfulEnvironment,
  options,
}: PullContent) => {
  const log = console.log
  log(options)
  const contentTypes: Record<string, any> = {}
  const ctResponse = await contentfulEnvironment.getContentTypes()
  ctResponse.items.forEach((ct) => {
    contentTypes[ct.name] = ct
  })
  const query = options.type
    ? {
        content_type: 'testTopic',
      }
    : undefined
  const entries = await contentfulEnvironment.getEntries(query)
  for (const entry of entries.items) {
    const contentTypeId = entry.sys.contentType.sys.id
    console.log(contentTypeId, '==================')
    for (const fieldId of Object.keys(entry.fields)) {
      const contentTypeField = contentTypes[contentTypeId].fields.find(
        (field: any) => field.id === fieldId
      )
      console.log(fieldId, contentTypeField.type, entry.fields[fieldId])
    }
  }
}
