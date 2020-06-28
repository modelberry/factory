import { TopicSectionModelNcssTree } from '../../../../../../src-topic-wheel'
import {
  primaryButtonNcssNode,
  displayButtonNcssNode,
  secondaryButtonNcssNode,
} from '../../../element-ncss/button-ncss'
import { iconButtonNcssNode, iconTopicNcssNode } from '../../icon-ncss'
import { embedNcssNode } from '../../embed-ncss'
import { containerNcssNode, wrapperNcssNode } from '../../grid-ncss'
import { DeepPartial } from '../../../../../../src-core'

export const topicSectionHeadlineNcssTree: DeepPartial<TopicSectionModelNcssTree> = {
  container: containerNcssNode,
  topic: {
    content: {
      ncss: {
        textAlign: 'center',
        mx: 'auto',
        p: 3,
        maxWidth: [1, '48em'],
        py: 5,
      },
    },
    actionGroup: {
      ncss: {
        mt: 3,
      },
    },
    action: {
      ncss: {
        ...primaryButtonNcssNode.ncss,
        ...displayButtonNcssNode.ncss,
        ':nth-of-type(2)': {
          ...secondaryButtonNcssNode.ncss,
          ...displayButtonNcssNode.ncss,
        },
      },
      icon: iconButtonNcssNode,
    },
    abstract: {
      ncss: {
        fontSize: [7, 7, 8, 8],
      },
    },
    icon: iconTopicNcssNode,
    embed: embedNcssNode,
  },
  wrapper: wrapperNcssNode,
}
