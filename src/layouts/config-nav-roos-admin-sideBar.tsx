import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-home'),
  parameter: icon('ic-parameter'),
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
        title: 'Get Started',
        path: paths.aisearch.getstarted.root,
        icon: ICONS.menuItem,
      },
      // {
      //   title: 'Customers',
      //   path: paths.roosadmin.customers.root,
      //   icon: ICONS.user,
      // },
      // {
      //   title: 'Coupons',
      //   path: paths.roosadmin.coupons.root,
      //   icon: ICONS.invoice,
      // },
      // {
      //   title: 'Statistics',
      //   path: paths.roosadmin.statistics.root,
      //   icon: ICONS.analytics,
      // },
      // {
      //   title: 'Settings',
      //   path: paths.roosadmin.settings.root,
      //   icon: ICONS.product,
      //   // children: [{ title: 'Services', path: paths.admin.product.root }],
      // },
    ],
  },
];
