export const getSearchData = async (query, currentPage, perPage) => {
  const API_KEY = '38179415-ae32d6643ecbce8d3a8bcb459';
  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&page=${currentPage}&per_page=${perPage}&image_type=photo`;
  // need to handle 400 err- dosent work
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        return data.hits;
      } else {
        console.error(`API Error: Status ${response.status}`);
      }
    }
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
};
