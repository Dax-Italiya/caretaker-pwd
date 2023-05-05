import { ROUTES } from 'utils/Route';
import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'simple-icon-chart',
    label: 'menu.dashboard',
    to: `${adminRoot}${ROUTES.DASHBOARD}`,
  },

  {
    id: 'societies',
    icon: 'simple-icon-home',
    label: 'menu.societies',
    to: `${adminRoot}${ROUTES.SOCIETIES}`,
  },

  {
    id: 'service',
    icon: 'simple-icon-layers',
    label: 'menu.service',
    to: `${adminRoot}${ROUTES.SERVICE}`,
  },
  {
    id: 'user',
    icon: 'iconsminds-user',
    label: 'menu.users',
    to: `${adminRoot}${ROUTES.USER}`,
  },
  {
    id: 'gigs',
    icon: 'iconsminds-male-female',
    label: 'menu.gigs',
    to: `${adminRoot}${ROUTES.GIGS}`,
  },
  {
    id: 'user request',
    icon: 'simple-icon-notebook',
    label: 'menu.user request',
    to: `${adminRoot}${ROUTES.USER_REQUEST}`,
  },

  {
    id: 'customize-field',
    icon: 'iconsminds-equalizer',
    label: 'menu.customize-field',
    to: `${adminRoot}${ROUTES.CUSTOMIZE_FIELD}`,
  },
  {
    id: 'attendance',
    icon: 'simple-icon-calendar',
    label: 'menu.attendance',
    to: `${adminRoot}${ROUTES.ATTENDANCE}`,
  },

  {
    id: 'invoice page',
    icon: 'iconsminds-letter-open',
    label: 'menu.invoice page',
    to: `${adminRoot}${ROUTES.INVOICE_PAGE}`,
  },
  {
    id: 'feedback',
    icon: 'iconsminds-support',
    label: 'menu.feedback',
    to: `${adminRoot}${ROUTES.FEEDBACK}`,
  },
  {
    id: 'role & access',
    icon: 'iconsminds-network',
    label: 'menu.role & access',
    to: `${adminRoot}${ROUTES.ROLE_AND_ACCESS}`,
  },
  {
    id: 'setting',
    icon: 'simple-icon-settings',
    label: 'menu.setting',
    to: `${adminRoot}${ROUTES.SETTING}`,
  },
];
export default data;
