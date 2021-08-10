import ts from 'typescript'
import { InlineTags } from './create-ts-doc-comment-from-tags'
import { createTsProperty } from './create-ts-property'

export type InterfaceFields = {
  [fieldId: string]: {
    blockTag: string
    inlineTags: InlineTags
    isRequired: boolean
    name: string
  }
}

export type CreateTsInterface = {
  //   blockTag: string
  //   fields: InterfaceFields
  //   inlineTags: InlineTags
  isExported: boolean
  name: string
}

export const createTsInterface = ({
  //   blockTag,
  //   fields,
  //   inlineTags,
  isExported,
  name,
}: CreateTsInterface) => {
  const propertyTree = {
    abstract: { node: { syntaxKind: ts.SyntaxKind.StringKeyword } },
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
    `* My comment`,
    true
  )
  return interfaceDeclaration
}
