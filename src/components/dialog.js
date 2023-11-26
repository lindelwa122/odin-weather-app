import { domManager } from 'dom-wizard';

const dialog = () => {
  const showModal = (message) => {
    const modal = document.querySelector('dialog');
    modal.showModal();

    message &&
      domManager.update({
        selector: 'dialog > .content',
        action: 'update',
        innerHTML: message,
      });
  };

  const closeModal = () => {
    const modal = document.querySelector('dialog');
    modal.close();
  };

  const content = () => ({
    tagName: 'dialog',
    children: [
      {
        options: {
          innerHTML: '<i class="bi bi-x-lg"></i>',
          onclick: closeModal,
          className: 'close-modal',
        },
      },
      {
        options: { className: 'content' },
      },
    ],
  });

  return { content, closeModal, showModal };
};

export default dialog();
