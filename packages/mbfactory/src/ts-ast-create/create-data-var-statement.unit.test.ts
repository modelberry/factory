import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { createDataVarStatement } from './create-data-var-statement'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderVarStatement = async (varStatement: ts.Node) => {
  const output = await printTsNodes({
    printer,
    sourceFile,
    nodes: [varStatement],
  })
  return output
}

describe('Create data variable should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create a declaration', async () => {
    const varStatement = createDataVarStatement({
      dataObject: {
        '@modelberry/plugin-contentful': {
          validations: {
            dropdown: { in: ['item A', 'item B', 'item C'] },
            media: { linkMimetypeGroup: ['image', 'video'] },
          },
        },
      },
    })
    const source = await renderVarStatement(varStatement)
    expect(source)
      .toEqual(`export const modelberryPluginData: ModelberryPluginData = { "@modelberry/plugin-contentful": { "validations": { "dropdown": { "in": ["item A", "item B", "item C"] }, "media": { "linkMimetypeGroup": ["image", "video"] } } } };
`)
  })
})
