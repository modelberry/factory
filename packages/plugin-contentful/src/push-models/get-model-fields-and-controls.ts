import chalk from 'chalk'
import { ContentFields, Control } from 'contentful-management/types'
import { ModelberryInterface } from '@modelberry/mbfactory/plain'
import { ValidationsMap } from '../lib/get-modelberry-plugin-data'
import { getFieldIdWithoutPostfix } from '../lib/get-field-id-without-postfix'
import { checkTags } from '../check-tags/check-tags'
import { getModelField } from './get-model-field'
import { getModelControl } from './get-model-control'

export interface GetModelFieldsAndControls {
  modelFields: ModelberryInterface['fields']
  validationsMap: ValidationsMap
}

export const getModelFieldsAndControls = ({
  modelFields,
  validationsMap,
}: GetModelFieldsAndControls) => {
  const controls: Control[] = []
  const fields: ContentFields[] = []
  const log = console.log
  for (const [fieldId, field] of Object.entries(modelFields!)) {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({ fieldId })

    log(chalk.underline(`${fieldIdWithoutPostfix}`))
    const tags = field.tags || {}
    checkTags({ fieldTags: tags })

    if ('@ignore' in tags) {
      log(chalk(`- ignoring field`))
      continue
    }
    if (!tags['@type']) {
      log(chalk.red(`- no @type inline tag`))
      continue
    }
    if (tags['@type'] === 'Link' && !tags['@linkType']) {
      log(chalk.red(`- @type=Link without @linkType`))
      continue
    }
    if (tags['@type'] === 'Array' && !tags['@itemsType']) {
      log(chalk.red(`- @type=Array without @itemsType`))
      continue
    }
    if (
      tags['@type'] === 'Array' &&
      tags['@itemsType'] === 'Link' &&
      !tags['@itemsLinkType']
    ) {
      log(chalk.red(`- @type=Array, @itemsType=Link without @itemsLinkType`))
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
