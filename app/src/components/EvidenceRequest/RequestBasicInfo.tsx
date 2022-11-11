import FullWidthColumn from '@components/FullWidthColumn';
import { TextInput, Select, SelectItem, Grid } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useGetAllUniqueEvidenceNames from '@api/evidence-request/useGetAllUniqueEvidenceNames';
import useGetNewDraftParameter from '@api/evidence-request/useGetNewDraftParameter';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface CreateRequestForm {
	requestName: string;
	workflow: string;
	requestType: string;
	phaseTypeId: string;
}

type RequestBasicInfoProps = {
	register: UseFormRegister<CreateRequestForm>;
	errors: FieldErrors<CreateRequestForm>;
};

const RequestBasicInfo = ({ errors, register }: RequestBasicInfoProps) => {
	const { t } = useTranslation(['evidenceRequest', 'applicationInfo']);
	const { data: parameters } = useGetNewDraftParameter();
	const { data: requestNames } = useGetAllUniqueEvidenceNames();
	return (
		<Grid fullWidth className='space-y-7'>
			<FullWidthColumn>
				<TextInput
					id='request-name'
					labelText={t('evidenceRequest:request-name')}
					placeholder={t('evidenceRequest:request-name')}
					invalidText={errors.requestName?.message}
					invalid={Boolean(errors.requestName)}
					{...register('requestName', {
						validate: name =>
							!requestNames
								?.map(existingName => existingName.toLowerCase())
								.includes(name.toLowerCase()) || t('applicationInfo:name-exists')
					})}
				/>
			</FullWidthColumn>
			<FullWidthColumn>
				<Select
					id='workflow-types'
					labelText={`${t('evidenceRequest:workflow-type')} *`}
					{...register('workflow', {
						required: true
					})}
				>
					{parameters?.workflowName.map(workflowName => (
						<SelectItem text={workflowName} value={workflowName} key={workflowName} />
					))}
				</Select>
			</FullWidthColumn>
			<FullWidthColumn>
				<Select
					id='request-types'
					labelText={`${t('evidenceRequest:request-type')} *`}
					{...register('requestType', {
						required: true
					})}
				>
					{parameters?.requestType.map(type => (
						<SelectItem text={type} value={type} key={type} />
					))}
				</Select>
			</FullWidthColumn>
			<FullWidthColumn>
				<Select
					id='phase-types'
					labelText={`${t('evidenceRequest:phase-type')}`}
					{...register('phaseTypeId')}
				>
					{parameters?.phaseType?.map(phaseType => (
						<SelectItem
							text={phaseType.name || ''}
							value={phaseType.id}
							key={phaseType.id}
						/>
					))}
				</Select>
			</FullWidthColumn>
		</Grid>
	);
};
export default RequestBasicInfo;
