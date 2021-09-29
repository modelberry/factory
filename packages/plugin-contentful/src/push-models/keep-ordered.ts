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
  return orderedFields
}
