import { loginEn, loginFr, loginIt } from '@i18n/locales/pages/login';
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
		login: loginEn
	},
	it_IT: {
		home: homeIt,
		test: testIt,
		errorBoundary: errorBoundaryIt,
		login: loginIt
	},
	fr_FR: {
		errorBoundary: errorBoundaryFr,
		login: loginFr
	}
} as const;
