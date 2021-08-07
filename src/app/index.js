import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Loadable';
import { NotFound } from './pages/NotFound/Loadable';
import { GlobalStyle } from '../styles/global-styles';

export const App = () => {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Weather Forecast App"
        defaultTitle="Weather Forecast App"
      >
        <meta name="description" content="A Weather Forecast App" />
      </Helmet>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
        <Route component={NotFound} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};
