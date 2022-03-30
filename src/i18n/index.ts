import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import messages from './locales';

export const languageOptions = [
	{
		label: 'English (US)',
		value: 'en_US'
	},
	{
		label: 'Français (France)',
		value: 'fr_FR'
	},
	{
		label: 'Italiano (Italia)',
		value: 'it_IT'
	}
] as const;
export const languages = languageOptions.map(i => i.value);

if (import.meta.env.DEV) {
	i18n.use(i18nextPlugin);
}
const uiItem = localStorage.getItem('UI_PREF');
const lang = JSON.parse(uiItem ?? '{}')?.language;
const lng = languages.find(i => i === lang) ?? ('en_US' as const);

i18n
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		supportedLngs: languages,
		fallbackLng: 'en_US',
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		},
		lng,
		resources: messages
	});

export default i18n;
