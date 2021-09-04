import { camelToSpaces, firstUpperCase } from '@modelberry/mbfactory/plain'
import { ContentFields, FieldType } from 'contentful-management/types'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { getValidations } from './get-validations'

export interface GetModelField {
  fieldIdWithoutPostfix: string
  fieldTags: Record<string, string>
  validationsMap: ValidationsMap
}

export const getModelField = ({
  fieldIdWithoutPostfix,
  fieldTags,
  validationsMap,
}: GetModelField) => {
  const humanReadableFieldId = firstUpperCase(
    camelToSpaces(fieldIdWithoutPostfix)
  )

  const newField: ContentFields = {
    id: fieldIdWithoutPostfix,
    // initialValue: { key: 'value' },
    linkType: fieldTags['@linkType'],
    localized: '@localized' in fieldTags,
    name: fieldTags['@name'] || humanReadableFieldId,
    required: '@required' in fieldTags,
    type: fieldTags['@type'] as FieldType['type'],
  }

  // Add validations to Array items if type === Array
  if (fieldTags['@type'] === 'Array') {
    const { validations, validationNotFound } = getValidations({
      fieldTags,
      tag: '@itemsValidations',
      validationsMap,
    })
    if (validationNotFound) return

    newField.items = {
      type: fieldTags['@itemsType'],
      linkType: fieldTags['@itemsLinkType'],
      validations,
    }
  } else {
    const { validations, validationNotFound } = getValidations({
      fieldTags,
      tag: '@validations',
      validationsMap,
    })
    if (validationNotFound) return

    newField.validations = validations
  }
  return newField
}
