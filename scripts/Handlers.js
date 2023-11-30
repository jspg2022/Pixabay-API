const handleSearchClick = async () => {
    imageContainer.innerHTML = '';
    searchInputVal = searchInput.value;
    currentPage = 1;

    if (searchInputVal.length > 0) {
        const data = await getSearchData(
            searchInputVal,
            currentPage,
            perPage,
            selectedTag
        );
        if (data?.length > 0) {
            displayCards(data, imageContainer);
            moreImagesBtn.classList.remove('hidden');
        }
    } else {
        imageContainer.innerHTML = 'No search field entered, Search again';
    }
};

const handleFavoriteIconClick = (imageData) => {
    // need to add "no photos to add when i remove image from icon"
    console.log(1);
    const index = favoritesArr.findIndex((img) => img.id === imageData.id);
    if (index === -1) {
        favoritesArr.push(imageData);
    } else {
        favoritesArr.splice(index, 1);
    }

    // Update heart icons in both containers
    const imageCards = document.querySelectorAll(`[data-id="${imageData.id}"]`);
    imageCards.forEach((imageCard) => {
        const imageFavoriteIcon = imageCard.querySelector('.favoriteIconI');
        if (imageFavoriteIcon) {
        imageFavoriteIcon.innerHTML = index === -1 ? '🖤' : '🤍';
        }
    });

    // Clear and re-render the favoriteContainer
    favoriteContainer.innerHTML = '';
    displayCards(favoritesArr, favoriteContainer);
};

const handleCloseModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const handleMoreImages = async () => {
    currentPage++;

    try {
      const data = await getSearchData(searchInputVal, currentPage, perPage);
      if (data?.length > 0) {
        displayCards(data, imageContainer);
      } else {
        endData.innerHTML = 'No more images found for this search.';
        moreImagesBtn.classList.add('hidden');
      }
    } catch {
      // check if needed and how its work with 400 err(When there is a greater number of pages in the request than the api data )
      console.error('Error fetching more images:', error);
      endData.innerHTML = 'An error occurred while fetching more images.';
    }
};

const handleFavoritesButtonClicked = () => {
    const isFavoriteContainerVisible =
      favoriteContainer.style.display === 'block';

    if (isFavoriteContainerVisible) {
      favoriteContainer.style.display = 'none'; // Hide the favorites container
    } else {
      if (favoritesArr.length > 0) {
        favoriteContainer.innerHTML = ''; // Clear the previous favorites
        displayCards(favoritesArr, favoriteContainer);
      } else {
        favoriteContainer.innerHTML = 'No favorite photos selected';
      }

      favoriteContainer.style.display = 'block'; // Show the favorites container
    }
};

export {
  handleCloseModal,
  handleFavoriteIconClick,
  handleFavoritesButtonClicked,
  handleMoreImages,
  handleSearchClick
};
