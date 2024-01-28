const Modal = (title, content) => {
  return `
    <div class="modal-container">
      <div class="modal ">
        <button class="close-modal-button">&times;</button>
        <div class="modal-content grid-container">
          <h1 class="modal-title">${title}</h1>
          ${content}
        </div>
      </div>
    </div>
  `;
};

export default Modal;
