const header = document.querySelector("header");
const footer = document.querySelector("footer");

if (header) {
	const btnBurguerMenu = header.querySelector(".btn-burguer-menu");
	const menumobile = header.querySelector(".menu-mobile");

	if (btnBurguerMenu && menumobile) {
		btnBurguerMenu.addEventListener("click", () => {
			menumobile.classList.toggle("visible");
		});
	}
}

if (footer) {
	document.addEventListener("DOMContentLoaded", function () {
		const toggles = footer.querySelectorAll(".footer-toggle");

		toggles.forEach((toggle) => {
			toggle.addEventListener("click", () => {
				const linkGroup = toggle.closest(".link-group");
				if (linkGroup) {
					linkGroup.classList.toggle("active");
					const isExpanded = linkGroup.classList.contains("active");
					toggle.setAttribute("aria-expanded", isExpanded);
				}
			});
		});
	});
}
