import { store } from 'dom-wizard';
import dialog from '../components/dialog';
import loading from '../components/loading';
import renderUI from './renderUI';
import updateStore from './updateStore';

const updateCity = () => {
  store.updateState('updateCity', async (newValue) => {
    // show loading screen
    loading();

    store.updateState('city', newValue);
    try {
      await updateStore();
      renderUI();
    } catch (error) {
      dialog.showModal(error);
    }
  });
}

export default updateCity;
