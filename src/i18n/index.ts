/* eslint-disable @typescript-eslint/ban-ts-comment */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// @ts-ignore
// import { messages } from 'vite-i18n-resources';
import { i18nextPlugin } from 'translation-check';
import messages from './locales';

if (import.meta.env.DEV) {
	i18n.use(i18nextPlugin);
}

i18n
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		},
		resources: messages
	});

export default i18n;
