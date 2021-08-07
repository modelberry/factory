import { KeyValueMap } from 'contentful-management/types'
import { ModelberryInterface } from '@modelberry/mbfactory/plain'
import { getFieldIdWithoutPostfix } from '../lib/get-field-id-without-postfix'
import { createLocalizedField, LocalizedFieldResponse } from './create-field'

export interface GetEntryFields {
  localeCode: string
  fieldValues: KeyValueMap
  fields: ModelberryInterface['fields']
}

export type EntryFields = {
  [fieldId: string]: LocalizedFieldResponse
}

export const getEntryFields = ({
  localeCode,
  fieldValues,
  fields,
}: GetEntryFields) => {
  let entryId
  const entryFields: EntryFields = {}
  for (const fieldId of Object.keys(fieldValues)) {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({ fieldId })
    if (fieldId === 'sys') {
      entryId = fieldValues.sys.id
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
    entryFields[fieldIdWithoutPostfix] = field
  }
  return { entryId, entryFields }
}
