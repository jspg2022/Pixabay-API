const Header = () => {
    return `
    <header id="header">
        <div class="container">
            <div class="logo-container">
                <h1 class="title">Reut's Photography</h1>
                <h2 class="slogan">Powered by Pixaby</h2>
            </div>
            <div class="buttons-container">
                <button id="favorites-button" class="button button-secondary">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    Favorites
                </button>
            </div>
        </div>
    </header>
    <div class="header-spacer"></div>
    `;
};

export default Header;
