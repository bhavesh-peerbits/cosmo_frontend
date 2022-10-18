import useGetUsersByRole from '@api/user/useGetUsersByRole';
import { Grid, Column } from '@carbon/react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import ApplicationStepRequest from '@model/ApplicationStepRequest';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import User from '@model/User';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UsersSelectionFormData {
	focalPoint: User;
	delegates: User[];
	approvers: User[];
}
type UsersSelectionFormProps = {
	step: EvidenceRequestStep;
	appStepRequest: ApplicationStepRequest;
	setIsCompleted: Dispatch<SetStateAction<{ [id: string]: boolean } | undefined>>;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};

const UsersSelectionForm = ({
	step,
	appStepRequest,
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
				if (req.application?.id === appStepRequest.application.id) {
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
		getValues,
		setRequestDraft,
		step.id,
		delegates,
		approvers,
		reviewer,
		appStepRequest.application.id
	]);

	useEffect(() => {
		setIsCompleted(old => ({
			...old,
			[`${step.id}-${appStepRequest.application.id}`]: isValid
		}));
	}, [appStepRequest.application.id, isValid, setIsCompleted, step.id]);
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
					key={`reviewer-${step.id}-${appStepRequest.application.id}`}
					defaultValue={
						appStepRequest.steps.find(
							stepRequest => stepRequest.stepOrder === step.stepOrder
						)?.reviewer
					}
				/>
			</Column>
			<Column sm={4} md={4} lg={8} className='mb-5'>
				<MultipleUserSelect
					control={control}
					label={t('focal-point-delegates')}
					name='delegates'
					level={2}
					defaultValue={
						appStepRequest.steps.find(
							stepRequest => stepRequest.stepOrder === step.stepOrder
						)?.delegates
					}
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('FOCAL_POINT');
					}}
					key={`delegates-${step.id}-${appStepRequest.application.id}`}
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
					defaultValue={
						appStepRequest.steps.find(
							stepRequest => stepRequest.stepOrder === step.stepOrder
						)?.approvers
					}
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('WORKFLOW_APPROVER');
					}}
					key={`approvers-${step.id}-${appStepRequest.application.id}`}
				/>
			</Column>
		</Grid>
	);
};

export default UsersSelectionForm;
