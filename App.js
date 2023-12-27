// Business logic modules
import Constants from './Modules/Constants.js';
import API from './Modules/API/API.js';

// UI modules
import Header from './Modules/UI/Header.js';
import SearchBar from './Modules/UI/SearchBar.js';
import PhotosSection from './Modules/UI/PhotosSection.js';
import PhotoCard from './Modules/UI/PhotoCard.js';
import FavoriteSection from './Modules/UI/FavoriteSection.js';
import Modal from './Modules/UI/Modal.js';

/*
  Homework

  1. Open each photo card from search results in a modal with the photo's information.
  2. Tags bar feature - when clicking on a tag, you can display new search results based on that tag alone.
  3. Optional - Desing the photo cards using CSS

  Websites to learn from:

  1. https://w3schools.org
  2. https://flatuicolors.com
*/


const App = {
  state: {
    itemsPerPage: 20,
    currentPage: 1,
    query: '',
    selectedTag: '',
    searchResults: [],
    favorites: [],
    isShowingLoadMoreButton: false,
    isInputFiledError: false,
  },

  selectors: {
    app: () => {
      return document.getElementById('app');
    },
    searchBar: () => {
      return document.getElementById('search-bar-section');
    },
    photosSection: () => {
      return document.getElementById('photos-section');
    },
    loadMoreContainer: () => {
      return document.getElementById('load-more-container');
    },
  },

  // Initializing the app

  template() {
    return `
      ${Header()}
      ${SearchBar({ tags: Constants.tags })}
      ${PhotosSection()}
      ${FavoriteSection()}
    `;
  },

  intialize() {
    this.selectors.app().innerHTML = this.template();
    this.createEventListeners();
  },

  createEventListeners() {
    const searchButton = document.getElementById('search-button');
    searchButton?.addEventListener('click', (event) => {
      event.preventDefault();

      const searchField = document.getElementById('search-field');
      const searchFieldValue = searchField?.value;

      if (searchFieldValue.length === 0) {
        searchField.classList.add('input-filed-error');
        return;
      } else {
        searchField.classList.remove('input-filed-error');
      }

      const tagSelector = document.getElementById('tag-selector');
      const tagSelectorValue = tagSelector?.value;

      if (tagSelectorValue.length === 0) {
        tagSelector.classList.add('input-filed-error');
        return;
      } else {
        tagSelector.classList.remove('input-filed-error');
      }

      if (
        this.state.query != searchFieldValue ||
        this.state.selectedTag != tagSelectorValue
      ) {
        // This is a new search
        this.state.query = searchFieldValue;
        this.state.selectedTag = tagSelectorValue;
        this.resetSearchResults();
      }

      this.searchAction({
        query: searchFieldValue,
        tag: tagSelectorValue,
        currentPage: this.state.currentPage,
        itemsPerPage: this.state.itemsPerPage,
      });
    });

    const favoritesButton = document.getElementById('favorites-button');
    favoritesButton?.addEventListener('click', (event) => {
      event.preventDefault();

      const favorites = this.state.favorites;
      if (favorites.length === 0) {
        alert("No favorites saved");
        return;
      }

      let photoCards = favorites.map((photoObject) => {
        return PhotoCard(photoObject);
      });

      const modal = Modal('My Favorites', photoCards);

      const element = document.createElement("div");
      element.innerHTML = modal;

      this.selectors.app()?.appendChild(element);

      const closeModalButton = document.querySelector('.close-modal-button');
      closeModalButton?.addEventListener('click', (event) => {
        event.preventDefault();
        const modalContainer = document.querySelector('.modal-container');
        modalContainer?.parentElement?.removeChild(modalContainer);
      })
    })
  },

  // App methods/functions

  async searchAction({ query, tag, currentPage, itemsPerPage }) {
    const searchResults = await API.searchPhotos({
      query,
      tag,
      currentPage,
      itemsPerPage,
    });

    if (searchResults === undefined) {
      this.state.searchResults = [];
      this.selectors.loadMoreContainer().innerHTML = 'NO SEARCH RESULTS FOUND';
      return;
    }

    this.state.searchResults = searchResults;
    this.state.currentPage += 1;

    this.updateSearchResultsUI();
  },

  updateSearchResultsUI() {
    let photosSection = this.selectors.photosSection();

    this.state.searchResults.forEach((photoObject) => {
      // 1. Create a String representation of the PhotoCard HTML
      let photoCard = PhotoCard(photoObject);

      // 2. Create a new HTMLElement to store our PhotoCard HTML inside of
      let photoCardElement = document.createElement('div');

      // 3. Inject the PhotoCard HTML String into the HTMLElement
      photoCardElement.innerHTML = photoCard;

      // 4. Append the new PhotoCard HTMLElement into the PhotosSection HTML
      photosSection?.appendChild(photoCardElement);

      // 5. Get a reference to our favorites state
      let favorites = this.state.favorites;

      // 6. Check if this Photo is already favorited
      const isAlreadyFavorited = favorites.find(
        (favorite) => favorite.id === photoObject.id
      );

      // 7. Create a reference to our new favorite button
      const addToFavoritesButton =
        photoCardElement.getElementsByClassName('favorite-button')[0];

      // 8. Check if the favorite button exsits
      if (addToFavoritesButton != undefined) {
        // 9. Check if it is already favorited (from our favorites state)
        if (isAlreadyFavorited) {
          addToFavoritesButton.innerHTML = '🖤';
        }

        // 10. Add a click event listener to this favorite button
        addToFavoritesButton.addEventListener('click', (event) => {
          event.preventDefault();

          const isAlreadyFavorited = favorites.find(
            (favorite) => favorite.id === photoObject.id
          );

          if (isAlreadyFavorited) {
            const photoObjectIndex = favorites.indexOf(photoObject);
            favorites.splice(photoObjectIndex, 1);
            addToFavoritesButton.innerHTML = '🤍';
          } else {
            favorites.push(photoObject);
            addToFavoritesButton.innerHTML = '🖤';
          }
        });
      }
    });

    if (this.state.searchResults.length > 0) {
      this.generateLoadMoreButtonIfNeeded();
    }
  },

  resetSearchResults() {
    this.state.searchResults = [];
    this.state.currentPage = 1;
    this.selectors.photosSection().innerHTML = ``;
    /////// added- reset load more conainer
    this.selectors.loadMoreContainer().innerHTML = '';
    this.state.isShowingLoadMoreButton = false;
  },

  generateLoadMoreButtonIfNeeded() {
    // NOTE: There's a bug - when adding the load more button to the Search Bar section,
    // the search button loses its event listener.
    // We should solve this issue later.

    if (this.state.isShowingLoadMoreButton) {
      return;
    }

    const container = this.selectors.loadMoreContainer();
    container.innerHTML += `<button id="load-more-button" class="button">Load More Photos</button>`;

    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton?.addEventListener('click', (event) => {
      event.preventDefault();

      this.searchAction({
        query: this.state.query,
        tag: this.state.selectedTag,
        currentPage: this.state.currentPage,
        itemsPerPage: this.state.itemsPerPage,
      });
    });

    this.state.isShowingLoadMoreButton = true;
  },
};

App.intialize();
