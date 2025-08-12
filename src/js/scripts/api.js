function initializeSwiper(swiperSelector) {
	if (swiperSelector === ".swiperDestaquesFilmes") {
		new Swiper(swiperSelector, {
			slidesPerView: 1.5,
			centeredSlides: true,
			initialSlide: 1,
			spaceBetween: 80,
			loop: true,
			navigation: {
				nextEl: ".swiperDestaquesFilmes .custom-button-next",
				prevEl: ".swiperDestaquesFilmes .custom-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});
	} else if (swiperSelector === ".swiperTerrorFilmes") {
		new Swiper(swiperSelector, {
			slidesPerView: "auto",
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: ".swiperTerrorFilmes .custom-button-next",
				prevEl: ".swiperTerrorFilmes .custom-button-prev",
			},
		});
	} else if (swiperSelector === ".swiperNacionalFilmes") {
		new Swiper(swiperSelector, {
			slidesPerView: "auto",
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: ".swiperNacionalFilmes .custom-button-next",
				prevEl: ".swiperNacionalFilmes .custom-button-prev",
			},
		});
	} else if (swiperSelector === ".swiperDCFilmes") {
		new Swiper(swiperSelector, {
			slidesPerView: "auto",
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: ".swiperDCFilmes .custom-button-next",
				prevEl: ".swiperDCFilmes .custom-button-prev",
			},
		});
	} else if (swiperSelector === ".swiperMarvelFilmes") {
		new Swiper(swiperSelector, {
			slidesPerView: "auto",
			spaceBetween: 16,
			loop: true,
			navigation: {
				nextEl: ".swiperMarvelFilmes .custom-button-next",
				prevEl: ".swiperMarvelFilmes .custom-button-prev",
			},
		});
	}
}

async function getPopularMovies() {
	const apiKey = "3d65ce4a697415814bb2bacb00b455bf";
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
	const imageBaseUrl = "https://image.tmdb.org/t/p/original";
	const swiperWrapper = document.querySelector(".swiperDestaquesFilmes .swiper-wrapper");
	const spinner = document.querySelector(".swiperDestaquesFilmes .spinner");

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Erro na rede: ${response.status} - ${response.statusText}`);
		}
		const data = await response.json();
		const movies = data.results;

		let moviesAddedCount = 0;
		if (movies && movies.length > 0) {
			for (const movie of movies) {
				if (moviesAddedCount >= 5) {
					break;
				}
				if (movie.poster_path && movie.title) {
					const slide = document.createElement("div");
					slide.classList.add("swiper-slide");
					const title = movie.title;
					const description = movie.overview;
					const backdropUrl = `${imageBaseUrl}${movie.backdrop_path}`;

					slide.innerHTML = `
                        <div class="image-area" style="background-image: url('${backdropUrl}')"></div>
                        <div class="movie-description">
                            <h3>${title}</h3>
                            <p>${description}</p>
                        </div>
                    `;
					swiperWrapper.appendChild(slide);
					moviesAddedCount++;
				}
			}
			initializeSwiper(".swiperDestaquesFilmes");
		} else {
			swiperWrapper.innerHTML = "<p>Nenhum filme encontrado.</p>";
		}
	} catch (error) {
		console.error("Houve um problema com a requisição:", error);
		swiperWrapper.innerHTML = "<p>Não foi possível carregar os filmes.</p>";
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}
async function createTerrorCarousel() {
	const apiKey = "3d65ce4a697415814bb2bacb00b455bf";
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=pt-BR`;
	const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
	const swiperWrapper = document.querySelector(".swiperTerrorFilmes .swiper-wrapper");
	const spinner = document.querySelector(".swiperTerrorFilmes .spinner");

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const response = await fetch(url);
		const data = await response.json();
		const movies = data.results;

		let moviesAddedCount = 0;
		if (movies && movies.length > 0) {
			for (const movie of movies) {
				if (moviesAddedCount >= 15) {
					break;
				}
				if (movie.poster_path && movie.title) {
					const slide = document.createElement("div");
					slide.classList.add("swiper-slide");
					const imageUrl = `${imageBaseUrl}${movie.poster_path}`;
					const title = movie.title;

					slide.innerHTML = `
                        <div class="image-area" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 20%), url('${imageUrl}')"></div>
                        <div class="movie-description">
                            <h3>${title}</h3>
                        </div>
                    `;
					swiperWrapper.appendChild(slide);
					moviesAddedCount++;
				}
			}
			initializeSwiper(".swiperTerrorFilmes");
		} else {
			swiperWrapper.innerHTML = "<p>Nenhum filme encontrado.</p>";
		}
	} catch (error) {
		console.error("Houve um problema com a requisição:", error);
		swiperWrapper.innerHTML = "<p>Não foi possível carregar os filmes de terror.</p>";
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}
async function createNacionalCarousel() {
	const apiKey = "3d65ce4a697415814bb2bacb00b455bf";
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=pt`;
	const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
	const swiperWrapper = document.querySelector(".swiperNacionalFilmes .swiper-wrapper");
	const spinner = document.querySelector(".swiperNacionalFilmes .spinner");

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const response = await fetch(url);
		const data = await response.json();
		const movies = data.results;

		let moviesAddedCount = 0;
		if (movies && movies.length > 0) {
			for (const movie of movies) {
				if (moviesAddedCount >= 15) {
					break;
				}
				if (movie.poster_path && movie.title) {
					const slide = document.createElement("div");
					slide.classList.add("swiper-slide");
					const imageUrl = `${imageBaseUrl}${movie.poster_path}`;
					const title = movie.title;

					slide.innerHTML = `
                        <div class="image-area" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 20%), url('${imageUrl}')"></div>
                        <div class="movie-description">
                            <h3>${title}</h3>
                        </div>
                    `;
					swiperWrapper.appendChild(slide);
					moviesAddedCount++;
				}
			}
			initializeSwiper(".swiperNacionalFilmes");
		} else {
			swiperWrapper.innerHTML = "<p>Nenhum filme encontrado.</p>";
		}
	} catch (error) {
		console.error("Houve um problema com a requisição:", error);
		swiperWrapper.innerHTML = "<p>Não foi possível carregar os filmes de terror.</p>";
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}
async function createDCCarousel() {
	const apiKey = "3d65ce4a697415814bb2bacb00b455bf";
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=174|9993|429|923&language=pt-BR`;
	const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
	const swiperWrapper = document.querySelector(".swiperDCFilmes .swiper-wrapper");
	const spinner = document.querySelector(".swiperDCFilmes .spinner");

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const response = await fetch(url);
		const data = await response.json();
		const movies = data.results;

		let moviesAddedCount = 0;
		if (movies && movies.length > 0) {
			for (const movie of movies) {
				if (moviesAddedCount >= 15) {
					break;
				}
				if (movie.poster_path && movie.title) {
					const slide = document.createElement("div");
					slide.classList.add("swiper-slide");
					const imageUrl = `${imageBaseUrl}${movie.poster_path}`;
					const title = movie.title;
					console.log(movie);
					slide.innerHTML = `
                        <div class="image-area" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 20%), url('${imageUrl}')"></div>
                        <div class="movie-description">
                            <h3>${title}</h3>
                        </div>
                    `;
					swiperWrapper.appendChild(slide);
					moviesAddedCount++;
				}
			}
			initializeSwiper(".swiperDCFilmes");
		} else {
			swiperWrapper.innerHTML = "<p>Nenhum filme encontrado.</p>";
		}
	} catch (error) {
		console.error("Houve um problema com a requisição:", error);
		swiperWrapper.innerHTML = "<p>Não foi possível carregar os filmes de terror.</p>";
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}
async function createMarvelCarousel() {
	const apiKey = "3d65ce4a697415814bb2bacb00b455bf";
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=primary_release_date.desc&page=1&with_companies=420|19551|38679|2301|13252`;
	const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
	const swiperWrapper = document.querySelector(".swiperMarvelFilmes .swiper-wrapper");
	const spinner = document.querySelector(".swiperMarvelFilmes .spinner");

	swiperWrapper.style.display = "none";
	spinner.style.display = "flex";

	try {
		const response = await fetch(url);
		const data = await response.json();
		const movies = data.results;

		let moviesAddedCount = 0;
		if (movies && movies.length > 0) {
			for (const movie of movies) {
				if (moviesAddedCount >= 15) {
					break;
				}
				if (movie.poster_path && movie.title) {
					const slide = document.createElement("div");
					slide.classList.add("swiper-slide");
					const imageUrl = `${imageBaseUrl}${movie.poster_path}`;
					const title = movie.title;
					console.log(movie);
					slide.innerHTML = `
                        <div class="image-area" style="background: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 20%), url('${imageUrl}')"></div>
                        <div class="movie-description">
                            <h3>${title}</h3>
                        </div>
                    `;
					swiperWrapper.appendChild(slide);
					moviesAddedCount++;
				}
			}
			initializeSwiper(".swiperMarvelFilmes");
		} else {
			swiperWrapper.innerHTML = "<p>Nenhum filme encontrado.</p>";
		}
	} catch (error) {
		console.error("Houve um problema com a requisição:", error);
		swiperWrapper.innerHTML = "<p>Não foi possível carregar os filmes de terror.</p>";
	} finally {
		swiperWrapper.style.display = "flex";
		spinner.style.display = "none";
	}
}

async function loadAllCarousels() {
	await getPopularMovies();
	createTerrorCarousel();
	createNacionalCarousel();
	createDCCarousel();
	createMarvelCarousel();
}

document.addEventListener("DOMContentLoaded", loadAllCarousels);
