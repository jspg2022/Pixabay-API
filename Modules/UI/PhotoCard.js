const PhotoCard = (photo) => {
  return `
        <article class="photo-card card">
            <div class="photo-container">
                <img src="${photo.previewURL}" class="image" />
            </div>
            <div class="favorite-button-container">
                <span id="favorite-button">${
                  photo.isFavorite ? '🖤' : '🤍'
                }</span>
            </div>
        </article>
    `;
};

export default PhotoCard;
