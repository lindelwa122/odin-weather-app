import { store } from 'dom-wizard';
import fetchData from './fetchData';

const updateStore = async () => {
  const city = store.getState('city');
  const { current, highlights, forecast } = await fetchData(city);
  store.updateState('current', current);
  store.updateState('highlights', highlights);
  store.updateState('forecast', forecast);
};

export default updateStore;
