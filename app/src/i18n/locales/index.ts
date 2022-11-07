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
	applicationSelectEn,
	applicationSelectFr,
	applicationSelectIt
} from './components/application-select';
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
import {
	userRevalidationEn,
	userRevalidationFr,
	userRevalidationIt
} from './pages/user-revalidation';
import {
	evidenceRequestEn,
	evidenceRequestFr,
	evidenceRequestIt
} from './pages/evidence-request';
import { testEn, testIt } from './pages/test';
import {
	errorBoundaryEn,
	errorBoundaryFr,
	errorBoundaryIt
} from './components/error-boundary';
import { uploaders3En, uploaders3Fr, uploaders3It } from './components/uploaders3';

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
		userRevalidation: userRevalidationEn,
		evidenceRequest: evidenceRequestEn,
		changes: changesEn,
		userAdmin: userAdminEn,
		userSelect: userSelectEn,
		applicationSelect: applicationSelectEn,
		tiptapEditor: tiptapEditorEn,
		table: tableEn,
		applicationInfo: applicationInfoEn,
		procedureInfo: procedureInfoEn,
		modals: modalsEn,
		uploaderS3: uploaders3En
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
		userRevalidation: userRevalidationIt,
		evidenceRequest: evidenceRequestIt,
		changes: changesIt,
		userAdmin: userAdminIt,
		userSelect: userSelectIt,
		applicationSelect: applicationSelectIt,
		tiptapEditor: tiptapEditorIt,
		table: tableIt,
		applicationInfo: applicationInfoIt,
		procedureInfo: procedureInfoIt,
		modals: modalsIt,
		uploaderS3: uploaders3It
	},
	fr_FR: {
		home: homeFr,
		errorBoundary: errorBoundaryFr,
		login: loginFr,
		httpError: httpErrorFr,
		management: managementFr,
		narrativeAdmin: narrativeAdminFr,
		reviewNarrative: reviewNarrativeFr,
		userRevalidation: userRevalidationFr,
		evidenceRequest: evidenceRequestFr,
		changes: changesFr,
		userAdmin: userAdminFr,
		userSelect: userSelectFr,
		applicationSelect: applicationSelectFr,
		tiptapEditor: tiptapEditorFr,
		table: tableFr,
		applicationInfo: applicationInfoFr,
		procedureInfo: procedureInfoFr,
		modals: modalsFr,
		uploaderS3: uploaders3Fr
	}
} as const;
