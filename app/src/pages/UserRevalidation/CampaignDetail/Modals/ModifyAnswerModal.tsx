import useSaveModifiedAnswer from '@api/review-campaign/useSaveModifiedAnswer';
import useGetUsersByRole from '@api/user/useGetUsersByRole';
import { Form, TextArea, TextInput } from '@carbon/react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import User from '@model/common/User';
import modifyAnswerModalInfo from '@store/user-revalidation/modifyAnswerModalInfo';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

type AnswerForm = {
	userToRevalidate: string;
	userDetails: string;
	permissions: string;
	permissionDescription: string;
	risk: string;
	riskDescription: string;
	firefighterID: string;
	delegated: User[];
	revalidationUser: User;
};

const ModifyAnswerModal = () => {
	const [modifyModal, setModifyModal] = useRecoilState(modifyAnswerModalInfo);
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const { mutate, isLoading } = useSaveModifiedAnswer();
	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<AnswerForm>({
		mode: 'onChange',
		defaultValues: {
			userToRevalidate: modifyModal.answer?.userToRevalidate,
			userDetails: modifyModal.answer?.userDetails,
			permissions: modifyModal.answer?.permissions,
			permissionDescription: modifyModal.answer?.permissionDescription,
			risk: modifyModal.answer?.jsonApplicationData?.risk,
			riskDescription: modifyModal.answer?.jsonApplicationData?.riskDescription,
			firefighterID: modifyModal.answer?.firefighterID
		}
	});

	useEffect(() => {
		reset({
			revalidationUser: modifyModal.answer?.revalidationUser,
			delegated: modifyModal.answer?.delegated,
			userToRevalidate: modifyModal.answer?.userToRevalidate,
			userDetails: modifyModal.answer?.userDetails,
			permissions: modifyModal.answer?.permissions,
			permissionDescription: modifyModal.answer?.permissionDescription,
			risk: modifyModal.answer?.jsonApplicationData?.risk,
			firefighterID: modifyModal.answer?.firefighterID,
			riskDescription: modifyModal.answer?.jsonApplicationData?.riskDescription
		});
	}, [modifyModal, reset]);

	const cleanUp = () => {
		setModifyModal({
			open: false,
			answer: undefined,
			campaignType: undefined,
			revId: undefined
		});
		reset();
	};

	const modifyAnswer = (data: AnswerForm) => {
		if (!modifyModal.answer) return;
		const {
			risk,
			riskDescription,
			userToRevalidate,
			userDetails,
			permissions,
			permissionDescription,
			firefighterID,
			delegated,
			revalidationUser
		} = data;
		const answer = {
			...modifyModal.answer,
			userToRevalidate,
			userDetails,
			permissions,
			permissionDescription,
			firefighterID,
			revalidationUser,
			delegated
		};
		answer.jsonApplicationData = { risk, riskDescription };
		mutate(
			{ answer, revId: modifyModal.revId || '' },
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};

	return (
		<TearsheetNarrow
			hasCloseIcon
			title={t('userRevalidation:modify-answer')}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-modify-answer'
				},
				{
					label: t('modals:save'),
					id: 'send-focal-point',
					disabled: !isValid || isLoading,
					onClick: handleSubmit(modifyAnswer)
				}
			]}
			open={modifyModal.open}
			onClose={cleanUp}
		>
			<Form>
				<div className='grid grid-cols-2 gap-5 p-5'>
					<div>
						<SingleUserSelect
							control={control}
							label={t('userRevalidation:revalidators')}
							name='revalidationUser'
							level={1}
							// TODO Add default value
							getUserFn={() => {
								// eslint-disable-next-line react-hooks/rules-of-hooks
								return useGetUsersByRole('FOCAL_POINT');
							}}
							defaultValue={modifyModal.answer?.revalidationUser}
						/>
					</div>
					<div>
						<MultipleUserSelect
							control={control}
							label='Delegates'
							name='delegated'
							level={2}
							defaultValue={modifyModal.answer?.delegated}
							getUserFn={() => {
								// eslint-disable-next-line react-hooks/rules-of-hooks
								return useGetUsersByRole('FOCAL_POINT');
							}}
						/>
					</div>
					<TextInput
						id='userToRevalidate'
						labelText={t('userRevalidation:users-to-revalidate')}
						{...register('userToRevalidate')}
					/>
					<TextInput
						id='userDetails'
						labelText={t('userRevalidation:user-details')}
						{...register('userDetails')}
					/>
					<TextArea
						id='permission'
						labelText={t('userRevalidation:permission')}
						{...register('permissions')}
						className='col-span-2'
					/>
					<TextArea
						id='permissionDescription'
						rows={2}
						labelText={t('userRevalidation:permission-description')}
						className='col-span-2'
						{...register('permissionDescription')}
					/>

					<TextInput
						id='risk'
						labelText={t('userRevalidation:risk')}
						{...register('risk')}
					/>
					<TextInput
						id='firefighter'
						labelText={t('userRevalidation:firefighter')}
						{...register('firefighterID')}
					/>
					<TextArea
						id='riskDescription'
						rows={2}
						labelText={t('userRevalidation:risk-description')}
						className='col-span-2'
						{...register('riskDescription')}
					/>
				</div>
			</Form>
		</TearsheetNarrow>
	);
};
export default ModifyAnswerModal;
