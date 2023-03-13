import ts from 'typescript'
import { tagsToTsDocComment, InlineTags } from '../lib/tags-to-ts-doc-comment'
import { createTsProperty, PropertyTree } from './create-ts-property'

// Re-export ts types and consts because the ts library size slows down linting
export const tsSyntaxKind = ts.SyntaxKind
export type Node = ts.Node

export type CreateTsInterface = {
  blockTag: string
  propertyTree: PropertyTree
  inlineTags: InlineTags
  isExported: boolean
  name: string
}

export const createTsInterface = ({
  blockTag,
  propertyTree,
  inlineTags,
  isExported,
  name,
}: CreateTsInterface) => {
  const interfaceComment = tagsToTsDocComment({ blockTag, inlineTags })
  const members = createTsProperty({ propertyTree })

  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
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
