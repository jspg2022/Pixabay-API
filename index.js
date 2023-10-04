import { getSearchData } from './api.js';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const modalContent = modal.querySelector('.modalContent');
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
const imageContainer = document.querySelector('.imageContainer');
const favoriteContainer = document.querySelector('.favorites-container');
const moreImagesBtn = document.querySelector('.more-images-btn');
const endData = document.querySelector('.endData');
const favoriteBtn = document.querySelector('.favoriteBtn');

const favoritesArr = [];
const perPage = 20;
let currentPage;
let searchInputVal;
// let calculateTotalPages; // need to add for more images function-To prevent an unnecessary request?? // by divide yotal with perpage

const handleSearchClick = async () => {
  imageContainer.innerHTML = '';
  searchInputVal = searchInput.value;
  currentPage = 1;

  if (searchInputVal.length > 0) {
    const data = await getSearchData(searchInputVal, currentPage, perPage);
    if (data?.length > 0) {
      displayCards(data, imageContainer);
      moreImagesBtn.classList.remove('hidden');
    }
  } else {
    imageContainer.innerHTML = 'No search field entered, Search again';
  }
};

const displayCards = (data, container) => {
  data.forEach((hit) => {
    const card = createImageCard(hit);
    container.appendChild(card);
  });
};

const creatImageElement = (imageData) => {
  const image = document.createElement('img');
  image.classList.add('image');
  image.src = imageData.webformatURL;
  image.alt = imageData.tags;

  return image;
};

const createImageCard = (imageData) => {
  const card = document.createElement('div');
  const divIcon = document.createElement('div');
  card.classList.add('card');

  const image = creatImageElement(imageData);
  const favoriteIcon = createFavoriteIcon(imageData);

  card.appendChild(image);
  card.appendChild(divIcon);
  divIcon.appendChild(favoriteIcon);

  card.setAttribute('data-id', imageData.id);

  image.onclick = () => {
    displayModal(imageData);
  };

  favoriteIcon.onclick = () => {
    handleFavoriteIcon(imageData, favoriteIcon);
  };
  return card;
};

const createFavoriteIcon = (imageData) => {
  const index = favoritesArr.findIndex((img) => img.id === imageData.id);

  const favoriteIcon = document.createElement('p');
  index === -1
    ? (favoriteIcon.innerHTML = '🤍')
    : (favoriteIcon.innerHTML = '🖤');

  favoriteIcon.classList.add('favoriteIconI');
  return favoriteIcon;
};

const handleFavoriteIcon = (imageData, favoriteIcon) => {
  console.log(1);
  const index = favoritesArr.findIndex((img) => img.id === imageData.id);
  if (index === -1) {
    favoritesArr.push(imageData);
  } else {
    favoritesArr.splice(index, 1);
  }

  //
  //
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

const displayModal = (imageData) => {
  modalContent.innerHTML = `
    <strong>Tags:</strong> ${imageData.tags}<br>
    <strong>Type:</strong> ${imageData.type}<br>
    <strong>Views:</strong> ${imageData.views}<br>
    <img src="${imageData.webformatURL}" alt="${imageData.tags}" style="max-width: 100px;">
  `;

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
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

const handleFavoritesBtn = () => {
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

searchBtn.addEventListener('click', handleSearchClick);
closeModal.addEventListener('click', handleCloseModal);
overlay.addEventListener('click', handleCloseModal);
moreImagesBtn.addEventListener('click', handleMoreImages);
favoriteBtn.addEventListener('click', handleFavoritesBtn);
