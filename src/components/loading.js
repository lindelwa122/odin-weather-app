import dialog from './dialog';
import { domManager } from 'dom-wizard';

const loading = () => {
  const d = document.querySelector('dialog');
  !d && domManager.create(dialog.content());

  dialog.showModal(`
    <div class="loading-container">
      <div class="loading"></div>
      <div class="loading"></div>
      <div class="loading"></div>
    </div>
  `);
};

export default loading;