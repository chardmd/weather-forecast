import styled from 'styled-components/macro';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Forecast from './components/Forecast';
import Current from './components/Current';
import {
  selectLocationName,
  selectForecasts,
  selectLoading,
  selectError,
  selectCurrent,
} from './slice/selectors';
import Loader from '../../../../common/Loader';
import { APIErrorType } from './slice/types';
import { useWeatherForecastSlice } from './slice';

const forecastErrorText = error => {
  switch (error) {
    case APIErrorType.API_KEY_INVALID:
      return 'Invalid API key';
    case APIErrorType.EMPTY_FIELD:
      return 'Start typing a city...';
    case APIErrorType.NO_RESULT_FOUND:
      return 'No result found';
    case APIErrorType.RATE_LIMIT:
      return 'Rate limit exceeded';
    default:
      return 'An error has occurred!';
  }
};

const WeatherForecast = () => {
  const { actions } = useWeatherForecastSlice();

  const locationName = useSelector(selectLocationName);
  const forecasts = useSelector(selectForecasts);
  const current = useSelector(selectCurrent);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (locationName && locationName.trim().length > 0) {
      dispatch(actions.loadForecasts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationName]);

  return (
    <Wrapper>
      {isLoading && <Loader small />}
      {forecasts?.length > 0 ? (
        <>
          <Current
            text={current.condition.text}
            icon={current.condition.icon}
            temp={current.temp_c}
            wind={current.wind_kph}
            humidity={current.humidity}
          />
          <List>
            {forecasts.map(forecast => (
              <Forecast
                key={forecast.date}
                date={forecast.date}
                text={forecast.day.condition.text}
                icon={forecast.day.condition.icon}
                avgTemp={forecast.day.avgtemp_c}
                maxTemp={forecast.day.maxtemp_c}
                minTemp={forecast.day.mintemp_c}
              />
            ))}
          </List>
        </>
      ) : error ? (
        <ErrorText>{forecastErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
};

export default WeatherForecast;

//styles
const Button = styled.button`
  border: none;
  color: ${p => p.theme.primary};
  cursor: pointer;
  background: none;
  outline: none;
  padding: 0;
  margin: 0;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  &:active {
    opacity: 0.4;
  }
`;

const Wrapper = styled.div`
  ${Button} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

const List = styled.div`
  display: flex;
`;
