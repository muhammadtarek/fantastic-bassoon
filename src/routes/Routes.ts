import Loadable from 'react-loadable';

import { Constants } from 'utils';
import { Loading } from 'components';

const Listings = Loadable({
  loader: () => import('./listings'),
  loading: Loading,
});

const Rent = Loadable({
  loader: () => import('./rent'),
  loading: Loading,
});

const routes = [
  {
    path: Constants.LISTINGS,
    component: Listings,
  },
  {
    path: Constants.RENT,
    component: Rent,
  },
];

export default routes;
