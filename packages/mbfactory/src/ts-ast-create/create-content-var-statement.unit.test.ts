import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNode } from '../ts-ast-helpers/print-ts-node'
import { createContentVarStatement } from './create-content-var-statement'

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

describe('Create content variable should', () => {
  test('create a declaration', async () => {
    const varStatement = createContentVarStatement({
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
