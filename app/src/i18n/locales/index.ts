/* eslint-disable prettier/prettier */
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
import {
	applicationInstancesEn,
	applicationInstancesFr,
	applicationInstancesIt
} from '@i18n/locales/components/application-instances';
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
import {
	changeMonitoringEn,
	changeMonitoringFr,
	changeMonitoringIt
} from './pages/change-monitoring';
import {
	monitoringDashboardEn,
	monitoringDashboardFr,
	monitoringDashboardIt
} from './pages/monitoring-dashboard';
import { runDetailsEn, runDetailsFr, runDetailsIt } from './pages/run-details';
import { testEn, testIt } from './pages/test';
import {
	errorBoundaryEn,
	errorBoundaryFr,
	errorBoundaryIt
} from './components/error-boundary';
import { uploaders3En, uploaders3Fr, uploaders3It } from './components/uploaders3';
import {
	documentationAdminEn,
	documentationAdminFr,
	documentationAdminIt
} from './components/documentation-admin';

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
		applicationInstances: applicationInstancesEn,
		procedureInfo: procedureInfoEn,
		modals: modalsEn,
		changeMonitoring: changeMonitoringEn,
		monitoringDashboard: monitoringDashboardEn,
		runDetails: runDetailsEn,
		uploaderS3: uploaders3En,
		documentationAdmin: documentationAdminEn
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
		applicationInstances: applicationInstancesIt,
		procedureInfo: procedureInfoIt,
		modals: modalsIt,
		changeMonitoring: changeMonitoringIt,
		monitoringDashboard: monitoringDashboardIt,
		runDetails: runDetailsIt,
		uploaderS3: uploaders3It,
		documentationAdmin: documentationAdminIt
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
		applicationInstances: applicationInstancesFr,
		procedureInfo: procedureInfoFr,
		modals: modalsFr,
		changeMonitoring: changeMonitoringFr,
		monitoringDashboard: monitoringDashboardFr,
		runDetails: runDetailsFr,
		uploaderS3: uploaders3Fr,
		documentationAdmin: documentationAdminFr
	}
} as const;
