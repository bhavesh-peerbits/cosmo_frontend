import useUiStore from '@hooks/useUiStore';
import { locales } from '@i18n/languageOptions';
import { ComponentProps } from 'react';
import { DatePicker } from '@carbon/react';

type LocaleCode = ComponentProps<typeof DatePicker>['locale'];

const useGetDateFormat = () => {
	const { language } = useUiStore();
	const currentLocale = locales[language] || locales.en_US;

	const locale = locales[language] || locales.en_US;
	const dateFormatLocale = locale?.formatLong?.date({ width: 'short' })?.toLowerCase();
	const d = (dateFormatLocale as string).indexOf('d');
	const m = (dateFormatLocale as string).indexOf('m');
	const y = (dateFormatLocale as string).indexOf('y');
	const ord = [
		{ value: d, format: 'd', placeholder: 'dd' },
		{ value: m, format: 'm', placeholder: 'mm' },
		{ value: y, format: 'Y', placeholder: 'yyyy' }
	].sort((a, b) => a.value - b.value);
	const f = ord.map(({ format }) => format).join('/');
	const p = ord.map(({ placeholder }) => placeholder).join('/');

	return {
		format: f,
		locale: currentLocale,
		localeCode:
			currentLocale.code === 'en-US' ? 'en' : (currentLocale.code as LocaleCode),
		placeholder: p
	};
};

export default useGetDateFormat;
