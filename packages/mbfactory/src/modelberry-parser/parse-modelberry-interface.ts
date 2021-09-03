import ts, { JSDocTagInfo, SymbolDisplayPart } from 'typescript'
import chalk from 'chalk'
import { stripDoubleQuotes } from '../lib/case-helpers'
import { isExportedDeclaration } from './is-exported-declaration'
import {
  DocProperty,
  interfaceToDocProperty,
} from './interface-to-doc-property'

export type ModelberryInterface = {
  fields?: {
    [fieldName: string]: {
      /** The inline tags defined within the @modelberry tag for each field */
      tags?: Record<string, string>
      /** Typescript type of the field */
      type?: string
    }
  }
  /** The inline tags defined within the @modelberry tagon the interface */
  interfaceTags?: Record<string, string>
  /** The typescript type of the interface  */
  typeName?: string
}

// TODO: Don't overwrite tags when the same tag exists multiple times
const getInlineTags = ({
  search,
}: {
  search: string
}): Record<string, string> => {
  const matches = search.matchAll(/{(@[a-zA-z0-9]+) *([^{}]*)}/g)
  const tags = Array.from(matches).reduce(
    (result, match) => ({ ...result, [match[1]]: match[2] }),
    {}
  )
  return tags
}

const getTextSymbol = ({ symbols }: { symbols?: SymbolDisplayPart[] }) => {
  if (!symbols) return ''
  const tagText = symbols.find((text) => text.kind === 'text')
  return tagText?.text || ''
}

interface GetTagByName {
  tags?: JSDocTagInfo[]
  name: string
}

const getTagByName = ({ tags, name }: GetTagByName) => {
  if (!tags) return
  return tags.find((tag) => tag.name === name)
}

export interface ParseInterface {
  checker: ts.TypeChecker
  node: ts.Node
}

export const parseModelberryInterface = ({
  checker,
  node,
}: ParseInterface): ModelberryInterface | undefined => {
  const log = console.log
  const wrInterface: ModelberryInterface = {}

  if (
    !isExportedDeclaration({ node }) ||
    !ts.isInterfaceDeclaration(node) ||
    !node.name
  )
    return
  const type = checker.getTypeAtLocation(node)
  if (!type) return
  const docProperty = interfaceToDocProperty({ type, checker })

  if (!docProperty.name) return
  wrInterface.typeName = docProperty.name
  if (!docProperty.jSDocTags?.length) {
    log(chalk.red(`- no TSDoc tags (${wrInterface.typeName})`))
    return
  }
  const ModelberryTag = getTagByName({
    tags: docProperty.jSDocTags,
    name: 'modelberry',
  })
  /**
   * Checking for tags. Only check the tags that are required for exporting to a
   * plugin. That makes the @modelberry block tag and the @plugin inline tag
   * required. All others like @type are optional at this point.
   */
  if (!ModelberryTag) {
    log(
      chalk.red(
        `- no @modelberry block tag for interface (${wrInterface.typeName})`
      )
    )
    return
  }
  const text = getTextSymbol({ symbols: ModelberryTag.text })
  const tags = getInlineTags({ search: text })

  if (!tags['@plugin']) {
    log(chalk.red(`- no @plugin inline tag (${wrInterface.typeName})`))
    return
  }
  // Strip double quotes from plugin name, double quotes are needed when an
  // @-character is used in a module. Eg {@plugin @modelberry/module}
  tags['@plugin'] = stripDoubleQuotes(tags['@plugin'])

  wrInterface.interfaceTags = tags

  // We use @description instead, because this description only works for the
  // interface header, not for the field descriptions
  //
  // const description = getTextSymbol({
  //   symbols: docProperty.documentationComment,
  // })
  // wrInterface.description = description

  wrInterface.fields = {}
  docProperty.docProperties?.forEach((docProperty: DocProperty) => {
    const modelberryTag = getTagByName({
      tags: docProperty.jSDocTags,
      name: 'modelberry',
    })
    if (modelberryTag) {
      const text = getTextSymbol({ symbols: modelberryTag.text })
      const tags = getInlineTags({ search: text })
      wrInterface.fields![docProperty.name || 'unknown'] = {
        tags,
        type: docProperty.type,
      }
    } else {
      log(
        chalk.red(
          `- no @modelberry block tag for field (${wrInterface.typeName}/${docProperty.name})`
        )
      )
    }
  })
  return wrInterface
}
