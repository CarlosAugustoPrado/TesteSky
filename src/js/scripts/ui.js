import { swiperConfigs, IMAGE_BASE_URL_POSTER, IMAGE_BASE_URL_BACKDROP } from "./config.js";

/**
 * @param {string} swiperSelector - O seletor do container do Swiper.
 */
export function initializeSwiper(swiperSelector) {
	const config = swiperConfigs[swiperSelector];
	if (config) {
		new Swiper(swiperSelector, config);
	}
}

/**
 * @param {string} text - O texto a ser truncado.
 * @param {number} maxLength - O comprimento máximo.
 * @returns {string} O texto truncado.
 */
export function truncateText(text, maxLength = 450) {
	if (!text || text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + "...";
}

/**
 * @param {Array} items
 * @param {HTMLElement} swiperWrapper
 * @param {number} limit
 */
export function createSlides(items, swiperWrapper, limit) {
	swiperWrapper.innerHTML = "";
	if (!items || items.length === 0) {
		swiperWrapper.innerHTML = "<p>Nenhum item encontrado.</p>";
		return;
	}
	const itemsToRender = items.slice(0, limit);
	for (const item of itemsToRender) {
		const itemTitle = item.title || item.name;
		if (item.poster_path && itemTitle) {
			const slide = document.createElement("div");
			slide.classList.add("swiper-slide");
			const imageUrl = `${IMAGE_BASE_URL_POSTER}${item.poster_path}`;
			slide.innerHTML = `
        <button class="btn-shopping-cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
            <path fill="#FFF" fill-rule="nonzero" d="M21.87 4.986l-3.057 8.298a.993.993 0 0 1-.93.652h-9.74l-.839 1.53v.196h10.718c.549 0 .993.447.993.999 0 .551-.444.999-.993.999H6.311a.996.996 0 0 1-.993-1V15.21c0-.17.042-.335.124-.483l.944-1.721L3.077 2.632h-1.75a.996.996 0 0 1-.994-.999c0-.552.445-.999.993-.999h2.475c.432 0 .814.28.946.694l.632 1.982h15.74c.987 0 1.238 1.112.752 1.676zM6.312 22.293a1.992 1.992 0 0 1-1.986-1.999c0-1.103.89-1.998 1.986-1.998 1.097 0 1.986.895 1.986 1.998 0 1.104-.89 1.999-1.986 1.999zm11.916 0a1.992 1.992 0 0 1-1.986-1.999c0-1.103.89-1.998 1.986-1.998 1.097 0 1.986.895 1.986 1.998 0 1.104-.89 1.999-1.986 1.999z"/>
          </svg>
        </button>
        <div class="image-area" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 20%), url('${imageUrl}')"></div>
        <div class="movie-description"><h3>${itemTitle}</h3></div>
      `;
			swiperWrapper.appendChild(slide);
		}
	}
}

/**
 * @param {Array} items
 */
export function displayHighlights(items) {
	const swiperWrapper = document.querySelector(".swiperDestaques .swiper-wrapper");
	const spinner = document.querySelector(".swiperDestaques .spinner");

	spinner.style.display = "flex";
	swiperWrapper.style.display = "none";
	swiperWrapper.innerHTML = "";

	items.slice(0, 5).forEach((item) => {
		if (item.backdrop_path && (item.title || item.name)) {
			const slide = document.createElement("div");
			slide.classList.add("swiper-slide");
			const backdropUrl = `${IMAGE_BASE_URL_BACKDROP}${item.backdrop_path}`;
			const description = truncateText(item.overview, 450);
			slide.innerHTML = `
        <div class="image-area" style="background-image: url('${backdropUrl}')"></div>
        <div class="movie-description">
          <h3>${item.title || item.name}</h3>
          <p>${description}</p>
        </div>
      `;
			swiperWrapper.appendChild(slide);
		}
	});

	spinner.style.display = "none";
	swiperWrapper.style.display = "flex";
	initializeSwiper(".swiperDestaques");
}

/**
 * @param {Array} items
 * @param {string} searchTerm
 */
export function displaySearchResults(items, searchTerm) {
	const mainContent = document.getElementById("main-content");
	const destaquesContent = document.querySelector(".s-destaques");
	const searchResultsContainer = document.querySelector(".search-results");

	if (mainContent) mainContent.style.display = "none";
	if (destaquesContent) destaquesContent.style.display = "none";
	if (searchResultsContainer) searchResultsContainer.style.display = "block";

	const resultsGrid = document.querySelector(".search-results .cards-results");
	const resultsTitle = document.querySelector(".search-results h2");

	resultsGrid.innerHTML = "";
	resultsTitle.textContent = `Resultados para: "${searchTerm}"`;

	const validItems = items.filter((item) => (item.media_type === "movie" || item.media_type === "tv") && item.poster_path);
	if (validItems.length === 0) {
		resultsGrid.innerHTML = "<p>Nenhum filme ou série encontrado com este termo.</p>";
		return;
	}

	validItems.forEach((item) => {
		const card = document.createElement("div");
		card.className = "result-card";
		const itemTitle = item.title || item.name;
		const imageUrl = `${IMAGE_BASE_URL_POSTER}${item.poster_path}`;
		card.innerHTML = `
      <div class="card-image" style="background-image: url('${imageUrl}')"></div>
      <div class="card-info">
        <h3>${itemTitle}</h3>
      </div>
    `;
		resultsGrid.appendChild(card);
	});
}

/**
 * Configura todos os event listeners da aplicação.
 * @param {object} config - Objeto contendo elementos e funções de callback do main.js.
 */
export function setupEventListeners(config) {
	// Menu mobile
	const btnBurguerMenu = config.header.querySelector(".btn-burguer-menu");
	const menumobile = config.header.querySelector(".menu-mobile");
	btnBurguerMenu?.addEventListener("click", () => menumobile?.classList.toggle("visible"));

	// Formulário de busca
	const btnOpenSearch = config.header.querySelector(".btn-search");
	const closeSearchForm = config.searchForm?.querySelector(".btn-close");

	if (btnOpenSearch) {
		btnOpenSearch.addEventListener("click", () => config.searchForm?.classList.add("visible"));
	}

	if (closeSearchForm) {
		closeSearchForm.addEventListener("click", () => config.searchForm?.classList.remove("visible"));
	}

	if (config.searchForm) {
		config.searchForm.addEventListener("submit", config.handleSearch);
	}

	// Abas
	for (const id in config.abasConfig) {
		config.abasConfig[id].btn?.addEventListener("click", () => config.trocarAba(id));
	}

	// Navegação de Abas
	document.querySelectorAll(".navigation-button-next").forEach((btn) => btn.addEventListener("click", () => config.navegarAbas(1)));
	document.querySelectorAll(".navigation-button-prev").forEach((btn) => btn.addEventListener("click", () => config.navegarAbas(-1)));

	// Footer
	config.footer?.querySelectorAll(".footer-toggle").forEach((toggle) => {
		toggle.addEventListener("click", () => {
			const linkGroup = toggle.closest(".link-group");
			linkGroup?.classList.toggle("active");
		});
	});
}
