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

  const sourceFile = ts.createSourceFile(
    'source.ts',
    '',
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )

  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    noEmitHelpers: true,
    omitTrailingSemicolon: true,
    removeComments: false,
  })

  const output = printer.printNode(
    ts.EmitHint.Unspecified,
    document,
    sourceFile
  )

  // Format with prettier
  const prettierOptions = (await prettier.resolveConfig(process.cwd())) || {}
  if (!prettierOptions.parser) prettierOptions.parser = 'typescript'
  const formattedOutput = prettier.format(output, prettierOptions)
  console.log(formattedOutput)
}
