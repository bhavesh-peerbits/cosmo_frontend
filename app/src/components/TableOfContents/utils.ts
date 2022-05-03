/**
 * Trigger the focus on screen readers, so they can read the target paragraph
 *
 * @param {*} elem Selector to find the item
 */
function triggerFocus(elem: string) {
	const element: HTMLElement | null = document.querySelector(elem);

	const handleFocusOut = (event: FocusEvent) => {
		const focusoutTarget = event.target as Element;
		focusoutTarget?.removeAttribute('tabindex');
	};

	element?.setAttribute('tabindex', '0');
	element?.focus({ preventScroll: true });
	element?.addEventListener('focusout', handleFocusOut, {
		once: true
	});
}

const smoothScroll = (selector: string, offset = 0) => {
	document.getElementById('main')?.scrollTo({
		top:
			(document.querySelector(selector)?.getBoundingClientRect()?.top || 0) -
			offset +
			(document.getElementById('main')?.scrollTop || 0),
		behavior: 'smooth'
	});
};

export { triggerFocus, smoothScroll };
