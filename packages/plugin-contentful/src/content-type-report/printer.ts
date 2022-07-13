import { logger } from '@modelberry/mbfactory/plain'
import { hasDifferences } from './has-differences'
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
    const isDifferent = hasDifferences({ reportEntry })
    const isRootLevel = reportEntry.logLevel === 'contentType'
    const rootHasNochanges = isRootLevel && !isDifferent
    const indentString = ''.padStart(indentCountMap[reportEntry.logLevel], ' ')
    const noChangesPostfix = rootHasNochanges ? ' (no changes)' : ''
    logger[reportEntry.loggerType](
      indentString + reportEntry.message + noChangesPostfix
    )
    // Continue printing if root has changes
    if (!rootHasNochanges) printer({ report: reportEntry.subEntries })
  })
}
