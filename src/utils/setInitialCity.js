import { store } from 'dom-wizard';
import updateStore from './updateStore';
import fetchOtherCitiesData from './fetchOtherCitiesData';

// set initial city
const setInitialCity = async () => {
  // update store and render ui
  const USRUI = async () => {
    try {
      await updateStore();
      await fetchOtherCitiesData();
      renderUI();
    } catch (error) {
      throw new Error(error);
    }
  } 

  const errorHandler = () => {
    console.warn('Geolocation is blocked or failed, so the city will be initially set to Durban');
    store.updateState('city', 'durban');
    USRUI();
  };

  const successHandler = ({ coords }) => {
    store.updateState('city', `${coords.latitude},${coords.longitude}`);
    USRUI();
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  } else {
    errorHandler();
  }
};

export default setInitialCity;
