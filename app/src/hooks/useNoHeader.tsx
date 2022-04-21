const useNoHeader = (header = false) => {
	if (header) {
		document.body.classList.add('fix-height');
	} else {
		document.body.classList.remove('fix-height');
	}
};

export default useNoHeader;
