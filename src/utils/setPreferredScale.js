import { store } from 'dom-wizard';

const setPreferredScale = () => {
  const preferredScale = localStorage.getItem('scale');
  if (preferredScale) store.updateState('scale', preferredScale);
}

export default setPreferredScale;
