jest.mock('fs/promises')

import { reportContentType } from './report-content-type'
import { localContentTypes } from './__fixtures__/local-content-types'
import { remoteContentTypes } from './__fixtures__/remote-content-types'
import { localValidationsMap } from './__fixtures__/local-validations-map'
import { remoteValidationsMap } from './__fixtures__/remote-validations-map'

describe('reportContentType should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create a report correctly', async () => {
    const report = reportContentType({
      localContentTypes,
      remoteContentTypes,
      localValidationsMap,
      remoteValidationsMap,
    })
    expect(report).toMatchSnapshot()
  })
  test('create a reversed report correctly', async () => {
    const report = reportContentType({
      localContentTypes,
      remoteContentTypes,
      localValidationsMap,
      remoteValidationsMap,
      reverse: true,
    })
    expect(report).toMatchSnapshot()
  })
})
