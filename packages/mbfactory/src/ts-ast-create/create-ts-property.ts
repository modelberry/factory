import ts from 'typescript'

export type PropertryNode = {
  comment?: string
  isArrayTypeNode?: boolean
  isRequired?: boolean
  /** Create a ts styntax kind keyword node like 'string', 'number' */
  createKeywordTypeNode?: ts.SyntaxKind
  /** Create a type reference node like 'Topic', 'Action' */
  createTypeReferenceNode?: string
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
      if (node.createKeywordTypeNode) {
        const keywordTypeNode = ts.factory.createKeywordTypeNode(
          node.createKeywordTypeNode as ts.KeywordTypeSyntaxKind
        )
        if (node.isArrayTypeNode) {
          childNode = ts.factory.createArrayTypeNode(keywordTypeNode)
        } else {
          childNode = keywordTypeNode
        }
      } else {
        const typeReferenceNode = ts.factory.createTypeReferenceNode(
          node.createTypeReferenceNode || 'UnknownType'
        )
        if (node.isArrayTypeNode) {
          childNode = ts.factory.createArrayTypeNode(typeReferenceNode)
        } else {
          childNode = typeReferenceNode
        }
      }
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
