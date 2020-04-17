import { NcssProps } from '../../../types'
import { navFooterSocialListItemPreset } from './nav-footer-social-list-item-preset'

export interface NavFooterSocialListPreset {
  ncss: NcssProps
  item: NcssProps
}

export const navFooterSocialListPreset: NavFooterSocialListPreset = {
  ncss: {
    label: 'nav-footer-social-list',
    display: 'flex',
    flexDirection: 'row',
    listPreset: 'none',
    flexWrap: 'wrap',
    my: 0,
    pl: 0,
  },
  item: navFooterSocialListItemPreset,
}