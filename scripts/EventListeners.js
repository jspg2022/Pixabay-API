const createEventListeners = () => {
  searchBtn.addEventListener('click', handleSearchClick);

  moreImagesBtn.addEventListener('click', handleMoreImages);

  favoriteBtn.addEventListener('click', handleFavoritesButtonClicked);

  closeModal.addEventListener('click', handleCloseModal);

  overlay.addEventListener('click', handleCloseModal);

  tagSelect.addEventListener('change', () => {
    console.log(selectedTag);
    selectedTag = tagSelect.value; // Update the selectedTag variable
    console.log(selectedTag);
  });
};

export default createEventListeners;
