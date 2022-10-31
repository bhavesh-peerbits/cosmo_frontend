import useSaveModifiedAnswer from '@api/review-campaign/useSaveModifiedAnswer';
import {
	Button,
	ComposedModal,
	Form,
	ModalBody,
	ModalFooter,
	ModalHeader,
	TextArea,
	TextInput,
	InlineLoading
} from '@carbon/react';
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
};

const ModifyAnswerModal = () => {
	const [modifyModal, setModifyModal] = useRecoilState(modifyAnswerModalInfo);
	const { t } = useTranslation(['userRevalidation', 'modals']);
	const { mutate, isLoading } = useSaveModifiedAnswer();
	const {
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
			firefighterID
		} = data;
		const answer = {
			...modifyModal.answer,
			userToRevalidate,
			userDetails,
			permissions,
			permissionDescription,
			firefighterID
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
		<ComposedModal
			open={modifyModal.open}
			onClose={cleanUp}
			preventCloseOnClickOutside
			className='z-[9999]'
		>
			<ModalHeader title={t('userRevalidation:modify-answer')} closeModal={cleanUp} />
			<ModalBody className='mb-3 max-h-[500px] overflow-y-auto'>
				<Form>
					<div className='grid grid-cols-2 gap-5 p-5'>
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
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button
					kind='primary'
					onClick={handleSubmit(modifyAnswer)}
					disabled={!isValid || isLoading}
				>
					<span className='mr-5'>{t('modals:save')}</span>
					{isLoading && <InlineLoading />}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default ModifyAnswerModal;
