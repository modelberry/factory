import {
  createContentVarStatement,
  firstUpperCase,
  camelToKebab,
} from '@modelberry/mbfactory/plain'
import { ContentType } from 'contentful-management/types'
import { SourceFile } from '../lib/write-source-files'

export type NewEntry = {
  [fieldId: string]: {
    contentType: any
    entry: any
  }
}

export type ContentTypesById = {
  [contentTypeName: string]: {
    contentType: ContentType
    entries: NewEntry[]
  }
}

export interface GetSourceFiles {
  contentTypesById: ContentTypesById
  localeCode: string
  path: string
}

export const getSourceFiles = ({
  contentTypesById,
  localeCode,
  path,
}: GetSourceFiles) => {
  const files: SourceFile[] = []
  for (const contentTypeId of Object.keys(contentTypesById)) {
    const varType = `Contentful${firstUpperCase(contentTypeId)}`
    const varName = contentTypeId
    // entry[fieldId].contentType.type
    const contentArray = contentTypesById[contentTypeId].entries.map((entry) =>
      Object.keys(entry).reduce((newEntry, fieldId) => {
        newEntry[fieldId] = entry[fieldId].entry[localeCode]
        return newEntry
      }, {} as Record<string, any>)
    )
    const contentVarStatement = createContentVarStatement({
      contentArray,
      varName,
      varType,
    })
    const filename = `contentful-${camelToKebab(contentTypeId)}.ts`
    files.push({
      filename,
      nodes: [contentVarStatement],
      path,
    })
  }
  return files
}
