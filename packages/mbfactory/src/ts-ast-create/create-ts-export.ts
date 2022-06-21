import ts from 'typescript'

export interface CreateTsExport {
  /** An empty array generates: 'export * from' */
  namedExports: string[]
  from: string
}

export const createTsExport = ({ namedExports, from }: CreateTsExport) => {
  const exportSpecifiers = namedExports.map((name) =>
    ts.factory.createExportSpecifier(
      false,
      undefined,
      ts.factory.createIdentifier(name)
    )
  )
  const exportDeclaration = ts.factory.createExportDeclaration(
    undefined, // decorators,
    undefined, // modifiers
    false, // isTypeOnly,
    namedExports.length === 0
      ? undefined
      : ts.factory.createNamedExports(exportSpecifiers),
    ts.factory.createStringLiteral(from)
  )
  return exportDeclaration
}
