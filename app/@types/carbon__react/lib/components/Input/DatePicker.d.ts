import { ReactNode } from 'react';
import { FCReturn, ReactInputAttr } from '../../../typings/shared';

interface DatePickerProps extends Omit<ReactInputAttr, 'value' | 'onChange'> {
	/**
	 * flatpickr prop passthrough. Allows the user to enter a date directly
	 * into the input field
	 */
	allowInput?: boolean;

	/**
	 * The DOM element the Flatpicker should be inserted into. `<body>` by default.
	 */
	appendTo?: object;

	/**
	 * The child nodes.
	 */
	children?: ReactNode;

	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * The date format.
	 */
	dateFormat?: string;

	/**
	 * The type of the date picker:
	 *
	 * * `simple` - Without calendar dropdown.
	 * * `single` - With calendar dropdown and single date.
	 * * `range` - With calendar dropdown and a date range.
	 */
	datePickerType?: 'simple' | 'single' | 'range';

	/**
	 * The flatpickr `disable` option that allows a user to disable certain dates.
	 */
	disable?: Array<string>;

	/**
	 * The flatpickr `enable` option that allows a user to enable certain dates.
	 */
	enable?: Array<string>;

	/**
	 * `true` to use the light version.
	 */
	light?: boolean;

	/**
	 *  The language locale used to format the days of the week, months, and numbers. The full list of supported locales can be found here https://github.com/flatpickr/flatpickr/tree/master/src/l10n
	 */
	locale?:
		| object
		| 'ar' // Arabic
		| 'at' // Austria
		| 'az' // Azerbaijan
		| 'be' // Belarusian
		| 'bg' // Bulgarian
		| 'bn' // Bangla
		| 'bs' // Bosnia
		| 'cat' // Catalan
		| 'cs' // Czech
		| 'cy' // Welsh
		| 'da' // Danish
		| 'de' // German
		| 'en' // English
		| 'eo' // Esperanto
		| 'es' // Spanish
		| 'et' // Estonian
		| 'fa' // Persian
		| 'fi' // Finnish
		| 'fo' // Faroese
		| 'fr' // French
		| 'ga' // Gaelic
		| 'gr' // Greek
		| 'he' // Hebrew
		| 'hi' // Hindi
		| 'hr' // Croatian
		| 'hu' // Hungarian
		| 'id' // Indonesian
		| 'is' // Icelandic
		| 'it' // Italian
		| 'ja' // Japanese
		| 'ka' // Georgian
		| 'km' // Khmer
		| 'ko' // Korean
		| 'kz' // Kazakh
		| 'lt' // Lithuanian
		| 'lv' // Latvian
		| 'mk' // Macedonian
		| 'mn' // Mongolian
		| 'ms' // Malaysian
		| 'my' // Burmese
		| 'nl' // Dutch
		| 'no' // Norwegian
		| 'pa' // Punjabi
		| 'pl' // Polish
		| 'pt' // Portuguese
		| 'ro' // Romanian
		| 'ru' // Russian
		| 'si' // Sinhala
		| 'sk' // Slovak
		| 'sl' // Slovenian
		| 'sq' // Albanian
		| 'sr' // Serbian
		| 'sv' // Swedish
		| 'th' // Thai
		| 'tr' // Turkish
		| 'uk' // Ukrainian
		| 'uz' // Uzbek
		| 'uz_latn' // Uzbek Latin
		| 'vn' // Vietnamese
		| 'zh_tw' // Mandarin Traditional
		| 'zh'; // Mandarin

	/**
	 * The maximum date that a user can pick to.
	 */
	maxDate?: string | Date;

	/**
	 * The minimum date that a user can start picking from.
	 */
	minDate?: string | Date;

	/**
	 * The `change` event handler.
	 */
	onChange?: (dates: Date[]) => void;

	/**
	 * The `close` event handler.
	 */
	onClose?: () => void;

	/**
	 * The `open` event handler.
	 */
	onOpen?: () => void;

	/**
	 * `true` to use the short version.
	 */
	short?: boolean;

	/**
	 * The value of the date value provided to flatpickr, could
	 * be a date, a date number, a date string, an array of dates.
	 */
	value?: string | Array<string | number | object> | object | number | null;
}

declare const DatePicker: FCReturn<DatePickerProps>;

export default DatePicker;
