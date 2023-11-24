import { domManager, store } from 'dom-wizard';
import navbar from '../components/navbar';
import currentWeather from '../components/currentWeather';
import highlights from '../components/highlights';
import forecast from '../components/forecast';
import otherCities from '../components/otherCities';
import dialog from '../components/dialog';
import loading from '../components/loading';

loading();

store.createStore({
  city: null,
  updateCity: async (newValue) => {
    // show loading screen
    loading();

    store.updateState('city', newValue);
    try {
      await updateStore();
      renderUI();
    } catch (error) {
      dialog.showModal(error);
    }
  },
  current: null,
  highlights: null,
  largeCities: ['Jakarta', 'Cape Town', 'London', 'Tokyo'],
  other: [],
  forecast: null,
  scale: 'celsius',
  updateScale: async (newScale) => {
    store.updateState('scale', newScale);
    localStorage.setItem('scale', newScale);
    try {
      await updateStore();
      await fetchOtherCitiesData();
      renderUI();
    } catch (error) {
      dialog.showModal(error);
    }
  },
});

// set scale based on the user preferences
const preferredScale = localStorage.getItem('scale');
if (preferredScale) store.updateState('scale', preferredScale);

// set data of other large cities
const fetchOtherCitiesData = async () => {
  store.updateState('other', []);
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

const processData = (data) => {
  const scale = store.getState('scale');

  const current = {
    temp: scale === 'celsius' ? data.current.temp_c : data.current.temp_f,
    icon: 'https:' + data.current.condition.icon,
    condition: data.current.condition.text,
    date: new Date(data.current.last_updated),
    city: data.location.name,
    country: data.location.country,
  };

  const forecast = data.forecast.forecastday.map(({ date, day }) => ({
    icon: 'https:' + day.condition.icon,
    minTemp: scale === 'celsius' ? day.mintemp_c : day.mintemp_f,
    maxTemp: scale === 'celsius' ? day.maxtemp_c : day.maxtemp_f,
    date: new Date(date),
  }));


  const highlights = [
    {
      title: 'Feels like',
      data: scale === 'celsius' ? data.current.feelslike_c : data.current.feelslike_f,
      symbol: `\u00B0${scale === 'celsius' ? 'C' : 'F'}`,
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
  const scale = store.getState('scale')

  const main = {
    tagName: 'main',
    children: [ 
      currentWeather(currentData, scale),
      highlights(todaysHighlights),
      forecast(forecastData),
      otherCities(cities, scale),
      dialog.content(),
    ]
  };

  const root = {
    children: [navbar(currentData.country, currentData.city), main]
  };

  domManager.create(root);
}

// set initial city
(async () => {
  // update store and render ui
  const USRUI = async () => {
    console.log('Hey, mate')
    try {
      await updateStore();
      await fetchOtherCitiesData();
      renderUI();
    } catch (error) {
      throw new Error(error);
    }
  } 

  const errorHandler = () => {
    console.log('Or maybe here')
    console.warn('Geolocation is blocked or failed, so the city will be initially set to Durban');
    store.updateState('city', 'durban');
    USRUI();
  };

  const successHandler = ({ coords }) => {
    console.log('Is the problem here')
    store.updateState('city', `${coords.latitude},${coords.longitude}`);
    USRUI();
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  } else {
    errorHandler();
  }
})();
