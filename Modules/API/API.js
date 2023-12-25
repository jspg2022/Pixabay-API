import Constants from '../Constants.js';
import Photo from './Photo.js';

const API = {
  async searchPhotos({ query, tag, currentPage, itemsPerPage }) {
    const URL = `https://pixabay.com/api/?key=${
      Constants.apiKey
    }&q=${encodeURIComponent(
      query
    )}&page=${currentPage}&per_page=${itemsPerPage}&image_type=photo`;
    const urlByCategury = URL + `&category=${encodeURIComponent(tag)}`;

    // need to handle 400 err- dosent work
    try {
      const response = await fetch(!tag ? URL : urlByCategury);
      if (response.status === 200) {
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
          const photos = data.hits.map((pixabayPhoto) => {
            return new Photo({
              id: pixabayPhoto.id,
              previewURL: pixabayPhoto.previewURL,
              photoURL: pixabayPhoto.largeImageURL,
              tags: pixabayPhoto.tags,
              isFavorite: false,
            });
          });
          return photos;
        } else {
          console.error(`API Error: Status ${response.status}`);
        }
      }
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  },
};

export default API;
