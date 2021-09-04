import ts from 'typescript'
import { tagsToTsDocComment, InlineTags } from '../lib/tags-to-ts-doc-comment'
import { createTsProperty, PropertyTree } from './create-ts-property'

// Re-export ts types and consts because the ts library size slows down linting
export const tsSyntaxKind = ts.SyntaxKind
export type Node = ts.Node

export type InterfaceFields = {
  [fieldId: string]: {
    blockTag: string
    inlineTags: InlineTags
    isRequired: boolean
    tsSyntaxKind?: ts.SyntaxKind
  }
}

export type CreateTsInterface = {
  blockTag: string
  fields: InterfaceFields
  inlineTags: InlineTags
  isExported: boolean
  name: string
}

export const createTsInterface = ({
  blockTag,
  fields,
  inlineTags,
  isExported,
  name,
}: CreateTsInterface) => {
  const interfaceComment = tagsToTsDocComment({ blockTag, inlineTags })
  const propertyTree: PropertyTree = {}
  for (const fieldId in fields) {
    const field = fields[fieldId]
    const fieldComment = tagsToTsDocComment({
      blockTag: field.blockTag,
      inlineTags: field.inlineTags,
    })
    propertyTree[fieldId] = {
      node: {
        syntaxKind: field.tsSyntaxKind,
        isRequired: field.isRequired,
        comment: `* ${fieldComment}`,
      },
    }
  }
  const members = createTsProperty({ propertyTree })

  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
    undefined, // Decorators
    isExported
      ? [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)]
      : undefined,
    name,
    undefined, // Type parameters
    undefined, // heritage classes
    members
  )

  ts.addSyntheticLeadingComment(
    interfaceDeclaration,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `* ${interfaceComment}`,
    true
  )
  return interfaceDeclaration
}
