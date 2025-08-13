import { API_KEY } from "./config.js";
import { createSlides, initializeSwiper } from "./ui.js";
const API_BASE_URL = "https://api.themoviedb.org/3";

/**
 * @returns {Promise<Array>}
 */
export async function getHighlightsData() {
	const urlMovies = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;
	const urlSeries = `${API_BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`;

	const [responseMovies, responseSeries] = await Promise.all([fetch(urlMovies), fetch(urlSeries)]);

	if (!responseMovies.ok || !responseSeries.ok) {
		throw new Error("Falha ao buscar os destaques da API.");
	}

	const dataMovies = await responseMovies.json();
	const dataSeries = await responseSeries.json();

	const highlights = [...dataMovies.results, ...dataSeries.results];
	return highlights.sort((a, b) => b.popularity - a.popularity);
}

/**
 * @param {string} searchTerm
 * @returns {Promise<Array>}
 */
export async function searchApi(searchTerm) {
	const url = `${API_BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("A busca na API falhou.");
	}

	const data = await response.json();
	return data.results;
}

/**
 * @param {string} swiperSelector
 * @param {string} apiEndpoint
 * @param {string} errorMessage
 * @param {number} limit
 */
export async function createCarouselFromApi(swiperSelector, apiEndpoint, errorMessage, limit = 15) {
	const swiperWrapper = document.querySelector(`${swiperSelector} .swiper-wrapper`);
	const spinner = document.querySelector(`${swiperSelector} .spinner`);

	if (!swiperWrapper || !spinner) return;

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const url = `${API_BASE_URL}/${apiEndpoint}&api_key=${API_KEY}`;
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
