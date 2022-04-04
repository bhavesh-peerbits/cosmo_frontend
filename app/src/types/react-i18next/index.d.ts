import 'react-i18next';
import messages from '@i18n/locales';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		resources: typeof messages['en_US'];
	}
}
