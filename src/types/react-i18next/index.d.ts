import 'react-i18next';
import { TranslateType as HomeTr } from '@i18n/locales/pages/home';
import { TranslateType as TestTr } from '@i18n/locales/pages/test';

declare module 'react-i18next' {
	export type LocaleResources = {
		home: HomeTr;
		test: TestTr;
	};
	interface CustomTypeOptions {
		resources: LocaleResources;
	}
}
