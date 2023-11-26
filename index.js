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
    }),
  };
};

console.log(fetchData('pretoria'));

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document
    .querySelector('input[type=search]')
    .value.toLowerCase();
  const data = await fetchData(query);
  console.log(data);
});
