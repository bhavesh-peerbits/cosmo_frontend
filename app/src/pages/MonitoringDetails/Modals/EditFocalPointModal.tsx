import { Form, InlineNotification } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import { useForm } from 'react-hook-form';
import User from '@model/User';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import Monitoring from '@model/Monitoring';
import useGetUsersByRole from '@api/user/useGetUsersByRole';
import useEditMonitoringFocalPoint from '@api/change-monitoring/useEditMonitoringFocalPoint';
import ApiError from '@api/ApiError';

type EditFocalPointModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<string | undefined>>;
	monitoring: Monitoring;
};

type EditFocalPointForm = {
	focalPoint: User;
	delegates: User[];
};

const EditFocalPointModalModal = ({
	isOpen,
	setIsOpen,
	monitoring
}: EditFocalPointModalProps) => {
	const { t } = useTranslation(['modals', 'monitoringDashboard', 'evidenceRequest']);
	const { mutate, isError, error } = useEditMonitoringFocalPoint();
	const {
		control,
		watch,
		handleSubmit,
		formState: { isValid }
	} = useForm<EditFocalPointForm>({
		defaultValues: {
			focalPoint: monitoring.focalPoint,
			delegates: monitoring.delegates
		}
	});
	const selectedFocalPoint = watch ? watch('focalPoint') : undefined;
	const selectedDelegates = watch ? watch('delegates') : [];

	const cleanUp = () => {
		setIsOpen('');
	};

	const saveFocalPoint = () => {
		selectedFocalPoint &&
			mutate(
				{
					delegates: selectedDelegates.map(del => del.id),
					focalPoint: selectedFocalPoint.id,
					monitoringId: +monitoring.id
				},
				{ onSuccess: cleanUp }
			);
	};

	// TODO Add focal point and delegates default values
	return (
		<TearsheetNarrow
			hasCloseIcon
			label={monitoring.name}
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
					onClick: handleSubmit(saveFocalPoint)
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
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('FOCAL_POINT');
					}}
					excludedUsers={selectedDelegates}
				/>
				<MultipleUserSelect
					control={control}
					level={2}
					label={t('evidenceRequest:focal-point-delegates')}
					name='delegates'
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRole('FOCAL_POINT');
					}}
					excludedUser={selectedFocalPoint}
				/>
				{isError && (
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
				)}
			</Form>
		</TearsheetNarrow>
	);
};
export default EditFocalPointModalModal;
