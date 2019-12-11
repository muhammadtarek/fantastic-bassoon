import Loadable from 'react-loadable';

import { Constants } from 'utils';
import { Loading } from 'components';

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
