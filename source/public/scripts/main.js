/* global bootstrap */ // Tell ESLint to ignore undefined `bootstrap`.
// main.js

// Page Initialization
window.addEventListener('DOMContentLoaded', async function () {
	if (window.location.protocol === 'https:') {
		// initializeServiceWorker();
	}

	// Initialize front-end
	initializeTooltips();
	initializeDrawer();
});

/**
 * PWA/SPA ABANDONED:
 * Detects if there's a service worker, then loads it and begins the process
 * of installing it and getting it running.
 */
// eslint-disable-next-line no-unused-vars
function initializeServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('service-worker.js').then(
				function (registration) {
					// Registration was successful
					console.log('ServiceWorker registration successful with scope: ', registration.scope);
				},
				function (err) {
					// Registration failed
					console.log('ServiceWorker registration failed: ', err);
				}
			);
		});
	}
}

/**
 * Initialize tooltips.
 */
function initializeTooltips() {
	const tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"], #editBtn, #deleteBtn')
	);

	// Sidebar tooltips should default right
	// TODO: Add collapseBtn id to replace current #drawer usage
	const sidebarTooltipTriggerList = [].slice.call(
		document.querySelectorAll('#sidebar [data-bs-toggle="tooltip"], #drawer [data-bs-toggle="tooltip"], #expandBtn')
	);
	sidebarTooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl, {
			placement: 'right',
		});
	});

	// Other tooltips
	const otherTooltipTriggerList = tooltipTriggerList.filter(
		(element) => !sidebarTooltipTriggerList.includes(element)
	);
	otherTooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
}

/**
 * Toggle expand button visibility based on drawer visibility.
 */
function initializeDrawer() {
	const drawerOffcanvas = document.getElementById('drawer');
	const expandBtn = document.getElementById('expandBtn');

	// Upon hiding drawer, show expand button
	drawerOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
		expandBtn.classList.remove('invisible');
		drawerOffcanvas.classList.remove('position-static');
	});

	// Upon showing drawer, hide expand button
	drawerOffcanvas.addEventListener('show.bs.offcanvas', function () {
		drawerOffcanvas.classList.add('position-static');
		expandBtn.classList.add('invisible');
	});
}
