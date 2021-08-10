import ts from 'typescript'
import { createTsPrinter } from './create-ts-printer'
import { createTsSourceFile } from './create-ts-source-file'
import { printTsNode } from './print-ts-node'
import { createTsInterface } from './create-ts-interface'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderInterface = async (interfaceDeclaration: ts.Node) => {
  const output = await printTsNode({
    printer,
    sourceFile,
    node: interfaceDeclaration,
  })
  return output
}

describe('Create ts interface should', () => {
  test('create an interface', async () => {
    const intDec = createTsInterface({
      isExported: true,
      name: 'ContentfulTopic',
    })
    const output = await renderInterface(intDec)
    expect(output).toEqual(`/** My comment*/
export interface ContentfulTopic {
    abstract?: string;
}`)
  })
})
