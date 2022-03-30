import { homeEn, homeIt } from './pages/home';
import { testEn, testIt } from './pages/test';
import {
	errorBoundaryEn,
	errorBoundaryIt,
	errorBoundaryFr
} from './components/error-boundary';

export default {
	en: {
		home: homeEn,
		test: testEn,
		errorBoundary: errorBoundaryEn
	},
	it: {
		home: homeIt,
		test: testIt,
		errorBoundary: errorBoundaryIt
	},
	fr: {
		errorBoundary: errorBoundaryFr
	}
} as const;
