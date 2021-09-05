import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { createTsImport } from './create-ts-import'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderNode = async (node: ts.Node) => {
  const output = await printTsNodes({
    printer,
    sourceFile,
    nodes: [node],
  })
  return output
}

describe('Create ts import should', () => {
  test('create an import', async () => {
    const importNode = createTsImport({
      from: './test',
      namedImports: ['Topic', 'Action'],
    })
    const output = await renderNode(importNode)
    expect(output).toEqual(`import { Topic, Action } from ./test`)
  })
})
