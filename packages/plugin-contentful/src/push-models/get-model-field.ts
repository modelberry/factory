import chalk from 'chalk'
import { camelToSpaces, firstUpperCase } from '@modelberry/mbfactory/plain'
import { ContentFields, FieldType } from 'contentful-management/types'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'

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
  const log = console.log
  // TODO: Add support for multiple validations
  const validations = []
  if (fieldTags['@validations']) {
    if (fieldTags['@validations'] in validationsMap) {
      log(chalk(`- validation ${fieldTags['@validations']}`))
      validations.push(validationsMap[fieldTags['@validations']])
    } else {
      log(chalk.red(`- validation ${fieldTags['@validations']} not found`))
      return
    }
  }

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
    newField.id = fieldIdWithoutPostfix
    newField.items = {
      type: fieldTags['@itemsType'],
      linkType: fieldTags['@itemsLinkType'],
      validations,
    }
  } else {
    newField.validations = validations
  }
  return newField
}
