import { store } from 'dom-wizard';
import fetchData from './fetchData';

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

export default fetchOtherCitiesData;