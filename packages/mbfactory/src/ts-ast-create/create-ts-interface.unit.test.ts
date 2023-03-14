import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { createTsInterface, tsSyntaxKind } from './create-ts-interface'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderInterface = async (interfaceDeclaration: ts.Node) => {
  const output = await printTsNodes({
    printer,
    sourceFile,
    nodes: [interfaceDeclaration],
  })
  return output
}

describe('Create ts interface should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create an interface', async () => {
    const intDec = createTsInterface({
      blockTag: '@modelberry',
      inlineTags: {
        '@plugin': '"@modelberry/plugin-contentful"',
        '@type': 'testTopic',
        '@displayField': 'heading',
        '@description':
          'Topic model, a heading, an abstract and a call to action',
      },
      propertyTree: {
        heading: {
          node: {
            blockTag: '@modelberry',
            inlineTags: {
              '@type': 'Symbol',
              '@validations': 'shortString',
            },
            isRequired: false,
            createKeywordTypeNode: tsSyntaxKind.StringKeyword,
          },
        },
      },
      isExported: true,
      name: 'ContentfulTopic',
    })
    const output = await renderInterface(intDec)
    expect(output).toEqual(`/** @modelberry
* - {@plugin "@modelberry/plugin-contentful"}
* - {@type testTopic}
* - {@displayField heading}
* - {@description Topic model, a heading, an abstract and a call to action}
*/
export interface ContentfulTopic {
    /** @modelberry
    * - {@type Symbol}
    * - {@validations shortString}
    */
    heading?: string;
}`)
  })

  test('create a complex interface', async () => {
    const intDec = createTsInterface({
      blockTag: '@modelberry',
      inlineTags: {
        '@plugin': '"@modelberry/plugin-contentful"',
        '@type': 'testTopic',
        '@displayField': 'heading',
        '@description':
          'Topic model, a heading, an abstract and a call to action',
      },
      propertyTree: {
        heading: {
          node: {
            blockTag: '@modelberry',
            inlineTags: {
              '@type': 'Symbol',
              '@validations': 'shortString',
            },
            isRequired: false,
            createKeywordTypeNode: tsSyntaxKind.StringKeyword,
          },
        },
        abstract: {
          node: {
            blockTag: '@modelberry',
            inlineTags: {
              '@type': 'Symbol',
              '@validations': 'shortString',
            },
            isRequired: true,
            createKeywordTypeNode: tsSyntaxKind.StringKeyword,
          },
        },
      },
      isExported: true,
      name: 'ContentfulTopic',
    })
    const output = await renderInterface(intDec)
    expect(output).toEqual(`/** @modelberry
* - {@plugin "@modelberry/plugin-contentful"}
* - {@type testTopic}
* - {@displayField heading}
* - {@description Topic model, a heading, an abstract and a call to action}
*/
export interface ContentfulTopic {
    /** @modelberry
    * - {@type Symbol}
    * - {@validations shortString}
    */
    heading?: string;
    /** @modelberry
    * - {@type Symbol}
    * - {@validations shortString}
    */
    abstract: string;
}`)
  })
})
