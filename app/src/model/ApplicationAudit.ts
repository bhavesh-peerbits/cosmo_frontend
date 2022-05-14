import { ApplicationAuditActionTypeApi, ApplicationAuditApi } from 'cosmo-api/src';
import Application, { fromApplicationApi } from '@model/Application';
import User, { fromUserApi } from '@model/User';

interface ApplicationAudit {
	id: number;
	application: Application;
	userWhoChanged: User;
	action: ApplicationAuditActionTypeApi;
	field: string;
	change: string;
	date: Date;
	objectModified: string;
}

export const fromApplicationAuditApi = (
	applicationAudit: ApplicationAuditApi
): ApplicationAudit => ({
	id: applicationAudit.id,
	application: fromApplicationApi(applicationAudit.application),
	userWhoChanged: fromUserApi(applicationAudit.userWhoModified),
	action: applicationAudit.auditActionTypes,
	change: applicationAudit.change,
	field: applicationAudit.fieldModified,
	date: new Date(applicationAudit.modifyDate),
	objectModified: applicationAudit.objectModified
});

export default ApplicationAudit;
