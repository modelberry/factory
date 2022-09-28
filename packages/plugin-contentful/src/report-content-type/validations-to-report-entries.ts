import { ValidationsMap } from '../handler/get-modelberry-plugin-data'
import {
  compareValidations,
  valArrayIncludesObj,
} from '../lib/compare-validations'
import { ReportEntry, ReportEntryState } from './report-entries'

export interface ValidationsToReportEntries {
  /** Local validations */
  localValidationsMap: ValidationsMap
  /** Remote validations */
  remoteValidationsMap: ValidationsMap
  /** Value of local validations tag */
  localTagValue: string
  /** Value of remote validations tag */
  remoteTagValue: string
  /** Reverse local and remote */
  reverse?: boolean
}

export const validationsToReportEntries = ({
  localValidationsMap,
  remoteValidationsMap,
  localTagValue,
  remoteTagValue,
  reverse,
}: ValidationsToReportEntries) => {
  const localVals = localTagValue
    .split(' ')
    .filter((name) => name in localValidationsMap)
    .map((name) => ({ name, val: localValidationsMap[name] }))
  const remoteVals = remoteTagValue
    .split(' ')
    .filter((name) => name in remoteValidationsMap)
    .map((name) => ({ name, val: remoteValidationsMap[name] }))

  const compared = compareValidations({
    a: localVals,
    b: remoteVals,
    reverse,
  })

  const reportEntries: ReportEntry[] = []
  compared.union.forEach((valObj) => {
    let state: ReportEntryState = 'equal'
    if (valArrayIncludesObj(compared.aOnly, valObj)) state = 'add'
    if (valArrayIncludesObj(compared.bOnly, valObj)) state = 'remove'

    const contentTypeReportEntry: ReportEntry = {
      state,
      logLevel: 'tagValue',
      loggerType: 'p',
      subEntries: [],
      message: valObj.name,
    }
    reportEntries.push(contentTypeReportEntry)
  })
  return reportEntries
}
