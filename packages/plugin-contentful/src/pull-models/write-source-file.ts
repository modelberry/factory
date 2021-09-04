import { writeFile } from 'fs/promises'
import {
  Node,
  createTsPrinter,
  createTsSourceFile,
  formatWithPrettier,
  printTsNodes,
} from '@modelberry/mbfactory/plain'

export interface WriteSourceFile {
  filename: string
  nodes: Node[]
  path: string
}

export const writeSourceFile = async ({
  filename,
  nodes,
  path,
}: WriteSourceFile) => {
  const printer = createTsPrinter()
  const sourceFile = createTsSourceFile()

  const output = await printTsNodes({
    printer,
    sourceFile,
    nodes,
  })
  const outputFile = await formatWithPrettier({ source: output })

  await writeFile(`${path}/${filename}`, outputFile)
}
