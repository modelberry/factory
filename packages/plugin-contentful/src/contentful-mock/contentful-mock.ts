import { Environment, Locale } from 'contentful-management/types'
import { editorInterfaces } from './editor-interfaces'
import { getContentTypeResponse } from './get-content-type-response'
import { getContentTypesResponse } from './get-content-types-response'
import { getEntriesQueryResponse } from './get-entries-query-response'
import { getEntriesResponse } from './get-entries-response'

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
export const getContentTypeMock = async (contentType: any) => ({
  ...contentType,
  getEditorInterface: async () => ({
    ...editorInterfaces[contentType.name],
    update: async () => editorInterfaces[contentType.name],
  }),
  publish: async () => await getContentTypeMock(contentType),
  update: async () => await getContentTypeMock(contentType),
})

export const getContentTypesMock = async () => {
  for (const ct of getContentTypesResponse.items)
    Object.assign(ct, await getContentTypeMock(ct))
  return getContentTypesResponse
}

export const getEntriesMock = async (query: any) => {
  const entries = query.content_type
    ? getEntriesQueryResponse
    : getEntriesResponse
  for (const entry of entries.items)
    Object.assign(entry, await getContentTypeMock(entry))
  return entries
}

export const createEntryWithId = jest.fn(async () => entryMock)
export const createEntry = jest.fn(async () => entryMock)
export const getEntry = jest.fn(async () => entryMock)
export const getEntries = jest.fn(getEntriesMock)
export const getLocales = jest.fn(async () => localeMock)
export const getContentType = jest.fn(async () =>
  getContentTypeMock(getContentTypeResponse)
)
export const getContentTypes = jest.fn(getContentTypesMock)
export const createContentTypeWithId = jest.fn(async () =>
  getContentTypeMock(getContentTypeResponse)
)
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
