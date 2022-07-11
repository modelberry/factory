import { Control } from 'contentful-management/types'
import { ModelberryInterface } from '@modelberry/mbfactory/plain'
import { getFieldIdWithoutPostfix } from '../../lib/get-field-id-without-postfix'
import { getModelControl } from './get-model-control'

export interface GetRemoteTargetContentTypeControls {
  contentTypeFields: ModelberryInterface['fields']
}

export const getRemoteTargetContentTypeControls = ({
  contentTypeFields,
}: GetRemoteTargetContentTypeControls) => {
  const remoteControls: Control[] = []
  for (const [fieldId, field] of Object.entries(contentTypeFields!)) {
    const fieldIdWithoutPostfix = getFieldIdWithoutPostfix({ fieldId })
    const fieldTags = field.tags || {}
    const remoteControl = getModelControl({
      fieldIdWithoutPostfix,
      fieldTags,
    })
    if (remoteControl) remoteControls.push(remoteControl)
  }
  return remoteControls
}
