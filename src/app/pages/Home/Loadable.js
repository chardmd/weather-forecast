/**
 * Asynchronously loads the component for Home
 */
import { lazyLoad } from '../../../utils/loadable';
import { Loader } from '../../common/Loader';
import styled from 'styled-components/macro';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Home = lazyLoad(
  () => import('./index'),
  module => module.Home,
  {
    fallback: (
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    ),
  },
);
