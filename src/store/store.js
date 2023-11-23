import { domManager, store } from 'dom-wizard';
import navbar from '../components/navbar';
import currentWeather from '../components/currentWeather';
import highlights from '../components/highlights';
import forecast from '../components/forecast';
import otherCities from '../components/otherCities';

store.createStore({
  city: null,
  current: null,
  highlights: null,
  largeCities: ['Jakarta', 'Cape Town', 'London', 'Tokyo'],
  other: [],
  forecast: null,
});

// set data of other large cities
const fetchOtherCitiesData = async () => {
  const updateStore = (newData) => {
    const storedData = store.getState('other');
    storedData.push(newData);
    store.updateState('other', storedData);
  }

  const cities = store.getState('largeCities');
  for (const city of cities) {
    const { current } = await fetchData(city);
    updateStore(current);
  }
};

// set initial city
(async () => {
  // update store and render ui
  const USRUI = async () => {
    await updateStore();
    await fetchOtherCitiesData();
    renderUI();
  } 

  const errorHandler = async () => {
    console.warn('Geolocation is blocked or failed, so the city will be initially set to Durban');
    store.updateState('city', 'durban');
    USRUI();
  };

  const successHandler = async ({ coords }) => {
    store.updateState('city', `${coords.latitude},${coords.longitude}`);
    USRUI();
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
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
    date: new Date(data.current.last_updated),
    city: data.location.name,
    country: data.location.country,
  };

  const forecast = data.forecast.forecastday.map(({ date, day }) => ({
    icon: 'https:' + day.condition.icon,
    minTemp: day.mintemp_c,
    maxTemp: day.maxtemp_c,
    date: new Date(date),
  }));

  console.log(data.current)

  const highlights = [
    {
      title: 'Feels like',
      data: data.current.feelslike_c,
      symbol: '\u00B0C',
      icon: 'bi-thermometer-half',
    },
    {
      title: 'Humidity',
      data: data.current.humidity,
      symbol: '',
      icon: 'bi-droplet',
    },
    {
      title: 'UV index',
      data: data.current.uv,
      symbol: 'UV',
      icon: 'bi-sun',
    },
    {
      title: 'Wind (kph)',
      data: data.current.wind_kph,
      symbol: 'kph',
      icon: 'bi-wind',
    },
    {
      title: 'Wind direction',
      data: data.current.wind_dir,
      symbol: '',
      icon: 'bi-compass',
    },
    {
      title: 'Wind Degree',
      data: data.current.wind_degree,
      symbol: '\u00B0',
      icon: 'bi-tropical-storm',
    },
    {
      title: 'Precip (mm)',
      data: data.current.precip_mm,
      symbol: 'mm',
      icon: 'bi-moisture',
    },
    {
      title: 'Gust (kph)',
      data: data.current.gust_kph,
      symbol: 'kph',
      icon: 'bi-cloud-haze2',
    },
    {
      title: 'Visibility (km)',
      data: data.current.vis_km,
      symbol: 'km',
      icon: 'bi-eye',
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
  const currentData = store.getState('current');
  const todaysHighlights = store.getState('highlights');
  const forecastData = store.getState('forecast');
  const cities = store.getState('other');

  console.log('current data', currentData)
  console.log('cities', store.getState('other'));
  console.log('cities length', store.getState('other').length);

  const main = {
    tagName: 'main',
    children: [ 
      currentWeather(currentData),
      highlights(todaysHighlights),
      forecast(forecastData),
      otherCities(cities),
    ]
  };

  const root = {
    children: [navbar(currentData.country, currentData.city), main]
  };

  domManager.create(root);
}
