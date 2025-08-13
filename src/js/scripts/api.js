// Definimos a chave da API e URLs base uma única vez.
const API_KEY = "3d65ce4a697415814bb2bacb00b455bf";
const IMAGE_BASE_URL_POSTER = "https://image.tmdb.org/t/p/w500";
const IMAGE_BASE_URL_BACKDROP = "https://image.tmdb.org/t/p/original";

const defaultSwiperConfig = {
	slidesPerView: "auto",
	spaceBetween: 16,
	loop: true,
	breakpoints: {
		320: {
			spaceBetween: 8,
		},
		650: {
			spaceBetween: 16,
		},
	},
};
const swiperConfigs = {
	".swiperDestaques": {
		slidesPerView: 1.5,
		centeredSlides: true,
		initialSlide: 1,
		spaceBetween: 80,
		loop: true,
		navigation: {
			nextEl: ".swiperDestaques .custom-button-next",
			prevEl: ".swiperDestaques .custom-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: "auto",
				spaceBetween: 8,
				initialSlide: 0,
			},
			800: {
				slidesPerView: 1.5,
				spaceBetween: 80,
				initialSlide: 1,
			},
		},
	},
	".swiperTerrorFilmes": { ...defaultSwiperConfig },
	".swiperNacionalFilmes": { ...defaultSwiperConfig },
	".swiperDCFilmes": { ...defaultSwiperConfig },
	".swiperMarvelFilmes": { ...defaultSwiperConfig },
	".swiperTerrorSeries": { ...defaultSwiperConfig },
	".swiperAcaoSeries": { ...defaultSwiperConfig },
	".swiperComediaSeries": { ...defaultSwiperConfig },
	".swiperRomanceSeries": { ...defaultSwiperConfig },
};

function initializeSwiper(swiperSelector) {
	const config = swiperConfigs[swiperSelector];
	if (config) {
		new Swiper(swiperSelector, config);
	}
}
/**
 * @param {Array} items -
 * @param {HTMLElement} swiperWrapper
 * @param {number} limit
 */
function createSlides(items, swiperWrapper, limit) {
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
        <div class="movie-description">
          <h3>${itemTitle}</h3>
        </div>
      `;
			swiperWrapper.appendChild(slide);
		}
	}
}

function truncateText(text, maxLength = 450) {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + "...";
}

/**
 * @param {string} swiperSelector
 * @param {string} url
 * @param {string} errorMessage
 * @param {number} limit
 */
async function createGenericCarousel(swiperSelector, url, errorMessage, limit = 15) {
	const swiperWrapper = document.querySelector(`${swiperSelector} .swiper-wrapper`);
	const spinner = document.querySelector(`${swiperSelector} .spinner`);

	if (!swiperWrapper || !spinner) return;

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Erro na rede: ${response.status}`);
		}
		const data = await response.json();
		createSlides(data.results, swiperWrapper, limit);
		initializeSwiper(swiperSelector);
	} catch (error) {
		console.error(`Erro ao carregar ${swiperSelector}:`, error);
		swiperWrapper.innerHTML = `<p>${errorMessage}</p>`;
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}
async function getHighlights() {
	const swiperWrapper = document.querySelector(".swiperDestaques .swiper-wrapper");
	const spinner = document.querySelector(".swiperDestaques .spinner");
	const urlMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
	const urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR`;

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const [responseMovies, responseSeries] = await Promise.all([fetch(urlMovies), fetch(urlSeries)]);
		if (!responseMovies.ok || !responseSeries.ok) throw new Error("Falha ao buscar destaques.");

		const dataMovies = await responseMovies.json();
		const dataSeries = await responseSeries.json();
		let highlights = [...dataMovies.results, ...dataSeries.results];
		highlights.sort((a, b) => b.popularity - a.popularity);

		swiperWrapper.innerHTML = "";
		highlights.slice(0, 5).forEach((item) => {
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

		initializeSwiper(".swiperDestaques");
	} catch (error) {
		console.error("Houve um problema com a requisição de destaques:", error);
		swiperWrapper.innerHTML = "<p>Não foi possível carregar os destaques.</p>";
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const abasConfig = {
		movies: {
			btn: document.querySelector(".btn-filme"),
			panel: document.getElementById("movies"),
			loader: () => {
				createGenericCarousel(
					".swiperTerrorFilmes",
					`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&language=pt-BR`,
					"Erro ao carregar filmes de terror."
				);
				createGenericCarousel(
					".swiperNacionalFilmes",
					`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=pt`,
					"Erro ao carregar filmes nacionais."
				);
				createGenericCarousel(
					".swiperDCFilmes",
					`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=174|9993|429|923&language=pt-BR`,
					"Erro ao carregar filmes da DC."
				);
				createGenericCarousel(
					".swiperMarvelFilmes",
					`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=420|19551|38679|2301|13252&language=pt-BR`,
					"Erro ao carregar filmes da Marvel."
				);
			},
			loaded: false,
		},
		series: {
			btn: document.querySelector(".btn-series"),
			panel: document.getElementById("series"),
			loader: () => {
				createGenericCarousel(
					".swiperTerrorSeries",
					`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10765&language=pt-BR`,
					"Erro ao carregar séries de terror."
				);
				createGenericCarousel(
					".swiperAcaoSeries",
					`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759&language=pt-BR`,
					"Erro ao carregar séries de ação."
				);
				createGenericCarousel(
					".swiperComediaSeries",
					`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35&language=pt-BR`,
					"Erro ao carregar séries de comédia."
				);
				createGenericCarousel(
					".swiperRomanceSeries",
					`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10749&language=pt-BR`,
					"Erro ao carregar séries de romance."
				);
			},
			loaded: false,
		},
		canais: {
			btn: document.querySelector(".btn-canais"),
			panel: document.getElementById("canais"),
			loader: () => console.log("Carregando canais..."),
			loaded: false,
		},
	};

	const ordemDasAbas = ["movies", "series", "canais"];
	const btnNavNext = document.querySelectorAll(".navigation-button-next");
	const btnNavPrev = document.querySelectorAll(".navigation-button-prev");
	let abaAtivaId = ordemDasAbas[0];

	function trocarAba(id) {
		abaAtivaId = id;
		for (const key in abasConfig) {
			abasConfig[key].panel.style.display = "none";
			abasConfig[key].btn.classList.remove("active");
		}
		const config = abasConfig[id];
		config.panel.style.display = "block";
		config.btn.classList.add("active");
		if (!config.loaded) {
			config.loader();
			config.loaded = true;
		}
		const indiceAbaAtual = ordemDasAbas.indexOf(id);
		btnNavPrev.forEach((btn) => (btn.style.display = indiceAbaAtual === 0 ? "none" : "flex"));
		btnNavNext.forEach((btn) => (btn.style.display = indiceAbaAtual === ordemDasAbas.length - 1 ? "none" : "flex"));
	}
	function navegarAbas(direcao) {
		const indiceAbaAtual = ordemDasAbas.indexOf(abaAtivaId);
		const proximoIndice = indiceAbaAtual + direcao;
		if (proximoIndice >= 0 && proximoIndice < ordemDasAbas.length) {
			trocarAba(ordemDasAbas[proximoIndice]);
		}
	}

	for (const id in abasConfig) {
		abasConfig[id].btn.addEventListener("click", () => trocarAba(id));
	}
	btnNavNext.forEach((btn) => btn.addEventListener("click", () => navegarAbas(1)));
	btnNavPrev.forEach((btn) => btn.addEventListener("click", () => navegarAbas(-1)));

	await getHighlights();
	trocarAba(ordemDasAbas[0]);
});
