const PhotoCard = photo => {
    return `
        <article class="photo-card card">
            <img src="${photo.previewURL}" class="image" />
        </article>
    `;
};

export default PhotoCard;
