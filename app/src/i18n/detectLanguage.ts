export default function detectLanguage() {
	const [ln, r] = navigator.language.split('-');
	const region = (r || ln).toUpperCase();
	return `${ln}_${region}`;
}
