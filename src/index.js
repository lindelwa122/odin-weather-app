import 'normalize.css';
import './css/style.css';
import loading from './components/loading';
import setPreferredScale from './utils/setPreferredScale';
import setInitialCity from './utils/setInitialCity';
import updateCity from './utils/updateCity';
import updateScale from './utils/updateScale';

// show loading screen before fetching any data
loading();

// set store initial values
(() => {
  updateScale();
  updateCity();
  setPreferredScale();
  setInitialCity();
})();
