export interface GetFieldIdWithoutPostfix {
  fieldId: string
}

export const getFieldIdWithoutPostfix = ({
  fieldId,
}: GetFieldIdWithoutPostfix) => {
  // Contentful adds the 'Collection' postfix to array types, this is why
  // the Typescript definition includes a 'Collection' postfix. When
  // creating the field, we should create the type without that postfix.
  const collectionIndex = fieldId.indexOf('Collection')
  const fieldIdWithoutPostfix =
    collectionIndex > 0 ? fieldId.substring(0, collectionIndex) : fieldId
  return fieldIdWithoutPostfix
}
