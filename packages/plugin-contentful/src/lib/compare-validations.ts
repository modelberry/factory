import { ContentTypeFieldValidation } from 'contentful-management/types'
import deepEqual from 'deep-equal'

export type Validation = ContentTypeFieldValidation & {
  message?: string
  nodes?: any
}
export type ValidationMeta = {
  name: string
  val: Validation
}

export type CompareArraysResponse = {
  union: ValidationMeta[]
  intersect: ValidationMeta[]
  aOnly: ValidationMeta[]
  bOnly: ValidationMeta[]
}

export interface CompareValidations {
  /** Validation array A to compare with Validation array B */
  a: ValidationMeta[]
  /** Validation array B to compare with Validation array A */
  b: ValidationMeta[]
  /** Swap array A and B */
  reverse?: boolean
}

export const valArrayIncludesObj = (
  objArray: ValidationMeta[],
  testObj: ValidationMeta
) => {
  return !!objArray.find((obj) => deepEqual(obj.val, testObj.val))
}

// Compare two arrays with Validation objects and return union, intersect, aOnly, bOnly
export const compareValidations = ({ a, b, reverse }: CompareValidations) => {
  const arrayA = reverse ? b : a
  const arrayB = reverse ? a : b
  const intersect = arrayA.filter((id) => valArrayIncludesObj(arrayB, id))
  const aOnly = arrayA.filter((id) => !valArrayIncludesObj(intersect, id))
  const bOnly = arrayB.filter((id) => !valArrayIncludesObj(intersect, id))
  const union = [...aOnly, ...intersect, ...bOnly]
  return { union, intersect, aOnly, bOnly } as CompareArraysResponse
}
