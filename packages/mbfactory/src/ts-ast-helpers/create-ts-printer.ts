import ts from 'typescript'

export const createTsPrinter = () => {
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    noEmitHelpers: true,
    omitTrailingSemicolon: true,
    removeComments: false,
  })
  return printer
}
