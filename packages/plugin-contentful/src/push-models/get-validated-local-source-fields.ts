import { ModelberryInterface, logger } from '@modelberry/mbfactory/plain'
import { getFieldIdWithoutPostfix } from '../lib/get-field-id-without-postfix'
import { checkTags } from '../check-tags/check-tags'
import { isValidField } from '../check-tags/is-valid-field'

export interface GetValidatedLocalSourceFields {
  contentTypeFields: ModelberryInterface['fields']
}

export const getValidatedLocalSourceFields = ({
  contentTypeFields,
}: GetValidatedLocalSourceFields) => {
  const validatedFields: ModelberryInterface['fields'] = {}

  for (const [fieldId, field] of Object.entries(contentTypeFields!)) {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({ fieldId })
    logger.h3(`${fieldIdWithoutPostfix}`)
    const fieldTags = field.tags || {}
    checkTags({ fieldTags })
    if (!isValidField({ fieldTags, fieldType: field.type })) continue
    validatedFields[fieldId] = field
  }
  return validatedFields
}
