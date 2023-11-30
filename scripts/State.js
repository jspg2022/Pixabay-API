const favoritesArr = [];
const perPage = 20;

let currentPage;
let searchInputVal;

let selectedTag = '';
const predefinedTags = [
  'backgrounds',
  'fashion',
  'nature',
  'science',
  'education',
  'feelings',
  'health',
  'people',
  'religion',
  'places',
  'animals',
  'industry',
  'computer',
  'food',
  'sports',
  'transportation',
  'travel',
  'buildings',
  'business',
  'music',
];

// let calculateTotalPages; // need to add for more images function-To prevent an unnecessary request?? // by divide yotal with perpage
