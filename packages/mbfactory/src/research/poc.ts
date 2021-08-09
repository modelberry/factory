import ts from 'typescript'
import prettier from 'prettier'

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

export const poc = async () => {
  const interfaceDeclaration = makeInterfaceDeclaration()

  ts.addSyntheticLeadingComment(
    interfaceDeclaration,
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

  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    noEmitHelpers: true,
    omitTrailingSemicolon: true,
    removeComments: false,
  })

  const dummyFile = ts.createSourceFile(
    'dummy.ts',
    '',
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  )

  const interfaceOutput = printer.printNode(
    ts.EmitHint.Unspecified,
    interfaceDeclaration,
    dummyFile
  )

  // Format with prettier
  const prettierOptions = (await prettier.resolveConfig(process.cwd())) || {}
  if (!prettierOptions.parser) prettierOptions.parser = 'typescript'
  const formattedOutput = prettier.format(interfaceOutput, prettierOptions)
  console.log(formattedOutput)
}
