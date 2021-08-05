import ts from 'typescript'
import { getCompilerOptions } from '../lib/get-compiler-options/get-compiler-options'
import { parseModelberryVariable } from '../lib/parse-modelberry-variable'
import { parseModelberryInterface } from '../lib/parse-modelberry-interface'

interface PrintNode {
  node: ts.Node
  printer: ts.Printer
  checker: ts.TypeChecker
  sourceFile: ts.SourceFile
}

const printNode = ({ node, checker, printer, sourceFile }: PrintNode) => {
  const parsedVar = parseModelberryVariable({ node, sourceFile })
  if (parsedVar.isArray || parsedVar.isObject) {
    console.log(
      `Found: sending ${parsedVar.name}: ${parsedVar.type} to platform`
    )
  }
  const wrInterface = parseModelberryInterface({ node, checker })
  if (!wrInterface) return
  const printThis = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
  console.log(printThis)
  console.log(wrInterface)
}

const runPoc = () => {
  console.log('Starting Proof Of Concept')
  const compilerOptions = getCompilerOptions()
  const program = ts.createProgram(
    ['./src/fixtures/topic.ts'],
    compilerOptions.options
  )
  const checker = program.getTypeChecker()
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) continue
    console.log('----> source:', sourceFile.fileName)
    ts.forEachChild(sourceFile, (node: ts.Node) => {
      printNode({ node, checker, printer, sourceFile })
    })
  }
}

runPoc()
