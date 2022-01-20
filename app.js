const cart = document.querySelector("#cart");
const cartWindow = document.querySelector("#cart-window");
const qtyAddBtn = document.querySelector("#qty-add");
const qtyMinusBtn = document.querySelector("#qty-minus");
let qty = document.querySelector(".product__qty");
const heroImg = document.querySelector(".hero__main-img img");
const heroGalleryImg = document.querySelectorAll(
	".product__details .hero__gallery-img"
);
const nextBtn = document.querySelector(".hero__next-btn");
const prevBtn = document.querySelector(".hero__prev-btn");
const nav = document.querySelector("#nav");
const sidebar = document.querySelector("#sidebar");
const addToCart = document.querySelector("#add-to-cart");
const cartDeleteBtn = document.querySelector("#cart-delete-btn");
const overlayPrevBtn = document.querySelector("#overlay-prev");
const overlayNextBtn = document.querySelector("#overlay-next");
const overlayGalleryImages = document.querySelectorAll(
	".overlay .hero__gallery-img"
);
const overlayMainImg = document.querySelector("#overlay-main-img");
const overlayCloseBtn = document.querySelector(".overlay__close-btn");
const itemPrice = 125;
let cartItemAmount = 0;
let defaultQty = 0;
let heroImgIndex = 0;
let overlayImgIndex = 0;

cart.addEventListener("click", e => {
	if (e.target.parentElement.id !== "cart") return;
	cartWindow.classList.toggle("open");
});

heroGalleryImg.forEach((img, idx) => {
	img.addEventListener("click", () => {
		heroImg.src = `images/image-product-${idx + 1}.jpg`;
		heroGalleryImg.forEach(item => item.classList.remove("selected"));
		img.classList.add("selected");
	});
});

nextBtn.addEventListener("click", e => {
	if (!e.target.closest(".hero__slide-btn")) return;
	heroImgIndex++;
	if (heroImgIndex > heroGalleryImg.length - 1) heroImgIndex = 0;
	heroImg.src = `images/image-product-${heroImgIndex + 1}.jpg`;
});

const qtyCheck = e => {
	const closest = e.target.closest(".product__qty-btn");
	if (!closest) return;
	const { id } = closest;
	if (id === "qty-add") defaultQty++;
	if (id === "qty-minus") {
		defaultQty--;
		if (defaultQty < 0) defaultQty = 0;
	}

	qty.textContent = defaultQty;
};

qtyAddBtn.addEventListener("click", qtyCheck);
qtyMinusBtn.addEventListener("click", qtyCheck);

nav.addEventListener("click", e => {
	if (!e.target.closest(".nav__menu-icon")) return;

	document.querySelector(".overlay-sidebar").classList.add("open");
});

sidebar.addEventListener("click", e => {
	if (!e.target.closest(".sidebar__close-btn")) return;
	document.querySelector(".overlay-sidebar").classList.remove("open");
});

const isCartEmpty = () => {
	const cartItems = document.querySelector(".nav__cart-items");
	const checkoutBtn = document.querySelector(".btn-checkout");
	const cartBody = document.querySelector(".nav__cart-body");
	const cartEmptyText = document.querySelector(".nav__cart-item-empty-text");
	const cartNumber = document.querySelector(".nav__cart-number");

	if (cartItemAmount === 0) {
		cartItems.classList.add("hide");
		checkoutBtn.style.display = "none";
		cartBody.style.display = "grid";
		cartBody.style.placeItems = "center";
		cartEmptyText.classList.add("show");
		cartNumber.classList.add("hidden");
	} else {
		cartItems.classList.remove("hide");
		checkoutBtn.style.display = "block";
		cartBody.style.placeItems = "start";
		cartEmptyText.classList.remove("show");
		cartNumber.classList.remove("hidden");
	}
};

// when init must execute to check cart;
isCartEmpty();

addToCart.addEventListener("click", e => {
	if (!e.target.closest("#add-to-cart")) return;
	if (defaultQty === 0) return;
	cartItemAmount += defaultQty;
	const cartNumber = document.querySelector(".nav__cart-number");
	const cartItemQty = document.querySelector(".nav__cart-item-qty-number");
	const cartItemTotalPrice = document.querySelector(".nav__cart-total-price");
	cartNumber.textContent = cartItemAmount;
	cartItemQty.textContent = cartItemAmount;
	cartItemTotalPrice.textContent = `$${cartItemAmount * itemPrice}`;
	isCartEmpty();
});

cartDeleteBtn.addEventListener("click", e => {
	if (!e.target.closest("#cart-delete-btn")) return;
	cartItemAmount = 0;
	isCartEmpty();
});

const overlayImgSlide = e => {
	if (!e.target.closest(".hero__slide-btn")) return;
	const images = document.querySelectorAll(".overlay .hero__gallery-img");
	if (e.target.closest("#overlay-next")) {
		overlayImgIndex++;
		if (overlayImgIndex > images.length - 1) overlayImgIndex = 0;
	}

	if (e.target.closest("#overlay-prev")) {
		overlayImgIndex--;
		if (overlayImgIndex < 0) {
			overlayImgIndex = images.length - 1;
		}
	}

	const mainImg = document.querySelector("#overlay-main-img");
	mainImg.src = `images/image-product-${overlayImgIndex + 1}.jpg`;
	overlayGalleryImages.forEach(item => {
		item.classList.remove("selected");
	});
	overlayGalleryImages[overlayImgIndex].classList.add("selected");
};

overlayNextBtn.addEventListener("click", overlayImgSlide);
overlayPrevBtn.addEventListener("click", overlayImgSlide);

overlayGalleryImages.forEach((img, idx) => {
	img.addEventListener("click", () => {
		overlayMainImg.src = `images/image-product-${idx + 1}.jpg`;
		overlayGalleryImages.forEach(item => item.classList.remove("selected"));
		img.classList.add("selected");
		overlayImgIndex = idx;
	});
});

overlayCloseBtn.addEventListener("click", e => {
	if (!e.target.closest(".overlay__close-btn")) return;
	document.querySelector(".overlay__carousel").classList.remove("open");
});

const toggleOverlay = () => {
	document.querySelector(".overlay__carousel").classList.add("open");
};

const resizeObs = new ResizeObserver(entries => {
	if (entries[0].contentRect.width < 1440) {
		document
			.querySelector(".hero__main-img img")
			.removeEventListener("click", toggleOverlay);
	} else {
		document
			.querySelector(".hero__main-img img")
			.addEventListener("click", toggleOverlay);
	}
});

resizeObs.observe(document.body);
