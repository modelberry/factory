export type CompareArraysResponse = {
  union: any[]
  intersect: any[]
  aOnly: any[]
  bOnly: any[]
}

// Compare two arrays and return union, intersect, aOnly, bOnly
export const compareArrays = (arrayA: any[], arrayB: any[]) => {
  const union = Array.from(new Set([...arrayA, ...arrayB]))
  const intersect = arrayA.filter((id) => arrayB.includes(id))
  const aOnly = arrayA.filter((id) => !intersect.includes(id))
  const bOnly = arrayB.filter((id) => !intersect.includes(id))
  return { union, intersect, aOnly, bOnly } as CompareArraysResponse
}
