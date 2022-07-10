import { writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import {
  Node,
  createTsPrinter,
  createTsSourceFile,
  formatWithPrettier,
  printTsNodes,
  Options,
  logger,
} from '@modelberry/mbfactory/plain'
import inquirer from 'inquirer'
import { overwriteQuestion } from '../lib/questions'

export type SourceFile = {
  filename: string
  nodes: Node[]
  path: string
}

export interface WriteSourceFiles {
  files: SourceFile[]
  options: Options
}

export const writeSourceFiles = async ({
  files,
  options,
}: WriteSourceFiles) => {
  const printer = createTsPrinter()
  const sourceFile = createTsSourceFile()

  let skipAll = options.dryRun
  let writeAll = options.force
  for (const file of files) {
    const filename = `${file.path}/${file.filename}`
    const fileExists = existsSync(filename)
    if (!writeAll && !skipAll && fileExists) {
      logger.error(`- file exists: ${filename}`)
      const answers = await inquirer.prompt(overwriteQuestion)
      if (answers.policy === 'q') skipAll = true
      if (answers.policy === 'n') continue
      if (answers.policy === 'a') writeAll = true
    }
    if (skipAll) {
      logger.p(`- skipping source file ${filename}`)
      continue
    }
    logger.p(`- ${fileExists ? 'replacing' : 'new'} source file ${filename}`)
    const output = await printTsNodes({
      printer,
      sourceFile,
      nodes: file.nodes,
    })
    const outputFile = await formatWithPrettier({ source: output })
    await writeFile(filename, outputFile)
  }
}
