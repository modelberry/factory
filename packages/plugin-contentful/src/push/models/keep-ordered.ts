import { ContentFields } from 'contentful-management/types'

export interface KeepOrdered {
  orderedIds: string[]
  newFields: ContentFields[]
}

export const keepOrdered = ({ orderedIds, newFields }: KeepOrdered) => {
  const orderedFields: ContentFields[] = []
  for (const fieldId of orderedIds) {
    const field = newFields.find((field) => field.id === fieldId)
    if (field) orderedFields.push(field)
  }
  // Add omitted fields to the end
  const omittedFields = newFields.filter((field) => field.omitted)
  return [...orderedFields, ...omittedFields]
}
