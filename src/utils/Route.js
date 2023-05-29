import Dashboard from 'views/app/dashboard';

export const ROUTES = {
  FORGOT_PASSWORD: '/forgot-password',
  UPDATE_PASSWORD: '/forgot-password/:updatePasswordId',
  REGISTER: '/register',

  DASHBOARD: '/dashboard',
  USER: '/users',
  USER_DETAILS: '/users/:userId',
  SOCIETIES: '/societies',
  SOCIETIES_DETAILS: '/societies/:id',
  SERVICE: '/service',
  SERVICE_VARITY: '/service/:serviceId',
  USER_REQUEST: '/user-request',
  GIGS: '/gigs',
  GIGS_DETAILS: '/gigs/:gigsId',
  CUSTOMIZE_FIELD: '/customize-field',
  ATTENDANCE: '/attendance',
  INVOICE_PAGE: '/invoice',
  FEEDBACK: '/feedback',
  ROLE_AND_ACCESS: '/role-and-access',
  ROLE_AND_ACCESS_FORM: '/role-and-access/:id',
  SETTING: '/setting',
};
const ALL_ROUTES = [
  { path: '/', component: Dashboard, exact: true },
  {
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    exact: true,
  },
];

export default ALL_ROUTES;
