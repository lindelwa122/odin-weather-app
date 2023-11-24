import { store } from 'dom-wizard';
import dialog from '../components/dialog';
import loading from '../components/loading';

store.createStore({
  city: null,
  current: null,
  forecast: null,
  highlights: null,
  largeCities: ['Jakarta', 'Cape Town', 'London', 'Tokyo'],
  other: [],
  scale: 'celsius',

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
