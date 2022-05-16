import { enUS, fr, it } from 'date-fns/locale'; // import all locales we need
import { Locale } from 'date-fns';

export const languageOptions = [
	{
		label: 'English (US)',
		value: 'en_US',
		locale: enUS
	},
	{
		label: 'Français (France)',
		value: 'fr_FR',
		locale: fr
	},
	{
		label: 'Italiano (Italia)',
		value: 'it_IT',
		locale: it
	}
] as const;
export const languages = languageOptions.map(i => i.value);
export const locales = languageOptions.reduce(
	(acc, i) => ({
		...acc,
		[i.value]: i.locale
	}),
	{} as Record<typeof languages[number], Locale>
);
