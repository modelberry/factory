import { ContentFields } from 'contentful-management/types'
import { ModelberryInterface } from '@modelberry/mbfactory'
import { getFieldIdWithoutPostfix } from '../../lib/get-field-id-without-postfix'
import { ValidationsMap } from '../../handler/get-modelberry-plugin-data'
import { getModelField } from './get-model-field'

export interface GetRemoteTargetContentTypeFields {
  contentTypeFields: ModelberryInterface['fields']
  validationsMap: ValidationsMap
}

export const getRemoteTargetContentTypeFields = ({
  contentTypeFields,
  validationsMap,
}: GetRemoteTargetContentTypeFields) => {
  const remoteFields: ContentFields[] = []
  for (const [fieldId, field] of Object.entries(contentTypeFields!)) {
    const fieldTags = field.tags || {}
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({ fieldId })
    const remoteField = getModelField({
      fieldIdWithoutPostfix,
      fieldTags,
      validationsMap,
    })
    if (remoteField) remoteFields.push(remoteField)
  }
  return remoteFields
}
