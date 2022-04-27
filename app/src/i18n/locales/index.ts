import { loginEn, loginFr, loginIt } from '@i18n/locales/pages/login';
import {
	httpErrorEn,
	httpErrorFr,
	httpErrorIt
} from '@i18n/locales/components/http-error';
import { managementEn, managementFr, managementIt } from '@i18n/locales/pages/management';
import { homeEn, homeIt } from './pages/home';
import { testEn, testIt } from './pages/test';
import {
	errorBoundaryEn,
	errorBoundaryFr,
	errorBoundaryIt
} from './components/error-boundary';

export default {
	en_US: {
		home: homeEn,
		test: testEn,
		errorBoundary: errorBoundaryEn,
		login: loginEn,
		httpError: httpErrorEn,
		management: managementEn
	},
	it_IT: {
		home: homeIt,
		test: testIt,
		errorBoundary: errorBoundaryIt,
		login: loginIt,
		httpError: httpErrorIt,
		management: managementIt
	},
	fr_FR: {
		errorBoundary: errorBoundaryFr,
		login: loginFr,
		httpError: httpErrorFr,
		management: managementFr
	}
} as const;
