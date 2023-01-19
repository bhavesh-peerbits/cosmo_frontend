import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Asset from '@model/Asset';
import { Dispatch, SetStateAction } from 'react';

type DeleteAssetModalProps = {
	assetToDelete?: Asset;
	setAssetToDelete: Dispatch<SetStateAction<Asset | undefined>>;
};

const DeleteAssetModal = ({ assetToDelete, setAssetToDelete }: DeleteAssetModalProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances']);

	const cleanUp = () => {
		setAssetToDelete(undefined);
	};

	return (
		<ComposedModal
			size='sm'
			open={!!assetToDelete}
			onClose={cleanUp}
			className='z-[9999]'
		>
			<ModalHeader
				title={t('modals:confirm-delete')}
				label={assetToDelete?.hostname}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>
					{t('applicationInstances:confirm-asset-delete', {
						hostname: assetToDelete?.hostname
					})}
				</span>
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
				{/* <Button kind='danger' disabled={isLoading} onClick={DeleteAsset}>
					{t('delete')}
				</Button> */}
				<Button kind='danger' onClick={cleanUp}>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteAssetModal;
