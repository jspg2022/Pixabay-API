// Business logic modules
import API from "./Modules/api.js";

// UI modules
import Header from "./Modules/UI/Header.js";
import SearchBar from "./Modules/UI/SearchBar.js";
import PhotosSection from "./Modules/UI/PhotosSection.js";

const App = {
    state: {
        itemsPerPage: 20,
        currentPage: 1,
        query: '',
        selectedTag: '',
        searchResults: []
    },

    // Initializing the app

    template() {
        return `
            ${Header()}
            ${SearchBar()}
            ${PhotosSection()}
        `;
    },

    intialize() {
        document.getElementById('app').innerHTML = this.template();
    },

    // App methods/functions

    async searchAction({ query, tag, currentPage, itemsPerPage }) {
        const searchResults = await API.searchPhotos({
            query,
            tag,
            currentPage,
            itemsPerPage
        });

        this.state.searchResults = searchResults;
    }
};

App.intialize();
