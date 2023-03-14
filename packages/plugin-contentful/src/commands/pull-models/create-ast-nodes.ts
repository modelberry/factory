import {
  camelToKebab,
  createTsImport,
  createTsInterface,
  firstLowerCase,
  PropertyTree,
} from '@modelberry/mbfactory'
import ts from 'typescript'

export interface CreateAstNodes {
  inlineTags: Record<string, any>
  interfaceName: string
  namedImports: string[]
  propertyTree: PropertyTree
}

export const createAstNodes = ({
  inlineTags,
  interfaceName,
  namedImports,
  propertyTree,
}: CreateAstNodes): (ts.ImportDeclaration | ts.InterfaceDeclaration)[] => {
  const interfaceDeclaration = createTsInterface({
    blockTag: '@modelberry',
    inlineTags,
    propertyTree,
    isExported: true,
    name: interfaceName,
  })

  // Add imports for required types
  const uniqueNamedImports = Array.from(new Set(namedImports))
  const entryImportStatements = uniqueNamedImports.map((ni) =>
    createTsImport({
      namedImports: [`${ni}`],
      from: `./${camelToKebab(firstLowerCase(ni))}`,
    })
  )
  return [...entryImportStatements, interfaceDeclaration]
}
