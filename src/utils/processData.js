import { store } from 'dom-wizard';

const processData = (data) => {
  const scale = store.getState("scale");

  const current = {
    temp: scale === "celsius" ? data.current.temp_c : data.current.temp_f,
    icon: "https:" + data.current.condition.icon,
    condition: data.current.condition.text,
    date: new Date(data.current.last_updated),
    city: data.location.name,
    country: data.location.country,
  };

  const forecast = data.forecast.forecastday.map(({ date, day }) => ({
    icon: "https:" + day.condition.icon,
    minTemp: scale === "celsius" ? day.mintemp_c : day.mintemp_f,
    maxTemp: scale === "celsius" ? day.maxtemp_c : day.maxtemp_f,
    date: new Date(date),
  }));

  const highlights = [
    {
      title: "Feels like",
      data:
        scale === "celsius"
          ? data.current.feelslike_c
          : data.current.feelslike_f,
      symbol: `\u00B0${scale === "celsius" ? "C" : "F"}`,
      icon: "bi-thermometer-half",
    },
    {
      title: "Humidity",
      data: data.current.humidity,
      symbol: "",
      icon: "bi-droplet",
    },
    {
      title: "UV index",
      data: data.current.uv,
      symbol: "UV",
      icon: "bi-sun",
    },
    {
      title: "Wind (kph)",
      data: data.current.wind_kph,
      symbol: "kph",
      icon: "bi-wind",
    },
    {
      title: "Wind direction",
      data: data.current.wind_dir,
      symbol: "",
      icon: "bi-compass",
    },
    {
      title: "Wind Degree",
      data: data.current.wind_degree,
      symbol: "\u00B0",
      icon: "bi-tropical-storm",
    },
    {
      title: "Precip (mm)",
      data: data.current.precip_mm,
      symbol: "mm",
      icon: "bi-moisture",
    },
    {
      title: "Gust (kph)",
      data: data.current.gust_kph,
      symbol: "kph",
      icon: "bi-cloud-haze2",
    },
    {
      title: "Visibility (km)",
      data: data.current.vis_km,
      symbol: "km",
      icon: "bi-eye",
    },
  ];

  return { current, highlights, forecast };
};

export default processData;
