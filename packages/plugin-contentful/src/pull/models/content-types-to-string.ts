export interface ContentTypesToString {
  contentTypes: string[]
  isArray?: boolean
}

export const contentTypesToString = ({
  contentTypes,
  isArray,
}: ContentTypesToString) => {
  if (contentTypes.length === 0) return 'ContentTypesNotFound'
  if (contentTypes.length === 1) return contentTypes[0]
  const joined = contentTypes.join(' | ')
  return isArray ? `(${joined})` : joined
}
