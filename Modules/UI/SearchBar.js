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
    <section id="search-bar-section">
      <div class="container search-container">
        <select id="tag-selector">
        <option value="">Select a tag</option>
          ${generateTagsOptions()}
        </select>
        <input type="text" id="search-field" class="searchInput" placeholder="Search Photo..." />
        <button id="search-button" class="search-button button button-primary">
            <i class="fa fa-search" aria-hidden="true"></i>
            Search
        </button>
      </div>
      <div id="categories-container" >t</div>
    </section>
    `;
};

export default SearchBar;
