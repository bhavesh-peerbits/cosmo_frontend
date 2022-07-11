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
import { changesEn, changesFr, changesIt } from '@i18n/locales/components/changes';
import {
	tiptapEditorEn,
	tiptapEditorFr,
	tiptapEditorIt
} from '@i18n/locales/components/tiptap-editor';
import {
	narrativeAdminEn,
	narrativeAdminFr,
	narrativeAdminIt
} from './components/narrative-admin';
import { userAdminEn, userAdminFr, userAdminIt } from './components/user-admin';
import { userSelectEn, userSelectFr, userSelectIt } from './components/user-select';
import {
	reviewNarrativeEn,
	reviewNarrativeFr,
	reviewNarrativeIt
} from './pages/reviewNarrative';
import { homeEn, homeIt, homeFr } from './pages/home';
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
		narrativeAdmin: narrativeAdminEn,
		reviewNarrative: reviewNarrativeEn,
		changes: changesEn,
		userAdmin: userAdminEn,
		userSelect: userSelectEn,
		tiptapEditor: tiptapEditorEn,
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
		narrativeAdmin: narrativeAdminIt,
		reviewNarrative: reviewNarrativeIt,
		changes: changesIt,
		userAdmin: userAdminIt,
		userSelect: userSelectIt,
		tiptapEditor: tiptapEditorIt,
		table: tableIt,
		applicationInfo: applicationInfoIt,
		procedureInfo: procedureInfoIt,
		modals: modalsIt
	},
	fr_FR: {
		home: homeFr,
		errorBoundary: errorBoundaryFr,
		login: loginFr,
		httpError: httpErrorFr,
		management: managementFr,
		narrativeAdmin: narrativeAdminFr,
		reviewNarrative: reviewNarrativeFr,
		changes: changesFr,
		userAdmin: userAdminFr,
		userSelect: userSelectFr,
		tiptapEditor: tiptapEditorFr,
		table: tableFr,
		applicationInfo: applicationInfoFr,
		procedureInfo: procedureInfoFr,
		modals: modalsFr
	}
} as const;
