export const getBaseEndpoint = base =>
  `${process.env.REACT_APP_WEATHER_API}/v1/${base}.json?key=${process.env.REACT_APP_API_KEY}`;
