const processData = (current, { forecastday }) => {
  return {
    condition: current.condition.text,
    icon: current.condition.icon,
    forecast: forecastday.map(({ date, day, hour }) => {
      const data = {
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
    })
  }
};

const fetchData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e72994fb87454c6b9ca122701231211&q=${city}&days=4`
  );

  const { current, forecast } = await response.json();

  console.log(current)

  return processData(current, forecast);
}

console.log(fetchData('pretoria'))

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.querySelector('input[type=search]').value.toLowerCase();
  const data = await fetchData(query);
  console.log(data);
});
