import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  dashboard: icon('ic-home'),
  preview: icon('ic-staretd'),
  settings: icon('ic-gear')
};

// ----------------------------------------------------------------------

export const navData = [
  {
    subheader: '',
    items: [
      {
        title: 'Overview',
        path: paths.aisearch.overview.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'Preview',
        path: paths.aisearch.preview.root,
        icon: ICONS.preview,
      },
      {
        title: 'Settings',
        path: paths.aisearch.setting.root,
        icon: ICONS.settings,
      },
    ],
  },
];
