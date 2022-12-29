import { Form } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import { useForm } from 'react-hook-form';
import User from '@model/User';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';

type EditFocalPointModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string | undefined>>;
};

type EditFocalPointForm = {
	focalPoint: User;
	delegates: User[];
};

const EditFocalPointModalModal = ({ isOpen, setIsOpen }: EditFocalPointModalProps) => {
	const { t } = useTranslation(['modals', 'monitoringDashboard', 'evidenceRequest']);
	const {
		control,
		watch,
		formState: { isValid }
	} = useForm<EditFocalPointForm>();
	const selectedFocalPoint = watch ? watch('focalPoint') : undefined;
	const selectedDelegates = watch ? watch('delegates') : [];

	const cleanUp = () => {
		setIsOpen('');
	};

	// TODO Add focal point and delegates default values
	return (
		<TearsheetNarrow
			hasCloseIcon
			label='Monitoring Name'
			title={t('monitoringDashboard:edit-focal-point-title')}
			open={isOpen}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-send-focal-point'
				},
				{
					label: t('modals:save'),
					id: 'send-focal-point',
					disabled: !isValid,
					onClick: () => {}
				}
			]}
		>
			<Form className='space-y-5 px-5'>
				<SingleUserSelect
					control={control}
					level={2}
					label='Focal Point *'
					name='focalPoint'
					rules={{
						required: true
					}}
					excludedUsers={selectedDelegates}
				/>
				<MultipleUserSelect
					control={control}
					level={2}
					label={t('evidenceRequest:focal-point-delegates')}
					name='delegates'
					excludedUser={selectedFocalPoint}
				/>{' '}
				{/* {isError && (
					<div className='mt-5 flex items-center justify-center'>
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					</div>
				)} */}
			</Form>
		</TearsheetNarrow>
	);
};
export default EditFocalPointModalModal;
