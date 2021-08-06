import { ContentFields } from 'contentful-management/types'
import deepmerge from 'deepmerge'

export interface GetMergedFields {
  existingfields: ContentFields[]
  newFields: ContentFields[]
}

export const getMergedFields = ({
  existingfields,
  newFields,
}: GetMergedFields) => {
  const mergedFields: any = {}
  // Add all existing fields and set omitted flag for missing fields
  existingfields.forEach((existingField) => {
    const matchingNewField = newFields.find(
      (newField) => newField.id === existingField.id
    )
    if (matchingNewField) {
      mergedFields[existingField.id] = deepmerge(
        existingField,
        matchingNewField
      )
    } else {
      // Ommit all fields that are not new
      existingField.omitted = true
      mergedFields[existingField.id] = existingField
    }
  })
  // Add all new fields that we do not have yet
  newFields.forEach((newField) => {
    if (!mergedFields[newField.id]) mergedFields[newField.id] = newField
  })
  return Object.values(mergedFields)
}
