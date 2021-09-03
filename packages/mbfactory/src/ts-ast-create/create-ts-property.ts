import ts from 'typescript'

export type PropertryNode = {
  comment?: string
  isRequired?: boolean
  syntaxKind?: ts.SyntaxKind
}

export type PropertyTree = {
  [propertyName: string]: {
    node?: PropertryNode
    edges?: PropertyTree
  }
}

export interface CreateTsProperty {
  propertyTree: PropertyTree
}

export const createTsProperty = ({ propertyTree }: CreateTsProperty) => {
  const members = []
  for (const propertyName in propertyTree) {
    const { node, edges } = propertyTree[propertyName]
    let childNode: ts.TypeNode | undefined
    if (edges) {
      childNode = ts.factory.createTypeLiteralNode(
        createTsProperty({ propertyTree: edges })
      )
    } else if (node) {
      childNode = ts.factory.createKeywordTypeNode(
        node.syntaxKind as ts.KeywordTypeSyntaxKind
      )
    }
    if (childNode) {
      const property = ts.factory.createPropertySignature(
        undefined, // modifier
        propertyName,
        node?.isRequired
          ? undefined
          : ts.factory.createToken(ts.SyntaxKind.QuestionToken),
        childNode
      )
      if (node?.comment) {
        ts.addSyntheticLeadingComment(
          property,
          ts.SyntaxKind.MultiLineCommentTrivia,
          `${node.comment}`,
          true
        )
      }

      members.push(property)
    }
  }
  return members
}
