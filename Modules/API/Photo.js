class Photo {
    constructor({ id, previewURL, photoURL, tags, isFavorite }) {
        this.id = id;
        this.previewURL = previewURL;
        this.photoURL = photoURL;
        this.tags = tags;
        this.isFavorite = isFavorite;
    }
};

export default Photo;
