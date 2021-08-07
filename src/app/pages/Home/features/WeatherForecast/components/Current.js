import styled from 'styled-components/macro';

const Current = ({ text, icon, temp, wind, humidity }) => {
  return (
    <Wrapper>
      <Text>Current Weather</Text>
      <Text>{text}</Text>
      <img src={icon} alt="weather" />
      <div>Temp: {temp} °C</div>
      <div>Wind: {wind} KPH</div>
      <div>Humidity: {humidity} °C</div>
    </Wrapper>
  );
};

export default Current;

//styles
const Wrapper = styled.div`
  align-items: center;
  min-height: 2.75rem;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  color: ${p => p.theme.text};

  border: 1px solid ${p => p.theme.primary};
  margin: 3px;
  padding: 1rem;
`;

const Text = styled.div`
  flex: 1;
`;
