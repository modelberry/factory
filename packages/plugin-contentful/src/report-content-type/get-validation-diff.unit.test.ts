import { getValidationReportEntries } from './get-validation-diff'
import { localValidationsMap } from './__fixtures__/local-validations-map'
import { remoteValidationsMap } from './__fixtures__/remote-validations-map'

describe('getValidationDiff should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('sort the validations string', async () => {
    const diffs = getValidationReportEntries({
      localValidationsMap,
      remoteValidationsMap,
      localTagValue: 'regexp-1',
      remoteTagValue: 'regexp-1',
    })
    expect(diffs).toEqual([
      {
        logLevel: 'tagValue',
        loggerType: 'p',
        message: 'regexp-1',
        state: 'equal',
        subEntries: [],
      },
    ])
  })
})
