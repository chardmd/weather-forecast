import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { PageContainer } from '../../common/PageContainer';
import Footer from '../../common/Footer';
import CitySearch from './features/CitySearch';
import WeatherForecast from './features/WeatherForecast';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Weather Forecast App</title>
        <meta name="description" content="Weather Forecast App" />
      </Helmet>
      <Container>
        <PageContainer>
          <Title as="h2">Weather Forecast App</Title>
          <Wrapper>
            <span>
              Easily search for the city's current and forecasted weather
            </span>
            <Emoji>⛅</Emoji>
          </Wrapper>
          <Feature>
            <Content>
              <CitySearch />
            </Content>
          </Feature>
          <Feature>
            <WeatherForecast />
          </Feature>
        </PageContainer>
      </Container>
      <Footer>Test</Footer>
    </>
  );
};

//styles
const Emoji = styled.span`
  margin-left: 1rem;
`;

const Feature = styled.li`
  display: flex;
  margin: 1rem 2rem;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color: ${p => p.theme.text};
  margin: 1rem 2rem;
  font-size: 32px;
  font-weight: bold;
`;

const Wrapper = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 1rem 2rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};

  strong {
    color: ${p => p.theme.text};
  }
`;

const Container = styled.div`
  margin-bottom: 2rem;
`;
