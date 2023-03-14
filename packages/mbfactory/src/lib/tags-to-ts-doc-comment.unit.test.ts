import { tagsToTsDocComment } from './tags-to-ts-doc-comment'

describe('Create Ts Doc Comment From Tags should', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create a comment', async () => {
    const result = tagsToTsDocComment({
      blockTag: '@modelberry',
      inlineTags: {
        '@plugin': '"@modelberry/plugin-contentful"',
        '@type': 'testTopic',
        '@displayField': 'heading',
        '@description':
          'Topic model, a heading, an abstract and a call to action',
      },
    })
    expect(result).toEqual(`@modelberry
* - {@plugin "@modelberry/plugin-contentful"}
* - {@type testTopic}
* - {@displayField heading}
* - {@description Topic model, a heading, an abstract and a call to action}
`)
  })
})
