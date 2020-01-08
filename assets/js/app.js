!function () {

	// Find Plugin button
	// =========================================================================

	document.getElementById('findPlugin').addEventListener('click', e => {
		e.preventDefault();
		window.scrollTo(0, 0);
		setTimeout(() => {
			document.querySelector('[type=search]').focus();
		}, 500);
	});

}();
