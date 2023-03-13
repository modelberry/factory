import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { tsSyntaxKind } from './create-ts-interface'
import { createTsProperty, PropertyTree } from './create-ts-property'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderProps = async (members: ts.TypeElement[]) => {
  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
    [ts.factory.createToken(tsSyntaxKind.ExportKeyword)],
    'ContentfulTopic',
    undefined, // Type parameters
    undefined, // heritage classes
    members
  )
  const output = await printTsNodes({
    printer,
    sourceFile,
    nodes: [interfaceDeclaration],
  })
  return output
}

describe('Create ts property should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create an abstract?: string property', async () => {
    const propertyTree: PropertyTree = {
      abstract: {
        node: { createKeywordTypeNode: tsSyntaxKind.StringKeyword },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    abstract?: string;
}`)
  })

  test('create an abstract?: string[] property', async () => {
    const propertyTree: PropertyTree = {
      abstract: {
        node: {
          createKeywordTypeNode: tsSyntaxKind.StringKeyword,
          isArrayTypeNode: true,
        },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    abstract?: string[];
}`)
  })

  test('create an topic?: Topic property', async () => {
    const propertyTree: PropertyTree = {
      topic: { node: { createTypeReferenceNode: 'Topic' } },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    topic?: Topic;
}`)
  })

  test('create an topic?: Topic[] property', async () => {
    const propertyTree: PropertyTree = {
      topic: {
        node: { createTypeReferenceNode: 'Topic', isArrayTypeNode: true },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    topic?: Topic[];
}`)
  })

  test('create a sys.id? property', async () => {
    const propertyTree: PropertyTree = {
      sys: {
        node: { isRequired: true },
        edges: {
          id: { node: { createKeywordTypeNode: tsSyntaxKind.StringKeyword } },
        },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    sys: {
        id?: string;
    };
}`)
  })

  test('create a complex property', async () => {
    const propertyTree: PropertyTree = {
      sys: {
        edges: {
          id: { node: { createKeywordTypeNode: tsSyntaxKind.StringKeyword } },
        },
      },
      abstract: {
        node: { createKeywordTypeNode: tsSyntaxKind.StringKeyword },
      },
      heading: {
        node: {
          isRequired: true,
          createKeywordTypeNode: ts.SyntaxKind.StringKeyword,
        },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    sys?: {
        id?: string;
    };
    abstract?: string;
    heading: string;
}`)
  })

  test('create an abstract property with comment', async () => {
    const propertyTree: PropertyTree = {
      abstract: {
        node: {
          createKeywordTypeNode: ts.SyntaxKind.StringKeyword,
          blockTag: '@modelberry',
          inlineTags: { '@type': 'Symbol', '@validations': 'shortString' },
        },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    /** @modelberry
    * - {@type Symbol}
    * - {@validations shortString}
    */
    abstract?: string;
}`)
  })

  test('create a complex property with comments', async () => {
    const propertyTree: PropertyTree = {
      sys: {
        node: {
          blockTag: '@modelberry',
          inlineTags: { '@type': 'Symbol', '@validations': 'longString' },
        },
        edges: {
          id: { node: { createKeywordTypeNode: ts.SyntaxKind.StringKeyword } },
        },
      },
      abstract: {
        node: {
          blockTag: '@modelberry',
          inlineTags: { '@type': 'Symbol', '@validations': 'longString' },
          createKeywordTypeNode: ts.SyntaxKind.StringKeyword,
        },
      },
      heading: {
        node: {
          isRequired: true,
          createKeywordTypeNode: ts.SyntaxKind.StringKeyword,
        },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    /** @modelberry
    * - {@type Symbol}
    * - {@validations longString}
    */
    sys?: {
        id?: string;
    };
    /** @modelberry
    * - {@type Symbol}
    * - {@validations longString}
    */
    abstract?: string;
    heading: string;
}`)
  })
})
