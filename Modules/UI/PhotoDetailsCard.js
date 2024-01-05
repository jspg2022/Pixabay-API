const PhotoDetailsCard = (photoObject) => {
  // ????? what is better? to add new class and add it to the same css? or use the "card" class?
  return `
  <article class="photo-details">
  <div class="photo-details-container">
    <h1>${photoObject.tags}</h1>
    <p>${photoObject.photoURL}</p>
  </div>
  <div class="favorite-button-container">
  </div>
</article>
  `;
};

export default PhotoDetailsCard;
