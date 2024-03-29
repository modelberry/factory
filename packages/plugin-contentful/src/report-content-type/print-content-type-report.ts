import { logger } from '@modelberry/mbfactory'
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
  logger.h1(
    `\n${heading} (${chalk.green('addition')}/${chalk.red('deletion')})\n`
  )
  printer({ report })
}
