import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCity,
  selectLocations,
  selectLoading,
  selectError,
} from './slice/selectors';
import { Loader } from '../../../../common/Loader';
import { APIErrorType } from './slice/types';
import { useCitySearchSlice } from './slice';
import Row from './components/Row';
import Search from './components/Search';

const locationErrorText = error => {
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

const CitySearch = () => {
  const { actions } = useCitySearchSlice();

  const city = useSelector(selectCity);
  const locations = useSelector(selectLocations);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const onChangeCity = evt => {
    dispatch(actions.changeCity(evt.currentTarget.value));
    dispatch(actions.loadLocations());
  };

  useEffect(() => {
    if (city && city.trim().length > 0) {
      dispatch(actions.loadLocations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitForm = evt => {
    /* istanbul ignore next  */
    if (evt !== undefined && evt.preventDefault) {
      evt.preventDefault();
    }
  };

  return (
    <Wrapper>
      <Search
        onSubmit={onSubmitForm}
        onChange={onChangeCity}
        value={city}
        isLoading={isLoading}
        Loader={Loader}
      />
      {locations?.length > 0 ? (
        <List>
          {locations.map(location => (
            <Row key={location.id} name={location.name} />
          ))}
        </List>
      ) : error ? (
        <ErrorText>{locationErrorText(error)}</ErrorText>
      ) : null}
    </Wrapper>
  );
};

export default CitySearch;

//styles
export const Button = styled.button`
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

export const Wrapper = styled.div`
  ${Button} {
    margin: 16px 0;
    font-size: 0.875rem;
  }
`;

export const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

export const List = styled.div``;
