import styled from 'styled-components/macro';

const Forecast = ({ date, text, icon, avgTemp, maxTemp, minTemp }) => {
  return (
    <Wrapper>
      <Date>{date}</Date>
      <Text>{text}</Text>
      <img src={icon} alt="weather" />
      <div>Average: {avgTemp} °C</div>
      <div>Min: {minTemp} °C</div>
      <div>Max: {maxTemp} °C</div>
    </Wrapper>
  );
};

export default Forecast;

//styles
const Wrapper = styled.div`
  align-items: center;
  padding: 1.5rem;
  min-height: 2.75rem;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
  border: 1px solid ${p => p.theme.primary};
  margin: 3px;
`;

const Date = styled.div`
  flex: 1;
  padding: 0.625rem 0;
`;

const Text = styled.div`
  flex: 1;
`;
