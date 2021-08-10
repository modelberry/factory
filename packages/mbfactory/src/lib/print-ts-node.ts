import ts from 'typescript'
// import prettier from 'prettier'

export interface PrintTsNode {
  node: ts.Node
  printer: ts.Printer
  sourceFile: ts.SourceFile
}

export const printTsNode = async ({
  node,
  printer,
  sourceFile,
}: PrintTsNode) => {
  const output = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
  return output
}