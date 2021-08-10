import ts from 'typescript'
import { createTsPrinter } from './create-ts-printer'
import { createTsSourceFile } from './create-ts-source-file'
import { printTsNode } from './print-ts-node'
import { createDataVarStatement } from './create-data-var-statement'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderVarStatement = async (varStatement: ts.Node) => {
  const output = await printTsNode({
    printer,
    sourceFile,
    node: varStatement,
  })
  return output
}

describe('Create data variable should', () => {
  test('create a declaration', async () => {
    const varStatement = createDataVarStatement({
      dataObject: {
        '@modelberry/plugin-contentful/plain': {
          validations: {
            dropdown: { in: ['item A', 'item B', 'item C'] },
            media: { linkMimetypeGroup: ['image', 'video'] },
          },
        },
      },
    })
    const source = await renderVarStatement(varStatement)
    expect(source)
      .toEqual(`export const modelberryPluginData: ModelberryPluginData = { "@modelberry/plugin-contentful/plain": { "validations": { "dropdown": { "in": ["item A", "item B", "item C"] }, "media": { "linkMimetypeGroup": ["image", "video"] } } } };
`)
  })
})
