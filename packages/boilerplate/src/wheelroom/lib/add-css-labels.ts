import { TreeStyle } from './tree-style'

const addLabel = <T>(prefix: string, treeStyle: TreeStyle): T => {
  Object.entries(treeStyle).forEach(([name, value]) => {
    if (value instanceof Object && !Array.isArray(value)) {
      addLabel(`${prefix}-${name}`, value)
    }
  })
  treeStyle.label = prefix.replace(':', '')
  return treeStyle as T
}

export const addCssLabels = <T>(prefix: string, treeStyle: TreeStyle): T => {
  return addLabel(prefix, treeStyle)
}
