import { ContentFields, Control } from 'contentful-management/types'
import { ModelberryInterface, logger } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { getFieldIdWithoutPostfix } from '../lib/get-field-id-without-postfix'
import { checkTags } from '../check-tags/check-tags'
import { getModelField } from './get-model-field'
import { getModelControl } from './get-model-control'

export interface GetModelFieldsAndControls {
  contentTypeFields: ModelberryInterface['fields']
  validationsMap: ValidationsMap
}

export const getModelFieldsAndControls = ({
  contentTypeFields,
  validationsMap,
}: GetModelFieldsAndControls) => {
  const controls: Control[] = []
  const fields: ContentFields[] = []
  for (const [fieldId, field] of Object.entries(contentTypeFields!)) {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({ fieldId })

    logger.h3(`${fieldIdWithoutPostfix}`)
    const tags = field.tags || {}
    checkTags({ fieldTags: tags })

    if ('@ignore' in tags) {
      logger.p(`- skipping because @ignore`)
      continue
    }
    if (!tags['@type']) {
      logger.error(`- no @type inline tag`)
      continue
    }
    if (tags['@type'] === 'Link' && !tags['@linkType']) {
      logger.error(`- @type=Link without @linkType`)
      continue
    }
    if (tags['@type'] === 'Array' && !tags['@itemsType']) {
      logger.error(`- @type=Array without @itemsType`)
      continue
    }
    if (
      tags['@type'] === 'Array' &&
      tags['@itemsType'] === 'Link' &&
      !tags['@itemsLinkType']
    ) {
      logger.error(`- @type=Array, @itemsType=Link without @itemsLinkType`)
      continue
    }
    if (
      tags['@type'] === 'Array' &&
      tags['@itemsType'] === 'Symbol' &&
      field.type?.trim().startsWith('{')
    ) {
      logger.error(`- @type=Array, @itemsType=Symbol must be of type string`)
      continue
    }

    const newField = getModelField({
      fieldIdWithoutPostfix,
      fieldTags: tags,
      validationsMap,
    })
    if (newField) fields.push(newField)
    const newControl = getModelControl({
      fieldIdWithoutPostfix,
      fieldTags: tags,
    })
    if (newControl) controls.push(newControl)
  }
  return { fields, controls }
}
