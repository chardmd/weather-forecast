import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { RouteLink } from '../../common/RouteLink';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>404 - Page Not Found</Title>
        <P>Nothing to see here</P>
        <RouteLink to={process.env.PUBLIC_URL + '/'}>
          Return to Main Page
        </RouteLink>
      </Wrapper>
    </>
  );
};

//styles
const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${p => p.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0.625rem 0 1.5rem 0;
`;
