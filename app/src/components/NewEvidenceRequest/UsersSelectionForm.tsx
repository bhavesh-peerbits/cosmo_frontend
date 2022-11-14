/* eslint-disable no-nested-ternary */
import useGetUsersByRole from '@api/user/useGetUsersByRole';
import { Grid, Column, RadioButtonGroup, RadioButton } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import UserProfileImage from '@components/UserProfileImage';
import ApplicationStepRequest from '@model/ApplicationStepRequest';
import Association from '@model/Association';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import User from '@model/User';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';

interface UsersSelectionFormData {
	focalPoint: User;
	delegates: User[];
	approvers: User[];
}
type UsersSelectionFormProps = {
	step: EvidenceRequestStep;
	appStepRequest: ApplicationStepRequest;
	setIsCompleted: Dispatch<SetStateAction<{ [id: string]: boolean } | undefined>>;
	associations?: Association[];
};

const UsersSelectionForm = ({
	step,
	appStepRequest,
	setIsCompleted,
	associations
}: UsersSelectionFormProps) => {
	const { t } = useTranslation('evidenceRequest');
	const setRequestDraft = useSetRecoilState(evidenceRequestDraftStore);

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
	const [radio, setRadio] = useState('');

	useEffect(() => {
		setRequestDraft(old => ({
			...old,
			requests: old.requests?.map(req => {
				if (req.application?.id === appStepRequest.application.id) {
					return {
						...req,
						steps: req.steps?.map(el => {
							if (el.stepOrder === step.stepOrder) {
								return {
									...el,
									delegates:
										radio === 'other'
											? delegates
											: associations?.filter(ass => ass.id === radio)[0]
											? associations?.filter(ass => ass.id === radio)[0].delegates
											: delegates,
									approvers,
									reviewer:
										radio === 'other'
											? reviewer
											: associations?.filter(ass => ass.id === radio)[0]
											? associations?.filter(ass => ass.id === radio)[0].reviewer
											: reviewer
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
		step.stepOrder,
		delegates,
		approvers,
		reviewer,
		appStepRequest.application.id,
		radio,
		associations
	]);

	useEffect(() => {
		setIsCompleted(old => ({
			...old,
			[`step${step.stepOrder}-${appStepRequest.application.id}`]:
				isValid || !!(radio !== 'other' && radio)
		}));
	}, [appStepRequest.application.id, isValid, radio, setIsCompleted, step.stepOrder]);
	return (
		<Grid fullWidth>
			{step.type === 'UPLOAD' && associations && (
				<Column sm={4} md={8} lg={16} className='mb-5 space-y-5'>
					<span className='text-text-secondary'>{t('select-user-group')}.</span>
					<RadioButtonGroup
						orientation='vertical'
						name={step.id}
						onChange={value => setRadio(`${value}`)}
					>
						{associations.map(association => (
							<RadioButton
								labelText={
									<div className='mt-1 flex flex-row '>
										<span className='flex flex-row space-x-3'>
											<span className='text-heading-1'>{`Focal Point : `}</span>

											<UserProfileImage
												initials={association.reviewer?.displayName}
												imageDescription={association.reviewer?.username}
												size='md'
											/>

											<span>{`${association.reviewer?.displayName}`}</span>
										</span>
										<span className='mx-7 text-heading-1'>{`${t(
											'focal-point-delegates'
										)} : `}</span>
										{association.delegates?.length ? (
											association.delegates?.map(delegate => (
												<UserProfileImage
													initials={delegate.displayName}
													imageDescription={delegate.username}
													tooltipText={delegate.displayName}
													size='md'
													className='mx-[-3px]'
												/>
											))
										) : (
											<span className='italic text-text-secondary'>
												{t('no-delegates')}
											</span>
										)}
									</div>
								}
								value={association.id}
								key={association.id}
							/>
						))}
						<RadioButton
							labelText={<span className='text-heading-1'>{t('other')}</span>}
							value='other'
						/>
					</RadioButtonGroup>
					<div className='flex space-x-5'>
						<SingleUserSelect
							control={control}
							label='Focal Point *'
							name='focalPoint'
							level={2}
							rules={{
								required: true
							}}
							getUserFn={() => {
								// eslint-disable-next-line react-hooks/rules-of-hooks
								return useGetUsersByRole('FOCAL_POINT');
							}}
							key={`reviewer-step${step.stepOrder}-${appStepRequest.application.id}`}
							defaultValue={
								appStepRequest.steps.find(
									stepRequest => stepRequest.stepOrder === step.stepOrder
								)?.reviewer
							}
							readOnly={radio !== 'other'}
						/>
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
							key={`delegates-step${step.stepOrder}-${appStepRequest.application.id}`}
							readOnly={radio !== 'other'}
						/>
					</div>
				</Column>
			)}
			{step.type === 'UPLOAD' && !associations && (
				<>
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
							key={`reviewer-step${step.stepOrder}-${appStepRequest.application.id}`}
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
							key={`delegates-step${step.stepOrder}-${appStepRequest.application.id}`}
						/>
					</Column>
				</>
			)}
			{step.type === 'APPROVAL' && (
				<FullWidthColumn>
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
						key={`approvers-step${step.stepOrder}-${appStepRequest.application.id}`}
					/>
				</FullWidthColumn>
			)}
		</Grid>
	);
};

export default UsersSelectionForm;
