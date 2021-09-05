import ts from 'typescript'
import { createTsPrinter } from '../ts-ast-helpers/create-ts-printer'
import { createTsSourceFile } from '../ts-ast-helpers/create-ts-source-file'
import { printTsNodes } from '../ts-ast-helpers/print-ts-nodes'
import { createTsProperty, PropertyTree } from './create-ts-property'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderProps = async (members: ts.TypeElement[]) => {
  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
    undefined, // Decorators
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
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
  test('create an abstract?: string property', async () => {
    const propertyTree: PropertyTree = {
      abstract: { node: { tsSyntaxKind: ts.SyntaxKind.StringKeyword } },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    abstract?: string;
}`)
  })

  test('create a sys.id? property', async () => {
    const propertyTree: PropertyTree = {
      sys: {
        node: { isRequired: true },
        edges: { id: { node: { tsSyntaxKind: ts.SyntaxKind.StringKeyword } } },
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
        edges: { id: { node: { tsSyntaxKind: ts.SyntaxKind.StringKeyword } } },
      },
      abstract: { node: { tsSyntaxKind: ts.SyntaxKind.StringKeyword } },
      heading: {
        node: { isRequired: true, tsSyntaxKind: ts.SyntaxKind.StringKeyword },
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
    const comment = `*
    * @modelberry
    * - {@type Symbol}
    * - {@validations shortString}
    `
    const propertyTree: PropertyTree = {
      abstract: {
        node: { tsSyntaxKind: ts.SyntaxKind.StringKeyword, comment },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    /**
        * @modelberry
        * - {@type Symbol}
        * - {@validations shortString}
        */
    abstract?: string;
}`)
  })

  test('create a complex property with comments', async () => {
    const comment = `*
    * @modelberry
    * - {@type Symbol}
    * - {@validations longString}
    `
    const propertyTree: PropertyTree = {
      sys: {
        node: { comment },
        edges: { id: { node: { tsSyntaxKind: ts.SyntaxKind.StringKeyword } } },
      },
      abstract: {
        node: { comment, tsSyntaxKind: ts.SyntaxKind.StringKeyword },
      },
      heading: {
        node: { isRequired: true, tsSyntaxKind: ts.SyntaxKind.StringKeyword },
      },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    /**
        * @modelberry
        * - {@type Symbol}
        * - {@validations longString}
        */
    sys?: {
        id?: string;
    };
    /**
        * @modelberry
        * - {@type Symbol}
        * - {@validations longString}
        */
    abstract?: string;
    heading: string;
}`)
  })
})
