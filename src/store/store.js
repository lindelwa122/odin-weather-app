import { store } from 'dom-wizard';

store.createStore({
  city: null,
  current: null,
  forecast: null,
  highlights: null,
  largeCities: ['Jakarta', 'Cape Town', 'London', 'Tokyo'],
  other: [],
  scale: 'celsius',
  updateCity: null,
  updateScale: null,
});
