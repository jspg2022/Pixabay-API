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

const App = {
  state: {
    itemsPerPage: 20,
    currentPage: 1,
    query: '',
    selectedTag: '',
    searchResults: [],
    favorites: [],
    isShowingLoadMoreButton: false,
  },
  // // ----- add ????? ----------------------------
  // states: {
  //   favoritesState: () => {
  //     return this.state.favorites;
  //   },
  // },

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
      ${Modal()}
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

      if (searchFieldValue.length == 0) {
        // TODO: Show error and return
        alert('Search value cannot be empty');
        return;
      } else {
        // TODO: Remove error
      }

      const tagSelector = document.getElementById('tag-selector');
      const tagSelectorValue = tagSelector?.value;

      if (tagSelectorValue.length == 0) {
        // TODO: Show error and return
        alert('Tag value cannot be empty');
        return;
      } else {
        // TODO: Remove error
      }

      this.searchAction({
        query: searchFieldValue,
        tag: tagSelectorValue,
        currentPage: this.state.currentPage,
        itemsPerPage: this.state.itemsPerPage,
      });
    });
  },

  // App methods/functions

  async searchAction({ query, tag, currentPage, itemsPerPage }) {
    if (this.state.query != query || this.state.selectedTag != tag) {
      // This is a new search
      this.state.query = query;
      this.state.selectedTag = tag;
      this.resetSearchResults();
    }

    const searchResults = await API.searchPhotos({
      query,
      tag,
      currentPage,
      itemsPerPage,
    });

    if (searchResults.lengh == 0) {
      this.state.searchResults = [];
      // TODO: Show empty state in UI
      return;
    }

    this.state.searchResults = searchResults;
    this.state.currentPage += 1;

    this.updateSearchResultsUI();
  },

  updateSearchResultsUI() {
    let photosSection = this.selectors.photosSection();

    this.state.searchResults.forEach((photoObject) => {
      let photoCard = PhotoCard(photoObject);
      photosSection.innerHTML += photoCard;
      // TODO: Add an event listener to the photo card's favorite button and onclick add it to favorites
      // TODO: Check if this photo object is favorited using our `this.state.favorites` array.

      // add ------------------------------
      const addFavouritesAction = document.getElementById('favorite-button');
      addFavouritesAction.addEventListener('click', (event) => {
        event.preventDefault();
        const photoId = photoObject.id;
        const isAlreadyFavorited = this.state.favorites.find(
          (favorite) => favorite.id === photoId
        );
        isAlreadyFavorited
          ? (this.state.favorites = this.state.favorites.filter(
              (favorite) => favorite.id !== photoId
            ))
          : this.state.favorites.push(photoObject);
        console.log(isAlreadyFavorited, 77);
        console.log(this.state.favorites);
      });
    });

    if (this.state.searchResults.length > 0) {
      this.generateLoadMoreButtonIfNeeded();
    }
  },

  // // add ---------------
  // createEventListeners2() {
  //   const addFavouritesAction = document.getElementById('favorite-button');
  //   addFavouritesAction.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     console.log(first);
  //   });
  // },

  resetSearchResults() {
    this.state.searchResults = [];
    this.state.currentPage = 1;
    this.selectors.photosSection().innerHTML = ``;
  },

  generateLoadMoreButtonIfNeeded() {
    // NOTE: There's a bug - when adding the load more button to the Search Bar section,
    // the search button loses its event listener.
    // We should solve this issue later.

    if (this.state.isShowingLoadMoreButton) {
      return;
    }

    const container = this.selectors.loadMoreContainer();
    container.innerHTML += `<button id="load-more-button" class="btn">Load More Photos</button>`;

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
