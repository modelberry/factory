import { logger } from '@modelberry/mbfactory'
import chalk from 'chalk'
import { reportEntryHasChanges } from './report-entry-has-changes'
import { ReportEntry } from './report-entries'

const indentCountMap = {
  contentType: 0,
  field: 2,
  tagKey: 4,
  tagValue: 6,
}

export interface Printer {
  /** Array with report values */
  report: ReportEntry[]
}

export const printer = ({ report }: Printer) => {
  report.forEach((reportEntry) => {
    const noChanges = !reportEntryHasChanges({ reportEntry })
    const rootLevel = reportEntry.logLevel === 'contentType'
    const fieldLevel = reportEntry.logLevel === 'field'
    const indentString = ''.padStart(indentCountMap[reportEntry.logLevel], ' ')
    const noChangesPostfix =
      (rootLevel || fieldLevel) && noChanges ? ' (no changes)' : ''
    let message
    switch (reportEntry.state) {
      case 'modified':
        message = `${chalk.red(
          reportEntry.modification?.before
        )} => ${chalk.green(reportEntry.modification?.after)}`
        break
      case 'add':
        message = chalk.green(reportEntry.message)
        break
      case 'remove':
        message = chalk.red(reportEntry.message)
        break
      case 'equal':
        message = reportEntry.message
        break
      default:
        message = reportEntry.message
        break
    }
    logger[reportEntry.loggerType](indentString + message + noChangesPostfix)
    // Stop printing if root or field level and there are no changes
    if (!((rootLevel || fieldLevel) && noChanges))
      printer({ report: reportEntry.subEntries })
  })
}
