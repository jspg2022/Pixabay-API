import { getSearchData } from './api.js';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const modalContent = modal.querySelector('.modalContent');
const searchInput = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
const imageContainer = document.querySelector('.imageContainer');
const moreImagesBtn = document.querySelector('.more-images-btn');
const endData = document.querySelector('.endData');

let currentPage;
const perPage = 20;
let searchInputVal;
// let calculateTotalPages; // add for more images function-To prevent an unnecessary request

const handleSearchClick = async () => {
  imageContainer.innerHTML = '';
  searchInputVal = searchInput.value;
  currentPage = 1;

  if (searchInputVal.length > 0) {
    const data = await getSearchData(searchInputVal, currentPage, perPage);
    if (data?.length > 0) {
      displayCards(data);
      moreImagesBtn.classList.remove('hidden');
    }
  } else {
    console.log(searchInputVal.length);
    imageContainer.innerHTML = 'No search field entered, Search again';
  }
};

const displayCards = (data) => {
  data.forEach((hit) => {
    const card = createImageCard(hit);
    imageContainer.appendChild(card);
  });
};

const createImageCard = (imageData) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.classList.add('image');
  image.src = imageData.webformatURL;
  image.alt = imageData.tags;

  card.appendChild(image);

  card.onclick = () => {
    displayModal(imageData);
  };
  return card;
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
  currentPage = currentPage + 20;

  try {
    const data = await getSearchData(searchInputVal, currentPage, perPage);
    if (data?.length > 0) {
      displayCards(data);
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

searchBtn.addEventListener('click', handleSearchClick);
closeModal.addEventListener('click', handleCloseModal);
overlay.addEventListener('click', handleCloseModal);
moreImagesBtn.addEventListener('click', handleMoreImages);
