import {
	Button,
	ComposedModal,
	InlineNotification,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import Application from '@model/Narrative/Application';
import useDeleteApp from '@api/management/useDeleteApp';
import ApiError from '@api/ApiError';
import { useTranslation } from 'react-i18next';

type MultipleDeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	applications: Application[];
};

const MultipleDeleteModal = ({
	isOpen,
	setIsOpen,
	applications
}: MultipleDeleteModalProps) => {
	const { mutate, isLoading, reset, isError, error } = useDeleteApp();
	const { t } = useTranslation('modals');

	const confirmDelete = () => {
		applications.forEach(app => {
			mutate(
				{ appId: app.id },
				{
					onSuccess: () => {
						reset();
						setIsOpen(false);
					}
				}
			);
		});
	};

	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
			<ModalHeader title={t('confirm-delete')} closeModal={() => setIsOpen(false)} />
			<ModalBody>
				<div className='flex flex-col'>
					<span>{`${t('delete-apps')} ${applications.length} ${t(
						'applications'
					)}?`}</span>
					{isError && (
						<div className='mt-5 flex items-center justify-center self-center'>
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
				</div>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => setIsOpen(false)}>
					{t('cancel')}
				</Button>
				<Button disabled={isLoading} kind='danger' onClick={confirmDelete}>
					{t('delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default MultipleDeleteModal;
