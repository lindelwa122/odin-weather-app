import processData from './processData';

const fetchData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e72994fb87454c6b9ca122701231211&q=${city}&days=4`
  );
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return processData(data);
};

export default fetchData;
