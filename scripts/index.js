import * as Selectors from './Selectors';
import * as Handlers from './Handlers';
import createEventListeners from './EventListeners';

import { getSearchData } from './API.js';

const createTags = () => {
  predefinedTags.map((tag) => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;

    tagSelect.appendChild(option);
  });
};

createTags();

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
    handleFavoriteIconClick(imageData);
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
