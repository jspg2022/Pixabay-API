const SearchBar = () => {
    return `
    <section id="search-bar-section" class="search-container">
        <select class="tagSelect">
        <option value="">Select a tag</option>
        </select>
        <input type="text" class="searchInput" placeholder="Search photo..." />
        <button class="searchBtn btn">
        <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        <button class="favoriteBtn btn">Favorites images</button>
    </section>
    `;
};

export default SearchBar;