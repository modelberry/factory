import { createTsDocCommentFromTags } from './create-ts-doc-comment-from-tags'

describe('Create Ts Doc Comment From Tags should', () => {
  test('create a comment', async () => {
    const result = createTsDocCommentFromTags({
      blockTag: '@modelberry',
      inlineTags: {
        '@plugin': '"@modelberry/plugin-contentful/plain"',
        '@type': 'testTopic',
        '@displayField': 'heading',
        '@description':
          'Topic model, a heading, an abstract and a call to action',
      },
    })
    expect(result).toEqual(`* @modelberry
* - {@plugin "@modelberry/plugin-contentful/plain"}
* - {@type testTopic}
* - {@displayField heading}
* - {@description Topic model, a heading, an abstract and a call to action}
`)
  })
})
