import { store } from 'dom-wizard';

store.createStore({
  initialCity: null,
  current: null,
  highlights: null,
  largeCities: null,
  other: null,
  forecast: null,
});

// set initial city
(() => {
  const errorHandler = () => {
    console.warn('Geolocation is blocked so the city will be initially set to Durban');
    store.updateState('initialCity', 'durban');
  };

  if ('geolocation' in navigator) {
    try {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        store.updateState('initialCity', `${coords.latitude},${coords.longitude}`);
      });
    } catch (error) {
      errorHandler();
      console.error(error);
    }
  } else {
    errorHandler();
  }
})();

const fetchData = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e72994fb87454c6b9ca122701231211&q=${city}&days=4`
  );
  const data = await response.json();
  return processData(data);
};

const processData = (data) => {
  const current = {
    temp: data.current.temp_c,
    icon: 'https:' + data.current.condition.icon,
    condition: data.current.condition.text,
    data: new Date(data.current.last_updated),
  };

  const forecast = data.forecast.forecastday.map(({ date, day }) => ({
    icon: day.condition.icon,
    minTemp: day.mintemp_c,
    maxTemp: day.maxtemp_c,
    date: new Date(date),
  }));

  const highlights = [
    {
      title: 'Feels like',
      data: data.current.feeslike_c,
    },
    {
      title: 'Humidity',
      data: data.current.humidity,
    },
    {
      title: 'UV index',
      data: data.current.uv,
    },
    {
      title: 'Wind (kph)',
      data: data.current.wind_kph
    },
    {
      title: 'Wind direction',
      data: data.current.wind_dir
    },
    {
      title: 'Wind Degree',
      data: data.current.wind_degree,
    },
    {
      title: 'Precip (mm)',
      data: data.current.precip_mm,
    },
    {
      title: 'Gust (kph)',
      data: data.current.gust_kph,
    },
    {
      title: 'Vis (km)',
      data: data.current.vis_km,
    }
  ];

  return { current, highlights, forecast };
}

const updateStore = async () => {
  const city = store.getState('city');
  const { current, highlights, forecast } = await fetchData(city);
  store.updateState('current', current);
  store.updateState('highlights', highlights);
  store.updateState('forecast', forecast);
};

const renderUI = () => {
  // todo
}