import {
  CreateEntryProps,
  Environment,
  KeyValueMap,
} from 'contentful-management/types'
import { ModelberryInterface } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { createLocalizedField, LocalizedFieldResponse } from './create-field'

export interface PushEntryToContentful {
  contentfulEnvironment: Environment
  contentTypeId: string
  localeCode: string
  fieldValues: KeyValueMap
  fields: ModelberryInterface['fields']
  variableName: string
}

export const pushEntryToContentful = async ({
  contentfulEnvironment,
  contentTypeId,
  localeCode,
  fieldValues,
  fields,
  variableName,
}: PushEntryToContentful) => {
  console.log(chalk(`- variable: ${variableName}`))

  type ContentFields = {
    [fieldId: string]: LocalizedFieldResponse
  }

  let id
  const contentFields: ContentFields = {}
  for (const fieldId of Object.keys(fieldValues)) {
    if (fieldId === 'sys') {
      id = fieldValues.sys.id
      continue
    }
    const fieldTags = (fields && fields[fieldId] && fields[fieldId].tags) || {}
    const fieldValue = fieldValues && fieldValues[fieldId]
    const itemsLinkType = fieldTags['@itemsLinkType']
    const itemsType = fieldTags['@itemsType']
    const linkType = fieldTags['@linkType']
    const type = fieldTags['@type']
    if (!type || !fieldValue) continue
    let value
    let itemsValue
    if (type === 'Array') {
      if (itemsType === 'Link') {
        itemsValue = fieldValue.items.map((field: any) => field.sys?.id)
        itemsValue = itemsValue.filter((field: any) => !!field)
      } else {
        itemsValue = fieldValue.items
      }
    } else {
      if (type === 'Link') {
        value = fieldValue.sys.id
      } else {
        value = fieldValue
      }
    }
    const field = createLocalizedField({
      itemsLinkType,
      itemsType,
      itemsValue,
      linkType,
      type,
      value,
      localeCode: localeCode,
    })
    contentFields[fieldId] = field
  }

  if (id) {
    await contentfulEnvironment.createEntryWithId(contentTypeId, id, {
      fields: {},
    } as CreateEntryProps)
  } else {
    await contentfulEnvironment.createEntry(contentTypeId, {
      fields: {},
    } as CreateEntryProps)
  }
}
