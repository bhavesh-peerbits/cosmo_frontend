import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Grid,
	Column
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import { useForm } from 'react-hook-form';
import User from '@model/User';

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
	const { control, watch } = useForm<EditFocalPointForm>();
	const selectedFocalPoint = watch ? watch('focalPoint') : undefined;
	const selectedDelegates = watch ? watch('delegates') : [];

	const cleanUp = () => {
		setIsOpen('');
	};

	// TODO Add focal point and delegates default values
	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label='Monitoring Name'
				title={t('monitoringDashboard:edit-focal-point-title')}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<Grid>
					<Column sm={4} md={4} lg={8}>
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
					</Column>
					<Column sm={4} md={4} lg={8}>
						<MultipleUserSelect
							control={control}
							level={2}
							label={t('evidenceRequest:focal-point-delegates')}
							name='delegates'
							excludedUser={selectedFocalPoint}
						/>
					</Column>
				</Grid>

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
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button kind='primary' onClick={() => {}}>
					{t('modals:save')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default EditFocalPointModalModal;
