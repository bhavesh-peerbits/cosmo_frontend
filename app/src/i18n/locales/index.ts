import { loginEn, loginFr, loginIt } from '@i18n/locales/pages/login';
import {
	httpErrorEn,
	httpErrorFr,
	httpErrorIt
} from '@i18n/locales/components/http-error';
import {
	procedureInfoEn,
	procedureInfoFr,
	procedureInfoIt
} from '@i18n/locales/components/procedure-info';
import { managementEn, managementFr, managementIt } from '@i18n/locales/pages/management';
import { tableEn, tableFr, tableIt } from '@i18n/locales/components/table';
import {
	applicationInfoEn,
	applicationInfoFr,
	applicationInfoIt
} from '@i18n/locales/components/application-info';
import { modalsEn, modalsFr, modalsIt } from '@i18n/locales/components/modals';
import {
	reviewNarrativeEn,
	reviewNarrativeFr,
	reviewNarrativeIt
} from './pages/reviewNarrative';

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
		management: managementEn,
		reviewNarrative: reviewNarrativeEn,
		table: tableEn,
		applicationInfo: applicationInfoEn,
		procedureInfo: procedureInfoEn,
		modals: modalsEn
	},
	it_IT: {
		home: homeIt,
		test: testIt,
		errorBoundary: errorBoundaryIt,
		login: loginIt,
		httpError: httpErrorIt,
		management: managementIt,
		reviewNarrative: reviewNarrativeIt,
		table: tableIt,
		applicationInfo: applicationInfoIt,
		procedureInfo: procedureInfoIt,
		modals: modalsIt
	},
	fr_FR: {
		errorBoundary: errorBoundaryFr,
		login: loginFr,
		httpError: httpErrorFr,
		management: managementFr,
		reviewNarrative: reviewNarrativeFr,
		table: tableFr,
		applicationInfo: applicationInfoFr,
		procedureInfo: procedureInfoFr,
		modals: modalsFr
	}
} as const;
