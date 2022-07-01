const removeLoadingScreen = () => {
	const removeLoading = () => {
		const ele = document.getElementById('app-loading');
		if (ele && !ele.classList.contains('available')) {
			// fade out
			ele.classList.add('available');
			setTimeout(() => {
				// remove from DOM
				ele.outerHTML = '';
			}, 2000);
		}
	};

	const showErrorDuringLoading = () => {
		const ele = document.getElementById('app-loading');
		if (ele) {
			ele.classList.remove('available');
			ele.classList.add('error');
		}
	};

	return { removeLoading, showErrorDuringLoading };
};

export default removeLoadingScreen;
