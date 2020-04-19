import { NavHeaderWheelStyle } from '../../../wheelroom/wheels/page/navigation-header/presets/nav-header-preset'
import { wrapperStyle } from '../elements/grid-style'
import {
  elementAsPrimaryButtonStyle,
  secondaryButtonStyle,
} from '../elements/button-style'

export const navHeaderStyle: NavHeaderWheelStyle = {
  skipToContent: {
    ncss: {
      ':focus': {
        bg: 'amber',
        color: 'caviar',
      },
    },
  },
  wrapper: {
    ncss: {
      ...wrapperStyle,
      borderColor: 'sectionBorder',
    },
  },
  container: {
    ncss: {},
  },
  branding: {
    ncss: {},
    logo: {
      ncss: {},
    },
    link: {
      ncss: {
        color: 'sectionText',
      },
    },
    sup: {
      ncss: {
        color: 'bullet',
      },
    },
  },
  navHeader: {
    ncss: {},
    list: {
      ncss: {},
      listItem: {
        ncss: {},
        link: {
          ncss: {},
        },
      },
    },
    actions: {
      ncss: {},
      action: {
        ncss: {
          ...elementAsPrimaryButtonStyle,
        },
      },
      themeButton: {
        ncss: {
          ...secondaryButtonStyle,
        },
      },
    },
  },
  modal: {
    ncss: {},
    button: {
      ncss: {},
    },
    dialog: {
      container: {
        visible: {
          ncss: {},
        },
        hidden: {
          ncss: {},
        },
      },
      overlay: {
        visible: {
          ncss: {},
        },
        hidden: {
          ncss: {},
        },
      },
      document: {
        ncss: {},
        visible: {
          ncss: {
            bg: 'sectionBg',
            borderColor: 'modalBorder',
            borderRadius: 4,
            boxShadow: '0 0 16px',
            color: 'modalShadow',
          },
        },
        hidden: {
          ncss: {},
        },
        closeNavigationButton: {
          ncss: {},
          icon: {
            ncss: {
              color: 'white',
            },
          },
        },
        list: {
          ncss: {},
          listItem: {
            ncss: {
              borderColor: 'sectionBorder',
            },
            link: {
              ncss: {},
            },
          },
        },
        actions: {
          ncss: {
            flexDirection: 'row',
          },
          action: {
            ncss: {
              ...elementAsPrimaryButtonStyle,
              mb: 0,
              w: [1 / 2],
            },
          },
          themeButton: {
            ncss: {
              ...secondaryButtonStyle,
              ml: 2,
              w: [1 / 2],
            },
          },
        },
      },
    },
  },
}
