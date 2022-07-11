import { ContentFields } from 'contentful-management/types'

export interface GetOmittedFields {
  existingfields: ContentFields[]
  newFields: ContentFields[]
}

export const getOmittedFields = ({
  existingfields,
  newFields,
}: GetOmittedFields) => {
  const omittedFields = existingfields.filter((existingField) => {
    const newFieldPresent = newFields.find(
      (newField) => newField.id === existingField.id
    )
    // Return true if we did not find a matching id
    return !newFieldPresent
  })
  return omittedFields
}
