import { store } from 'dom-wizard';
import dialog from '../components/dialog';
import fetchOtherCitiesData from './fetchOtherCitiesData';
import renderUI from './renderUI';
import updateStore from './updateStore';

const updateScale = () => {
  store.updateState('updateScale', async (newScale) => {
    store.updateState('scale', newScale);
    localStorage.setItem('scale', newScale);
    try {
      await updateStore();
      await fetchOtherCitiesData();
      renderUI();
    } catch (error) {
      dialog.showModal(error);
    }
  });
}

export default updateScale;
