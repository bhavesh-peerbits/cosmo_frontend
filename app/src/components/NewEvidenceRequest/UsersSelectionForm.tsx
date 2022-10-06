import { Grid, Column } from '@carbon/react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import User from '@model/User';
import Application from 'model/Application';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UsersSelectionFormData {
	focalPoint: User;
	referentsDelegates: User[];
	approvers: User[];
}
type UsersSelectionFormProps = {
	application: Application;
	step: EvidenceRequestStep;
	setIsCompleted: Dispatch<SetStateAction<{ [id: string]: boolean } | undefined>>;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UsersSelectionForm = ({
	application,
	step,
	setIsCompleted,
	setRequestDraft
}: UsersSelectionFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const { control, getValues, watch } = useForm<UsersSelectionFormData>({
		mode: 'onChange'
	});
	const delegates = watch('referentsDelegates');
	useEffect(() => {
		setRequestDraft(old => ({
			...old,
			requests: old.requests?.map(req => {
				if (req.application?.id === application.id) {
					return {
						...req,
						steps: req.steps?.map(el => {
							if (el.type === step.type) {
								return {
									...el,
									delegates: getValues('referentsDelegates'),
									approver: getValues('approvers'),
									reviewer: getValues('focalPoint')
								};
							}
							return el;
						})
					};
				}
				return req;
			})
		}));
	}, [application.id, getValues, setRequestDraft, step.type, delegates]);

	useEffect(() => {
		setIsCompleted(old => ({ ...old, step: true }));
	});

	return (
		<Grid fullWidth>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<SingleUserSelect
					control={control}
					label='Focal Point'
					name='focalPoint'
					level={2}
					rules={{
						required: true
					}}
				/>
			</Column>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<MultipleUserSelect
					control={control}
					label={t('focal-point-delegates')}
					name='referentsDelegates'
					level={2}
					rules={{
						required: true
					}}
				/>
			</Column>
			<Column sm={4} md={4} lg={8}>
				<MultipleUserSelect
					control={control}
					label={t('approvers')}
					name='approvers'
					level={2}
					rules={{
						required: true
					}}
				/>
			</Column>
		</Grid>
	);
};

export default UsersSelectionForm;
