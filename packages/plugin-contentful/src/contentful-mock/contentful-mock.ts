import { Environment, Locale } from 'contentful-management/types'
import { getContentTypeResponse } from './get-content-type-response'
import { getContentTypesResponse } from './get-content-types-response'
import { getEntriesQueryResponse } from './get-entries-query-response'

const entryMock = {
  fields: {},
  mockedField: 'test',
  publish: async () => entryMock,
  update: async () => entryMock,
}
const localeMock = {
  items: [
    {
      code: 'en-US',
      default: true,
      fallbackCode: 'en-US',
      name: 'English (United States)',
      optional: false,
    },
  ] as Locale[],
}
export const contentTypeMock = {
  ...getContentTypeResponse,
  getEditorInterface: async () => contentTypeMock,
  publish: async () => contentTypeMock,
  update: async () => contentTypeMock,
}
export const createEntryWithId = jest.fn(async () => entryMock)
export const createEntry = jest.fn(async () => entryMock)
export const getEntry = jest.fn(async () => entryMock)
export const getEntries = jest.fn(async () => getEntriesQueryResponse)
export const getLocales = jest.fn(async () => localeMock)
export const getContentType = jest.fn(async () => contentTypeMock)
export const getContentTypes = jest.fn(async () => getContentTypesResponse)
export const createContentTypeWithId = jest.fn(async () => contentTypeMock)
export const environmentMock = {
  createEntry,
  createEntryWithId,
  createContentTypeWithId,
  getEntry,
  getEntries,
  getContentType,
  getContentTypes,
  getLocales,
} as unknown as Environment
export const getEnvironment = jest.fn(async () => environmentMock)
export const getSpace = jest.fn(async () => ({ getEnvironment }))
export const createClient = jest.fn(() => ({ getSpace }))