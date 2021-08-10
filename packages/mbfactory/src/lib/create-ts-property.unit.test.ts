import ts from 'typescript'
import { createTsPrinter } from './create-ts-printer'
import { createTsSourceFile } from './create-ts-source-file'
import { printTsNode } from './print-ts-node'
import { createTsProperty } from './create-ts-property'

const printer = createTsPrinter()
const sourceFile = createTsSourceFile()

const renderProps = async (members: ts.TypeElement[]) => {
  const int = ts.factory.createInterfaceDeclaration(
    undefined, // Decorators
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    'ContentfulTopic',
    undefined, // Type parameters
    undefined, // heritage classes
    members
  )
  const output = await printTsNode({ printer, sourceFile, node: int })
  return output
}

describe('Create ts property should', () => {
  test('create an abstract?: string property', async () => {
    const propertyTree = {
      abstract: { node: { syntaxKind: ts.SyntaxKind.StringKeyword } },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    abstract?: string;
}`)
  })

  test('create a sys.id? property', async () => {
    const propertyTree = {
      sys: {
        node: { isRequired: true },
        edges: { id: { node: { syntaxKind: ts.SyntaxKind.StringKeyword } } },
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
    const propertyTree = {
      sys: {
        edges: { id: { node: { syntaxKind: ts.SyntaxKind.StringKeyword } } },
      },
      abstract: { node: { syntaxKind: ts.SyntaxKind.StringKeyword } },
      heading: {
        node: { isRequired: true, syntaxKind: ts.SyntaxKind.StringKeyword },
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
    const comment = `
    * @modelberry
    * - {@type Symbol}
    * - {@validation shortString}
    `
    const propertyTree = {
      abstract: { node: { syntaxKind: ts.SyntaxKind.StringKeyword, comment } },
    }
    const members = createTsProperty({ propertyTree })
    const output = await renderProps(members)
    expect(output).toEqual(`export interface ContentfulTopic {
    /**
        * @modelberry
        * - {@type Symbol}
        * - {@validation shortString}
        */
    abstract?: string;
}`)
  })
})