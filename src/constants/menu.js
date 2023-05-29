import { ROUTES } from 'utils/Route';
import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'simple-icon-chart',
    label: 'menu.dashboard',
    to: `${adminRoot}${ROUTES.DASHBOARD}`,
  },
];
export default data;
