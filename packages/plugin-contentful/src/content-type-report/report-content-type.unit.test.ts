jest.mock('fs/promises')

import { reportContentType } from './report-content-type'
import { localContentTypes } from './__fixtures__/local-content-types'
import { remoteContentTypes } from './__fixtures__/remote-content-types'

describe('reportContentType should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create a report correctly', async () => {
    const report = reportContentType({
      localContentTypes,
      remoteContentTypes,
    })
    expect(report).toMatchSnapshot()
  })
  test('create a reversed report correctly', async () => {
    const report = reportContentType({
      localContentTypes,
      remoteContentTypes,
      reverse: true,
    })
    expect(report).toMatchSnapshot()
  })
})
