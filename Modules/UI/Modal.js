const Modal = (title, content) => {
  return `
    <div class="modal-container">
    <div id="modal-header">
    <header >
    <button class="close-modal-button">&times;</button>
    <h1 class="modal-title">${title}</h1>
  </header>
  </div>
      <div class="modal">
        <div class="modal-content grid-container">${content}</div>
      </div>
    </div>
  `;
};

export default Modal;
