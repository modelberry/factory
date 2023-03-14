import {
  LoggerType,
  PropertryNode,
  PropertyTree,
} from '@modelberry/mbfactory'

export type ReportLevel = 'contentType' | 'field' | 'tagKey' | 'tagValue'
export type ReportEntryState = 'add' | 'remove' | 'equal' | 'modified'

export type LocalField = {
  tags?: Record<string, string> | undefined
  type?: string | undefined
}

export type RemoteField = {
  node?: PropertryNode | undefined
  edges?: PropertyTree | undefined
}

export type ReportEntry = {
  /** The change the entry represents */
  state: ReportEntryState
  /** The style of the message (h1, h2, etc) */
  loggerType: LoggerType
  /** The nested level of the message */
  logLevel: ReportLevel
  /** The message itself */
  message?: string
  /** Subentries of this entry */
  subEntries: ReportEntry[]
  /** Modification */
  modification?: {
    before?: string
    after?: string
  }
}
