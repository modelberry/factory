import { Div } from '@wheelroom/any/elements'
import { Action } from '../../../action/action'
import { TopicOptions } from '../../topic-options'
import { TopicVariantMap } from '../../topic-variants'
import { topicActionsVariantStyle } from './topic-actions-variant-style'

export type TopicActions = {
  actions: Action[]
}

export interface TopicActionsProps {
  model: TopicActions
  options: TopicOptions
  variantMap: TopicVariantMap
}

export const TopicActions = (props: TopicActionsProps) => {
  return (
    <Div
      css={topicActionsVariantStyle({ variant: props.variantMap.topicActions })}
    >
      {props.model.actions.map((action: Action) => (
        <Div key={action.sys.id}>{action.heading}</Div>
      ))}
    </Div>
  )
}