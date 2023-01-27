import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	UnorderedList,
	ListItem,
	InlineNotification
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Asset from '@model/Asset';
import { Dispatch, SetStateAction } from 'react';
import Instance from '@model/Instance';
import useDeleteInstanceAsset from '@api/instance-asset/useDeleteInstanceAsset';
import useDeleteAssetGlobal from '@api/asset/useDeleteAssetGlobal';
import ApiError from '@api/ApiError';

type DeleteAssetModalProps = {
	assetToDelete?: { asset: Asset; isGlobal: boolean; instance?: Instance };
	setAssetToDelete: Dispatch<
		SetStateAction<{ asset: Asset; isGlobal: boolean; instance?: Instance } | undefined>
	>;
};

const DeleteAssetModal = ({ assetToDelete, setAssetToDelete }: DeleteAssetModalProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances']);
	const { mutate, isLoading, isError, error, reset } = useDeleteInstanceAsset();
	const {
		mutate: mutateGlobal,
		isLoading: isLoadingGlobal,
		isError: isErrorGlobal,
		error: errorGlobal,
		reset: resetGlobal
	} = useDeleteAssetGlobal();

	const cleanUp = () => {
		setAssetToDelete(undefined);
		resetGlobal();
		reset();
	};

	const deleteAsset = () => {
		return (
			assetToDelete &&
			(assetToDelete?.isGlobal
				? mutateGlobal(
						{ assetId: assetToDelete.asset.id },
						{ onSuccess: () => cleanUp() }
				  )
				: mutate(
						{
							assetId: assetToDelete.asset.id,
							appId: assetToDelete.instance?.application.id as string,
							instanceId: assetToDelete.instance?.id as string
						},
						{ onSuccess: () => cleanUp() }
				  ))
		);
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
				label={assetToDelete?.asset.hostname}
				closeModal={cleanUp}
			/>
			<ModalBody>
				<span>
					{assetToDelete?.isGlobal
						? t('applicationInstances:confirm-asset-delete-global', {
								hostname: assetToDelete?.asset.hostname
						  })
						: t('applicationInstances:confirm-asset-delete-instance', {
								hostname: assetToDelete?.asset.hostname,
								instance: assetToDelete?.instance?.name
						  })}
				</span>
				{assetToDelete?.isGlobal && (
					<UnorderedList nested className='pt-5'>
						<ListItem>Instance very very long name</ListItem>
						<ListItem>Instance very very long longlong long name</ListItem>
					</UnorderedList>
				)}
				{(isError || isErrorGlobal) && (
					<div className='mt-5 flex items-center justify-center'>
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								(errorGlobal as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					</div>
				)}
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={cleanUp}>
					{t('modals:cancel')}
				</Button>
				<Button
					kind='danger'
					disabled={isLoading || isLoadingGlobal}
					onClick={() => deleteAsset()}
				>
					{t('modals:delete')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default DeleteAssetModal;
