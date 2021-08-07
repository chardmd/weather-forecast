import { lazyLoad } from '../../../utils/loadable';
import Loader from '../../common/Loader';

export const NotFound = lazyLoad(
  () => import('./index'),
  module => module.NotFound,
  {
    fallback: <Loader />,
  },
);
