import { PageSectionFeaturedWheelStyle } from '../../../wheelroom/wheels/page/unicorn/presets/page-section-featured-preset'
import { elementAsPrimaryButtonStyle } from '../elements/button-style'
import { wrapperStyle } from '../elements/grid-style'

export const pageSectionFeaturedStyle: PageSectionFeaturedWheelStyle = {
  container: {
    ncss: {},
  },
  topic: {
    ncss: {},
    content: {
      ncss: {},
      actions: {
        ncss: {},
        link: {
          ncss: {
            ...elementAsPrimaryButtonStyle,
          },
        },
      },
      text: {
        ncss: {},
        abstract: {
          ncss: {},
        },
        heading: {
          ncss: {},
        },
        icon: {
          ncss: {},
        },
      },
    },
    media: {
      ncss: {},
      image: {
        img: {
          ncss: {},
        },
        picture: {
          ncss: {},
        },
        figcaption: {
          ncss: {},
        },
      },
      video: {
        video: {
          ncss: {},
        },
        description: {
          ncss: {},
        },
      },
    },
  },
  wrapper: {
    ncss: {
      ...wrapperStyle,
    },
  },
}
