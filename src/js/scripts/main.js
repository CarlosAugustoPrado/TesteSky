import { API_KEY, swiperConfigs } from "./config.js";
import { getHighlightsData, searchApi, createCarouselFromApi } from "./api.js";
import { initializeSwiper, displayHighlights, displaySearchResults, setupEventListeners } from "./ui.js";

const searchInput = document.getElementById("search-input");
const mainContent = document.getElementById("main-content");
const searchResultsContainer = document.querySelector(".search-results");
const sessaoDestaques = document.querySelector(".s-destaques");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

let abaAtivaId = "movies";

const abasConfig = {
	movies: {
		btn: document.querySelector(".btn-filme"),
		panel: document.getElementById("movies"),
		loader: () => {
			createCarouselFromApi(".swiperTerrorFilmes", `discover/movie?with_genres=27&language=pt-BR`, "Erro ao carregar filmes de terror.");
			createCarouselFromApi(".swiperNacionalFilmes", `discover/movie?with_original_language=pt`, "Erro ao carregar filmes nacionais.");
			createCarouselFromApi(".swiperDCFilmes", `discover/movie?with_companies=174|9993|429|923&language=pt-BR`, "Erro ao carregar filmes da DC.");
			createCarouselFromApi(".swiperMarvelFilmes", `discover/movie?with_companies=420|19551|38679|2301|13252&language=pt-BR`, "Erro ao carregar filmes da Marvel.");
		},
		loaded: false,
	},
	series: {
		btn: document.querySelector(".btn-series"),
		panel: document.getElementById("series"),
		loader: () => {
			createCarouselFromApi(".swiperTerrorSeries", `discover/tv?with_genres=10765&language=pt-BR`, "Erro ao carregar séries de terror.");
			createCarouselFromApi(".swiperAcaoSeries", `discover/tv?with_genres=10759&language=pt-BR`, "Erro ao carregar séries de ação.");
			createCarouselFromApi(".swiperComediaSeries", `discover/tv?with_genres=35&language=pt-BR`, "Erro ao carregar séries de comédia.");
			createCarouselFromApi(".swiperRomanceSeries", `discover/tv?with_genres=10749&language=pt-BR`, "Erro ao carregar séries de romance.");
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

function desativarTodasAsAbas() {
	for (const key in abasConfig) {
		abasConfig[key].btn.classList.remove("active");
	}
}

function trocarAba(id) {
	abaAtivaId = id;

	searchResultsContainer.style.display = "none";
	searchResultsContainer.style.display = "none";
	mainContent.style.display = "block";
	sessaoDestaques.style.display = "block";

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
	document.querySelectorAll(".navigation-button-prev").forEach((btn) => (btn.style.display = indiceAbaAtual === 0 ? "none" : "flex"));
	document.querySelectorAll(".navigation-button-next").forEach((btn) => (btn.style.display = indiceAbaAtual === ordemDasAbas.length - 1 ? "none" : "flex"));
}

function navegarAbas(direcao) {
	const indiceAbaAtual = ordemDasAbas.indexOf(abaAtivaId);
	const proximoIndice = indiceAbaAtual + direcao;
	if (proximoIndice >= 0 && proximoIndice < ordemDasAbas.length) {
		trocarAba(ordemDasAbas[proximoIndice]);
	}
}

async function handleSearch(event) {
	console.log("A função handleSearch foi chamada!");
	event.preventDefault();
	const searchTerm = searchInput.value.trim();
	if (!searchTerm) return;

	desativarTodasAsAbas();

	try {
		const items = await searchApi(searchTerm);
		displaySearchResults(items, searchTerm);
	} catch (error) {
		console.error("Erro na busca:", error);
	}
}

async function initializeApp() {
	setupEventListeners({
		header,
		footer,
		abasConfig,
		searchForm: document.querySelector(".search-form"),
		handleSearch,
		trocarAba,
		navegarAbas,
	});

	try {
		const highlights = await getHighlightsData();
		displayHighlights(highlights);
		trocarAba(ordemDasAbas[0]);
	} catch (error) {
		console.error("Erro ao inicializar a aplicação:", error);
	}
}

initializeApp();
