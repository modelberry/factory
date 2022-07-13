export type CompareArraysResponse = {
  union: any[]
  intersect: any[]
  aOnly: any[]
  bOnly: any[]
}

export interface CompareArrays {
  /** Array A to compare with B */
  a: any[]
  /** Array B to compare with A */
  b: any[]
  /** Swap array A and B */
  reverse?: boolean
}

// Compare two arrays and return union, intersect, aOnly, bOnly
export const compareArrays = ({ a, b, reverse }: CompareArrays) => {
  const arrayA = reverse ? b : a
  const arrayB = reverse ? a : b
  const union = Array.from(new Set([...arrayA, ...arrayB]))
  const intersect = arrayA.filter((id) => arrayB.includes(id))
  const aOnly = arrayA.filter((id) => !intersect.includes(id))
  const bOnly = arrayB.filter((id) => !intersect.includes(id))
  return { union, intersect, aOnly, bOnly } as CompareArraysResponse
}
