import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { createTsExport } from './create-ts-export'

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

describe('Create ts export should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create an export * from test', async () => {
    const exportNode = createTsExport({
      from: './test',
      namedExports: [],
    })
    const output = await renderNode(exportNode)
    expect(output).toEqual(`export * from "./test"`)
  })
  test('create an export { Topic, Action } from string with back ticks', async () => {
    const exportNode = createTsExport({
      from: `./${'test'}.ts`,
      namedExports: ['Topic', 'Action'],
    })
    const output = await renderNode(exportNode)
    expect(output).toEqual(`export { Topic, Action } from "./test.ts"`)
  })
})
