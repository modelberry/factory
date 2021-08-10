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
      blockTag: '@modelberry',
      inlineTags: {
        '@plugin': '"@modelberry/plugin-contentful/plain"',
        '@type': 'testTopic',
        '@displayField': 'heading',
        '@description':
          'Topic model, a heading, an abstract and a call to action',
      },
      fields: {
        heading: {
          blockTag: '@modelberry',
          inlineTags: {
            '@type': 'Symbol',
            '@validation': 'shortString',
          },
          isRequired: false,
          syntaxKind: ts.SyntaxKind.StringKeyword,
        },
      },
      isExported: true,
      name: 'ContentfulTopic',
    })
    const output = await renderInterface(intDec)
    expect(output).toEqual(`/** @modelberry
* - {@plugin "@modelberry/plugin-contentful/plain"}
* - {@type testTopic}
* - {@displayField heading}
* - {@description Topic model, a heading, an abstract and a call to action}
*/
export interface ContentfulTopic {
    /** @modelberry
    * - {@type Symbol}
    * - {@validation shortString}
    */
    heading?: string;
}`)
  })

  test('create a complex interface', async () => {
    const intDec = createTsInterface({
      blockTag: '@modelberry',
      inlineTags: {
        '@plugin': '"@modelberry/plugin-contentful/plain"',
        '@type': 'testTopic',
        '@displayField': 'heading',
        '@description':
          'Topic model, a heading, an abstract and a call to action',
      },
      fields: {
        heading: {
          blockTag: '@modelberry',
          inlineTags: {
            '@type': 'Symbol',
            '@validation': 'shortString',
          },
          isRequired: false,
          syntaxKind: ts.SyntaxKind.StringKeyword,
        },
        abstract: {
          blockTag: '@modelberry',
          inlineTags: {
            '@type': 'Symbol',
            '@validation': 'shortString',
          },
          isRequired: true,
          syntaxKind: ts.SyntaxKind.StringKeyword,
        },
      },
      isExported: true,
      name: 'ContentfulTopic',
    })
    const output = await renderInterface(intDec)
    expect(output).toEqual(`/** @modelberry
* - {@plugin "@modelberry/plugin-contentful/plain"}
* - {@type testTopic}
* - {@displayField heading}
* - {@description Topic model, a heading, an abstract and a call to action}
*/
export interface ContentfulTopic {
    /** @modelberry
    * - {@type Symbol}
    * - {@validation shortString}
    */
    heading?: string;
    /** @modelberry
    * - {@type Symbol}
    * - {@validation shortString}
    */
    abstract: string;
}`)
  })
})
