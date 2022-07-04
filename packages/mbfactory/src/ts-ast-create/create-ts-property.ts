import ts from 'typescript'
import { InlineTags, tagsToTsDocComment } from '../lib/tags-to-ts-doc-comment'

export type PropertryNode = {
  /** When defined create a commant with the block tag */
  blockTag?: string
  /** Tags used for property comment */
  inlineTags?: InlineTags
  /** Create array type node */
  isArrayTypeNode?: boolean
  /** Create a node that is required */
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
      if (node?.blockTag && node?.inlineTags) {
        const comment = tagsToTsDocComment({
          blockTag: node.blockTag,
          inlineTags: node.inlineTags,
        })

        ts.addSyntheticLeadingComment(
          property,
          ts.SyntaxKind.MultiLineCommentTrivia,
          `* ${comment}`,
          true
        )
      }

      members.push(property)
    }
  }
  return members
}
