function ready () {

	// Find Plugin button
	// =========================================================================

	document.getElementById('findPlugin').addEventListener('click', e => {
		e.preventDefault();
		if (window.pageYOffset === 0) {
			document.querySelector('[type=search]').focus();
		} else {
			window.scrollTo(0, 0);
			setTimeout(() => {
				document.querySelector('[type=search]').focus();
			}, 500);
		}
	});

	// Search
	// =========================================================================

	const search = document.getElementById('search');
	if (search) {
		const input = search.querySelector('input');
		const results = search.querySelectorAll('ul li');

		let hasResults = false,
			hasMouse = false,
			hasFocus = false,
			userValue = '',
			activeItem = null;

		// TODO: Add arrow key support

		const doOpen = () => {
			if ((hasFocus || hasMouse) && hasResults) search.classList.add('open');
			else search.classList.remove('open');
		};

		const doSearch = e => {
			userValue = e.target.value;
			const v = userValue.trim();

			hasResults = false;

			if (!v) {
				search.classList.remove('open');
				return;
			}

			for (let i = 0, l = results.length; i < l; i++) {
				const result = results[i];

				if (
					fuzzy(v, result.dataset.name) ||
					fuzzy(v, result.dataset.handle) ||
					fuzzy(v, result.dataset.developer)
				) {
					result.classList.remove('hidden');
					hasResults = true;
				} else {
					result.classList.add('hidden');
				}
			}

			if (hasResults) search.classList.add('open');
			else search.classList.remove('open');
		};

		search.addEventListener('mouseenter', () => hasMouse = true);
		search.addEventListener('mouseleave', () => {
			hasMouse = false;
			doOpen();
		});

		input.addEventListener('input', doSearch);
		input.addEventListener('focus', e => {
			hasFocus = true;
			doSearch(e);
		});
		input.addEventListener('blur', () => {
			hasFocus = false;
			doOpen();
		});
		input.addEventListener('keydown', e => {
			if (!hasFocus)
				return;

			if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter')
				return;

			e.preventDefault();

			if (e.key === 'Enter') {
				window.location.href = encodeURI(input.value);
			} else if (hasResults) {
				if (activeItem) {
					activeItem.classList.remove('highlighted');

					if (activeItem.nextElementSibling)
						activeItem = activeItem.nextElementSibling;
					else activeItem = null;
				} else {
					activeItem = search.querySelector('li:not(.hidden)');
				}

				if (activeItem) {
					activeItem.classList.add('highlighted');
					input.value = activeItem.dataset.handle;
				} else {
					input.value = userValue;
				}
			}
		});
	}

	// Charts
	// =========================================================================

	// Past Month
	// -------------------------------------------------------------------------

	const month = document.getElementById('month');
	if (month) {
		const ctx = month.getContext('2d');

		window.Chart.defaults.global.elements.point = {
			...window.Chart.defaults.global.elements.point,
			radius: 5,
			hoverRadius: 5,
			borderWidth: 2,
			hoverBorderWidth: 2,
			backgroundColor: '#fff',
		};

		window.Chart.defaults.global.elements.line = {
			...window.Chart.defaults.global.elements.line,
			fill: false,
			cubicInterpolationMode: 'monotone',
		};

		new window.Chart(ctx, {
			type: 'line',

			data: window.month,

			options: {
				legend: {
					display: false,
				},
				scales: {
					yAxes: [{
						gridLines: {
							color: '#dedede',
							borderDash: [3,3],
							drawBorder: false,
						},
						ticks: {
							fontColor: '#ABABAB',
							padding: 20,
						},
					}],
					xAxes: [{
						gridLines: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							fontColor: '#ABABAB',
							padding: 10,
						},
					}],
				},
				tooltips: {
					mode: 'index',
					intersect: false,

					xPadding: 20,
					yPadding: 16,

					titleFontSize: 14,
					titleFontColor: '#292B2D',
					titleFontFamily: 'Inter',

					bodyFontSize: 14,
					bodyFontColor: '#292B2D',
					bodyFontFamily: 'Inter',

					backgroundColor: '#fff',
					borderColor: '#D8D8D8',
					borderWidth: 1,
				},
			},
		});
	}

}

window.addEventListener('load', ready);

/**
 * ## Fuzzy
 * A tiny and blazing-fast fuzzy search in JavaScript
 *
 * Shamelessly stolen from https://github.com/bevacqua/fuzzysearch
 * (but modified slightly, so it's okay)
 *
 * @param {string} needle - The thing to search for
 * @param {string} haystack - The thing to search in
 * @param {boolean} caseSensitive - Should the search be case sensitive?
 * @return {boolean} - Whether or not we have a match
 */
function fuzzy (needle, haystack, caseSensitive = false) {
	if (typeof haystack === typeof {})
		haystack = JSON.stringify(Object.values(haystack));

	if (!caseSensitive) {
		needle = needle.toLowerCase();
		haystack = haystack.toLowerCase();
	}

	const hlen = haystack.length
		, nlen = needle.length;

	if (nlen > hlen)
		return false;

	if (nlen === hlen)
		return needle === haystack;

	outer: for (let i = 0, j = 0; i < nlen; i++) {
		const nch = needle.charCodeAt(i);

		while (j < hlen)
			if (haystack.charCodeAt(j++) === nch)
				continue outer;

		return false;
	}

	return true;
}
