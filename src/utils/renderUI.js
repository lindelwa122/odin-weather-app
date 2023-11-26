import { domManager, store } from 'dom-wizard';
import currentWeather from '../components/currentWeather';
import dialog from '../components/dialog';
import forecast from '../components/forecast';
import highlights from '../components/highlights';
import navbar from '../components/navbar';
import otherCities from '../components/otherCities';

const renderUI = () => {
  const currentData = store.getState('current');
  const todaysHighlights = store.getState('highlights');
  const forecastData = store.getState('forecast');
  const cities = store.getState('other');
  const scale = store.getState('scale');

  const main = {
    tagName: 'main',
    children: [
      currentWeather(currentData, scale),
      highlights(todaysHighlights),
      forecast(forecastData),
      otherCities(cities, scale),
      dialog.content(),
    ],
  };

  const root = {
    children: [navbar(currentData.country, currentData.city), main],
  };

  domManager.create(root);
};

export default renderUI;
