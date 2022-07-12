import { logger } from '@modelberry/mbfactory/plain'
import chalk from 'chalk'
import { ReportEntry } from './report-entries'

export interface PrintReport {
  report: ReportEntry[]
}

const indentCountMap = {
  contentType: 0,
  field: 2,
  tagKey: 4,
  tagValue: 6,
}

const printer = ({ report }: PrintReport) => {
  report.forEach((entry) => {
    const indentString = ''.padStart(indentCountMap[entry.logLevel], ' ')
    logger[entry.loggerType](indentString + entry.message)
    if (entry.subEntries.length) printer({ report: entry.subEntries })
  })
}

export const printReport = ({ report }: PrintReport) => {
  logger.h1(`\nHow models will change at Contentful\n`)
  logger.p(chalk.green('ADD') + '/' + chalk.red('REMOVE') + '\n')
  printer({ report })
}
