const SearchBar = ({ tags }) => {
  const generateTagsOptions = () => {
    if (tags == undefined || tags.length == 0) {
      return;
    }

    let optionsHTML = tags.map((tag) => {
      return `<option value="${tag}">${tag}</option>`;
    });

    return optionsHTML;
  };

  return `
    <section id="search-bar-section" class="search-container">
        <select id="tag-selector" class="tagSelect">
            <option value="">Select a tag</option>
            ${generateTagsOptions()}
        </select>
        <input type="text" id="search-field" class="searchInput" placeholder="Search photo..." />
        <button id="search-button" class="searchBtn btn">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        <button id="favorites-button" class="btn">Favorites images</button>
    </section>
    `;
};

export default SearchBar;
