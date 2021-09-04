import ts from 'typescript'

export interface PrintTsNodes {
  nodes: ts.Node[]
  printer: ts.Printer
  sourceFile: ts.SourceFile
}

export const printTsNodes = async ({
  nodes,
  printer,
  sourceFile,
}: PrintTsNodes) => {
  // const output = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
  const output = printer.printList(
    ts.ListFormat.AllowTrailingComma,
    ts.factory.createNodeArray(nodes),
    sourceFile
  )
  return output
}
