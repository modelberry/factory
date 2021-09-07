import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { createContentVarStatement } from './create-content-var-statement'

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

describe('Create content variable should', () => {
  test('create a declaration', async () => {
    const varStatement = createContentVarStatement({
      varName: 'myTopics',
      varType: 'ContentfulTopic',
      contentArray: [
        {
          abstract: 'This is the abstract',
          actionsCollection: {
            items: [
              {
                sys: {
                  id: 'myContentActionId',
                },
              },
            ],
          },
          heading: 'Heres the heading',
        },
      ],
    })
    const source = await renderVarStatement(varStatement)
    expect(source)
      .toEqual(`export const myTopics: ContentfulTopic[] = [{ "abstract": "This is the abstract", "actionsCollection": { "items": [{ "sys": { "id": "myContentActionId" } }] }, "heading": "Heres the heading" }];
`)
  })
})
