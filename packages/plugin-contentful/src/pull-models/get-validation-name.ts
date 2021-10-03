export interface GetValidationName {
  /** Validation to get the name of */
  val: any
  /** Existing validations */
  vals: Record<string, any>
}

export const getValidationName = ({ val, vals }: GetValidationName) => {
  const name = generateName({ val, vals })
  // When name already exists, add a unique number
  if (name in vals) {
    const objects = Object.values(vals)
    return `${name}-${objects.length + 1}`
  }
  return name
}

export interface GenerateName {
  /** Validation to get the name of */
  val: any
  /** Existing validations */
  vals: Record<string, any>
}

export const generateName = ({ val, vals }: GenerateName) => {
  if (val.linkContentType) {
    return `linkContentType-${val.linkContentType.slice(0, 3).join('-')}`
  } else if (val.in) {
    return `in-${val.in.slice(0, 3).join('-')}`
  } else if (val.linkMimetypeGroup) {
    return `linkMimetypeGroup-${val.linkMimetypeGroup.slice(0, 3).join('-')}`
  } else if (val.size) {
    return `size-min${val.size.min}-max${val.size.max}`
  } else if (val.range) {
    return `range-min${val.range.min}-max${val.range.max}`
  } else if (val.regexp) {
    const objects = Object.values(vals).filter((val: any) => val.regexp)
    return `regexp-${objects.length + 1}`
  } else if (val.prohibitRegexp) {
    const objects = Object.values(vals).filter((val: any) => val.prohibitRegexp)
    return `prohibitRegexp-${objects.length + 1}`
  } else if (val.unique) {
    return `unique-${val.unique ? 'true' : 'false'}`
  } else if (val.dateRange) {
    return `dateRange-min${val.dateRange.min}-max${val.dateRange.max}`
  } else if (val.assetImageDimensions) {
    return `assetImageDimensions-width-min${val.assetImageDimensions.width.min}-max${val.assetImageDimensions.width.max}-height-min${val.assetImageDimensions.height.min}-max${val.assetImageDimensions.height.max}`
  } else if (val.assetFileSize) {
    return `assetFileSize-min${val.assetFileSize.min}-max${val.assetFileSize.max}`
  } else if (val.enabledNodeTypes) {
    return `enabledNodeTypes-${val.enabledNodeTypes.slice(0, 3).join('-')}`
  } else if (val.enabledMarks) {
    return `enabledMarks-${val.enabledMarks.slice(0, 3).join('-')}`
  } else if (val.nodes) {
    return `richText`
  }
  return 'unknown'
}
