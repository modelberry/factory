import { firstUpperCase } from '@modelberry/mbfactory/plain'

export interface CopyKeysIfExists {
  // Add 'items' prefix to target key
  asItems?: boolean
  // Add @ to target key
  asTag?: boolean
  // Key
  keys: string[]
  // Source object
  source?: Record<string, any>
  // Target object
  target: Record<string, any>
}

export const copyKeysIfExists = ({
  asItems,
  asTag,
  source,
  target,
  keys,
}: CopyKeysIfExists) => {
  if (!source) return
  for (const key of keys) {
    if (!source[key]) continue
    let targetKey = key
    if (asItems) targetKey = `items${firstUpperCase(targetKey)}`
    if (asTag) targetKey = `@${targetKey}`
    target[targetKey] = source[key]
  }
}
