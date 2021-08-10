import ts from 'typescript'
import {
  createTsDocCommentFromTags,
  InlineTags,
} from './create-ts-doc-comment-from-tags'
import { createTsProperty, PropertyTree } from './create-ts-property'

export type InterfaceFields = {
  [fieldId: string]: {
    blockTag: string
    inlineTags: InlineTags
    isRequired: boolean
    syntaxKind?: ts.SyntaxKind
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
  const interfaceComment = createTsDocCommentFromTags({ blockTag, inlineTags })
  const propertyTree: PropertyTree = {}
  for (const fieldId in fields) {
    const field = fields[fieldId]
    const fieldComment = createTsDocCommentFromTags({
      blockTag: field.blockTag,
      inlineTags: field.inlineTags,
    })
    propertyTree[fieldId] = {
      node: {
        syntaxKind: field.syntaxKind,
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
