export const API_KEY = "3d65ce4a697415814bb2bacb00b455bf";
export const IMAGE_BASE_URL_POSTER = "https://image.tmdb.org/t/p/w500";
export const IMAGE_BASE_URL_BACKDROP = "https://image.tmdb.org/t/p/original";

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
export const swiperConfigs = {
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
