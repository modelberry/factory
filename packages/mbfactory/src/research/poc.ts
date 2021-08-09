import ts from 'typescript'

const sysProp = ts.factory.createPropertySignature(
  undefined, // modifier
  'sys',
  ts.factory.createToken(ts.SyntaxKind.QuestionToken),
  ts.factory.createTypeLiteralNode([
    ts.factory.createPropertySignature(
      undefined, // modifiers
      'id',
      undefined, // question token
      ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    ),
  ])
)

const abstractProp = ts.factory.createPropertySignature(
  undefined, // modifier
  'abstract',
  ts.factory.createToken(ts.SyntaxKind.QuestionToken),
  ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
)

const makeInterfaceDeclaration = () => {
  return ts.factory.createInterfaceDeclaration(
    undefined, // Decorators
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    'ContentfulTopic', // Name
    undefined, // Type parameters
    undefined, // heritage classes
    [sysProp, abstractProp] // members
  )
}

const resultFile = ts.createSourceFile(
  'someFileName.ts',
  '',
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
)

const abstractComment = `
 * @modelberry
 * - {@type Symbol}
 * - {@validation shortString}
 `

const interfaceComment = `
 * @modelberry
 * - {@plugin "@modelberry/plugin-contentful/plain"}
 * - {@type testTopic}
 * - {@displayField heading}
 * - {@description Topic model, a heading, an abstract and a call to action}
 `

export const poc = () => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  const document = makeInterfaceDeclaration()

  ts.addSyntheticLeadingComment(
    document,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*${interfaceComment}`,
    true
  )

  ts.addSyntheticLeadingComment(
    abstractProp,
    ts.SyntaxKind.MultiLineCommentTrivia,
    `*${abstractComment}`,
    true
  )

  const output = printer.printNode(
    ts.EmitHint.Unspecified,
    document,
    resultFile
  )

  console.log(output)
}
