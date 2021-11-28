import ts from 'typescript'

export interface CreateTsImport {
  namedImports: string[]
  from: string
}

export const createTsImport = ({ namedImports, from }: CreateTsImport) => {
  const importSpecifiers = namedImports.map((name) =>
    ts.factory.createImportSpecifier(
      false,
      undefined,
      ts.factory.createIdentifier(name)
    )
  )
  const importDeclaration = ts.factory.createImportDeclaration(
    undefined, // decorators
    undefined, // modifiers
    ts.factory.createImportClause(
      false, // isTypeOnly
      undefined,
      ts.factory.createNamedImports(importSpecifiers)
    ),
    ts.factory.createStringLiteral(from)
  )
  return importDeclaration
}
