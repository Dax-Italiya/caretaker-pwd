import Dashboard from 'views/app/dashboard';
import Feedback from 'views/app/feedback';
import InvoicePage from 'views/app/invoice-page';
import Gigs from 'views/app/gigs';
import RolenAccess from 'views/app/role-and-access';
import Service from 'views/app/service';
import Societies from 'views/app/societies';
import User from 'views/app/user';
import UserRequest from 'views/app/user request';
import CustomizeField from 'views/app/customize field';
import Attendance from 'views/app/attendance';
import Setting from 'views/app/setting';
import UserDetail from 'views/app/user/user-detail';
import GigsDetail from 'views/app/gigs/gigs-detail';
import ServiceVarity from 'views/app/service/service-varity';
import SocietiesInfo from 'views/app/societies/societiesInfo';
import RoleForm from 'views/app/role-and-access/role-from';

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
  {
    path: ROUTES.USER,
    component: User,
    exact: true,
  },
  {
    path: ROUTES.USER_DETAILS,
    component: UserDetail,
    exact: true,
  },
  {
    path: ROUTES.SOCIETIES,
    component: Societies,
    exact: true,
  },
  {
    path: ROUTES.SOCIETIES_DETAILS,
    component: SocietiesInfo,
    exact: true,
  },

  {
    path: ROUTES.SERVICE,
    component: Service,
    exact: true,
  },
  {
    path: ROUTES.SERVICE_VARITY,
    component: ServiceVarity,
    exact: true,
  },
  {
    path: ROUTES.USER_REQUEST,
    component: UserRequest,
    exact: true,
  },

  {
    path: ROUTES.GIGS,
    component: Gigs,
    exact: true,
  },
  {
    path: ROUTES.GIGS_DETAILS,
    component: GigsDetail,
    exact: true,
  },
  {
    path: ROUTES.CUSTOMIZE_FIELD,
    component: CustomizeField,
    exact: true,
  },
  {
    path: ROUTES.ATTENDANCE,
    component: Attendance,
    exact: true,
  },
  {
    path: ROUTES.INVOICE_PAGE,
    component: InvoicePage,
    exact: true,
  },
  {
    path: ROUTES.FEEDBACK,
    component: Feedback,
    exact: true,
  },
  {
    path: ROUTES.ROLE_AND_ACCESS,
    component: RolenAccess,
    exact: true,
  },
  {
    path: ROUTES.ROLE_AND_ACCESS_FORM,
    component: RoleForm,
    exact: true,
  },
  {
    path: ROUTES.SETTING,
    component: Setting,
    exact: true,
  },
];

export default ALL_ROUTES;
