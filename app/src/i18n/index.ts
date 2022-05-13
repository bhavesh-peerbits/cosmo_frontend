import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import { format as formatDateFn, formatDistance, formatRelative, isDate } from 'date-fns';
import { languages, locales } from '@i18n/languageOptions';
import messages from './locales';

if (import.meta.env.DEV) {
	i18n.use(i18nextPlugin);
}

const lng = () => {
	const uiItem = localStorage.getItem('UI_PREF');
	const lang = JSON.parse(uiItem ?? '{}')?.language;
	return languages.find(i => i === lang) ?? ('en_US' as const);
};

export const formatDate = (value: Date, format = 'Pp', language = lng()) => {
	const locale = locales[language];

	if (format === 'short') return formatDateFn(value, 'P', { locale });
	if (format === 'long') return formatDateFn(value, 'PPPP', { locale });
	if (format === 'relative') return formatRelative(value, new Date(), { locale });
	if (format === 'ago')
		return formatDistance(value, new Date(), {
			locale,
			addSuffix: true
		});

	return formatDateFn(value, format, { locale });
};

i18n
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		supportedLngs: languages,
		fallbackLng: 'en_US',
		interpolation: {
			format: (value, format, lang) => {
				if (isDate(value)) {
					return formatDate(value, format, lang as typeof languages[number]);
				}
				return value;
			},
			escapeValue: false // not needed for react as it escapes by default
		},
		lng: lng(),
		resources: messages
	});

export default i18n;
