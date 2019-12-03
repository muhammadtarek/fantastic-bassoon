import Loadable from 'react-loadable';

import { Constants } from 'utils';
import { Loading } from 'components';

const Landing = Loadable({
  loader: () => import('./landing'),
  loading: Loading,
});

const routes = [
  {
    path: ['/signup', '/login'],
    component: Landing,
  },
];

export default routes;
