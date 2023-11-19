const processData = ({ forecastday }) => {
  return forecastday.map(({ date, day, hour }) => {
    const data = {
      condition: day.condition.text,
      avgTempInC: day.avgtemp_c,
      avgTempInF: day.avgtemp_f,
      uv: day.uv,
      maxWind: day.maxwind_kph,
      hour: [],
    };

    hour.forEach((h) => {
      data.hour.push({
        tempInC: h.temp_c,
        tempInF: h.temp_f,
      });
    });

    return { data, date };
  });
};

const fetchData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e72994fb87454c6b9ca122701231211&q=${city}&days=4`
  );

  const { forecast } = await response.json();
  return processData(forecast);
}

