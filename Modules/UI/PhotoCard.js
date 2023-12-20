const PhotoCard = (photoObject) => {
  return `
        <article class="photo-card card">
            <div class="photo-container">
                <img src="${photoObject.previewURL}" class="image" />
            </div>
            <div class="favorite-button-container">
                <span class="favorite-button">🤍</span>
            </div>
        </article>
    `;
};

export default PhotoCard;
