import useGetUsersByRole from '@api/user/useGetUsersByRole';
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
	delegates: User[];
	approvers: User[];
}
type UsersSelectionFormProps = {
	application: Application;
	step: EvidenceRequestStep;
	setIsCompleted: Dispatch<SetStateAction<{ [id: string]: boolean } | undefined>>;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};

const UsersSelectionForm = ({
	application,
	step,
	setIsCompleted,
	setRequestDraft
}: UsersSelectionFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const {
		control,
		getValues,
		watch,
		formState: { isValid }
	} = useForm<UsersSelectionFormData>({
		mode: 'onChange'
	});
	const delegates = watch('delegates');
	const approvers = watch('approvers');
	const reviewer = watch('focalPoint');
	useEffect(() => {
		setRequestDraft(old => ({
			...old,
			requests: old.requests?.map(req => {
				if (req.application?.id === application.id) {
					return {
						...req,
						steps: req.steps?.map(el => {
							if (el.id === step.id) {
								return {
									...el,
									delegates,
									approvers,
									reviewer
								};
							}
							return el;
						})
					};
				}
				return req;
			})
		}));
	}, [
		application.id,
		getValues,
		setRequestDraft,
		step.id,
		delegates,
		approvers,
		reviewer
	]);

	useEffect(() => {
		setIsCompleted(old => ({ ...old, [`${step.id}-${application.id}`]: isValid }));
	}, [application.id, isValid, setIsCompleted, step.id]);
	return (
		<Grid fullWidth>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<SingleUserSelect
					control={control}
					label='Focal Point *'
					name='focalPoint'
					level={2}
					rules={{
						required: true
					}}
					// TODO Add default value
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('FOCAL_POINT');
					}}
					key={`reviewer-${step.id}-${application.id}`}
				/>
			</Column>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<MultipleUserSelect
					control={control}
					label={t('focal-point-delegates')}
					name='delegates'
					level={2}
					defaultValue={step.delegates}
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('FOCAL_POINT');
					}}
					key={`delegates-${step.id}-${application.id}`}
				/>
			</Column>
			<Column sm={4} md={4} lg={8}>
				<MultipleUserSelect
					control={control}
					label={`${t('approvers')} *`}
					name='approvers'
					level={2}
					rules={{
						required: true
					}}
					defaultValue={step.approvers}
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('WORKFLOW_APPROVER');
					}}
					key={`approvers-${step.id}-${application.id}`}
				/>
			</Column>
		</Grid>
	);
};

export default UsersSelectionForm;
