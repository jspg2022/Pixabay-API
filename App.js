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
  },

  selectors: {
    app: () => { return document.getElementById('app') },
    photosSection: () => { return document.getElementById('photos-section'); }
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
        itemsPerPage: this.state.itemsPerPage
       });
    });
  },

  // App methods/functions

  async searchAction({ query, tag, currentPage, itemsPerPage }) {
    // Reset search results first
    this.state.searchResults = [];
    this.selectors.photosSection().innerHTML = ``;

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

    this.updateSearchResultsUI();
  },

  updateSearchResultsUI() {
    let photosSection = this.selectors.photosSection();

    this.state.searchResults.forEach((photoObject) => {
      let photoCard = PhotoCard(photoObject);
      photosSection.innerHTML += photoCard;
    });
  }
};

App.intialize();
