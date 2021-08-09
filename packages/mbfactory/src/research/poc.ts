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

const makeInterfaceDeclaration = () => {
  return ts.factory.createInterfaceDeclaration(
    undefined, // Decorators
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    'ContentfulTopic', // Name
    undefined, // Type parameters
    undefined, // heritage classes
    [sysProp] // members
  )
}

const resultFile = ts.createSourceFile(
  'someFileName.ts',
  '',
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ false,
  ts.ScriptKind.TS
)

export const poc = () => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  const intDec = makeInterfaceDeclaration()

  const result = printer.printNode(ts.EmitHint.Unspecified, intDec, resultFile)

  ts.addSyntheticLeadingComment(
    sysProp,
    ts.SyntaxKind.MultiLineCommentTrivia,
    'My long desired comment',
    true
  )

  console.log(result)
}
