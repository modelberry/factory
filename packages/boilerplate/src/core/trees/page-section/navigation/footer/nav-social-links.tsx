import { List } from '../../../../elements/list'
import { TopicProps } from '../../../../../models/topic'
import { FeatherIcon } from '../../../../elements/icon'
import React from 'react'
import { ActionTree } from '../../../action/action-tree'
import { NavSocialLinksTreeStyle } from './nav-social-links-style'

export const NavSocialLinks = (props: {
  topics: TopicProps[]
  treeStyle: NavSocialLinksTreeStyle
}) => {
  const treeStyle = props.treeStyle || {}
  return (
    <List is="ul" ncss={treeStyle.list}>
      {props.topics.map((topic: TopicProps, index: number) => (
        <List is={'li'} key={index}>
          <ActionTree {...topic.actions[0]} treeStyle={treeStyle.action}>
            <FeatherIcon ncss={treeStyle.icon} icon={topic.icon as string} />
          </ActionTree>
        </List>
      ))}
    </List>
  )
}