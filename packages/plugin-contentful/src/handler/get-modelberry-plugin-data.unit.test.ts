import { getModelberryPluginData } from './get-modelberry-plugin-data'

const dataVar = {
  fileName: '/__fixtures__/topic.ts',
  isArray: false,
  isExported: true,
  isObject: true,
  isTyped: true,
  name: 'modelberryPluginData',
  type: 'ModelberryPluginData',
  value: `{
    '@modelberry/plugin-contentful': {
      validations: {
        dropdown: { in: ['item A', 'item B', 'item C'] },
        camelCase: {
          regexp: { pattern: '^[a-z]+([A-Z][a-z0-9]+)*$', flags: '' },
        },
      },
    },
  }`,
}

describe('getModelberryPluginData should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('get data correctly', async () => {
    const data = getModelberryPluginData({ dataVar })
    expect(data).toMatchSnapshot()
  })
})
