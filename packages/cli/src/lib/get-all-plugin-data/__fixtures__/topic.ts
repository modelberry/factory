import { ModelberryPluginData } from '@modelberry/plugin-contentful/plain'
import { ContentfulAction } from './topic-action'
import { ContentfulAsset } from './topic-asset'

/**
 * This desciption is not used
 * @modelberry
 * - {@plugin "@modelberry/plugin-contentful/plain"}
 * - {@type testTopic}
 * - {@displayField heading}
 * - {@description Topic model, a heading, an abstract and a call to action}
 */
export interface ContentfulTopic {
  sys?: {
    id: string
  }

  /** @modelberry
   * - {@type Symbol}
   * - {@validation shortString} */
  abstract?: string

  /**
   * @modelberry
   * - {@type Array}
   * - {@itemsType Link}
   * - {@itemsLinkType Entry}
   * - {@validation action}
   * - {@description Action field, this is the description}
   */
  actionsCollection?: {
    items: ContentfulAction[]
  }

  /** @modelberry {@type Symbol} */
  heading?: string

  /** @modelberry {@type Symbol} */
  icon?: string

  /**
   * @modelberry
   *  - {@type Array}
   *  - {@itemsType Link}
   *  - {@itemsLinkType Asset}
   */
  mediaCollection?: {
    items: ContentfulAsset[]
  }

  /** @modelberry
   * - {@type Link}
   * - {@linkType Asset}
   */
  poster?: ContentfulAsset
}

export const myTopics: ContentfulTopic[] = [
  {
    abstract: 'This is the abstract',
    actionsCollection: {
      items: [
        {
          sys: {
            id: 'myContentActionId',
          },
        },
      ],
    },
    heading: 'Heres the heading',
  },
]

export const notAnArray: ContentfulTopic = {
  abstract: 'This is the abstract',
  heading: 'Heres the heading',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notExported: ContentfulTopic[] = [
  {
    abstract: 'This is the abstract',
    heading: 'Heres the heading',
  },
]

type NotTagged = { thisVariable: string }
export const notTaggedArray: NotTagged[] = [
  {
    thisVariable: 'is not tagged',
  },
]

export const notTaggedObject: NotTagged = {
  thisVariable: 'is not tagged',
}

export const modelberryPluginData: ModelberryPluginData = {
  '@modelberry/plugin-contentful/plain': {
    validations: {
      dropdown: { in: ['item A', 'item B', 'item C'] },
      media: { linkMimetypeGroup: ['image', 'video'] },
      action: { linkContentType: ['action'] },
      shortString: { size: { max: 155, min: 0 } },
      camelCase: {
        regexp: { pattern: '^[a-z]+([A-Z][a-z0-9]+)*$', flags: '' },
      },
      path: {
        regexp: {
          pattern: '^\\/[a-z0-9:\\._/~%\\-\\+&\\#\\?!=\\(\\)@]*$',
          flags: '',
        },
      },
      url: {
        regexp: {
          pattern:
            '^(ftp|http|https|mailto):(\\/\\/)*(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
          flags: '',
        },
      },
    },
  },
}
