import { logger } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { printer } from './printer'
import { ReportEntry } from './report-entries'

export interface PrintReport {
  /** Heading above report */
  heading: string
  /** Array with report values */
  report: ReportEntry[]
}

export const printContentTypeReport = ({ heading, report }: PrintReport) => {
  logger.h1(`\n${heading}\n`)
  logger.p(chalk.green('ADD') + '/' + chalk.red('REMOVE') + '\n')
  printer({ report })
}
