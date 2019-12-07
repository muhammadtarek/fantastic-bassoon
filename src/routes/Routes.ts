import Loadable from 'react-loadable';

import { Constants } from 'utils';
import { Loading } from 'components';

const Landing = Loadable({
  loader: () => import('./landing'),
  loading: Loading,
});

const Listings = Loadable({
  loader: () => import('./listings'),
  loading: Loading,
});

const routes = [
  {
    path: Constants.LISTINGS,
    component: Listings,
  },
];

export default routes;
