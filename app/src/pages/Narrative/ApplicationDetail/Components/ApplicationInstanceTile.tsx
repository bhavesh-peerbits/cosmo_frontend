import { Button, Form, Grid, Tile, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { TrashCan, Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddNewAssetModal from '@pages/Narrative/ApplicationDetail/Modals/AddNewAssetModal';
import MultiAddSelect from '@components/MultiAddSelect';
import { useForm } from 'react-hook-form';
import Instance from '@model/Narrative/Instance';
import useGetAssetList from '@api/instance-asset/useGetAssetList';
import useUpdateInstanceForApp from '@api/app-instances/useUpdateInstanceForApp';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import useGetAllAssetsTenant from '@api/asset/useGetAllAssetsTenant';
import useCreateAssetInstance from '@api/instance-asset/useCreateAssetInstance';
import ApplicationInstanceForm, {
	ApplicationInstanceFormData
} from '../../ReviewDetail/Containers/ApplicationInstanceForm';
import DeleteInstanceModal from '../Modals/DeleteInstanceModal';

type ApplicationInstanceTileProps = {
	instance: Instance;
};
const ApplicationInstanceTile = ({ instance }: ApplicationInstanceTileProps) => {
	const { t } = useTranslation([
		'applicationInstances',
		'modals',
		'applicationInfo',
		'changeMonitoring',
		'userSelect'
	]);
	const [isDeleteInstanceOpen, setIsDeleteInstanceOpen] = useState(false);
	const [addAssetToOpen, setAddAssetToOpen] = useState<'new' | 'existing' | undefined>();
	const { data: instanceAssets } = useGetAssetList({
		instanceId: instance.id,
		appId: instance.application.id
	});
	const { data: allAssets } = useGetAllAssetsTenant();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isDirty, isValid, isSubmitSuccessful }
	} = useForm<ApplicationInstanceFormData>({
		mode: 'all',
		defaultValues: {
			name: instance.name,
			description: instance.description
		}
	});

	const { mutate, isError, isLoading, error, isSuccess } = useUpdateInstanceForApp();
	const { mutate: mutateAddAsset } = useCreateAssetInstance();

	const updateInstance = (data: ApplicationInstanceFormData) => {
		return mutate({
			appId: instance.application.id,
			instance: {
				...instance,
				name: data.name,
				description: data.description
			}
		});
	};

	const addAssetToInstance = (assetIds: string[]) => {
		return assetIds.forEach(assetId =>
			mutateAddAsset(
				{
					instanceId: instance.id,
					appId: instance.application.id,
					assetId
				},
				{ onSuccess: () => setAddAssetToOpen(undefined) }
			)
		);
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({});
		}
	}, [reset, isSubmitSuccessful]);

	if (!instance) {
		return null;
	}

	return (
		<Tile href={`${instance.id}`} className='w-full bg-background'>
			<Form>
				<Grid fullWidth>
					<MultiAddSelect
						itemsLabel='Assets'
						noResultsTitle={t('userSelect:no-results')}
						noResultsDescription={t('userSelect:different-keywords')}
						onCloseButtonText={t('userSelect:cancel')}
						onSubmit={ids => {
							addAssetToInstance(ids);
						}}
						open={addAssetToOpen === 'existing'}
						onClose={() => setAddAssetToOpen(undefined)}
						onSubmitButtonText={t('userSelect:select')}
						searchResultsLabel={t('userSelect:search-results')}
						title={t('changeMonitoring:select-assets')}
						description={t('changeMonitoring:select-assets-list')}
						globalSearchLabel={t('changeMonitoring:search-asset')}
						globalSearchPlaceholder={t('changeMonitoring:search-asset-name')}
						influencerTitle={t('changeMonitoring:selected-assets')}
						influencerItemTitle='Hostname'
						influencerItemSubtitle='IP'
						globalFilters={[
							{
								id: 'tagInfo',
								label: t('changeMonitoring:operating-system')
							},
							{
								id: t('changeMonitoring:type'),
								label: t('changeMonitoring:type')
							}
						]}
						globalFiltersIconDescription={t('userSelect:filters')}
						globalFiltersPlaceholderText={t('userSelect:choose-option')}
						globalFiltersPrimaryButtonText={t('userSelect:apply')}
						globalFiltersSecondaryButtonText={t('userSelect:reset')}
						clearFiltersText={t('userSelect:clear-filters')}
						items={{
							entries: allAssets
								? allAssets
										.filter(
											asset =>
												!instanceAssets?.find(
													instanceAsset => instanceAsset.id === asset.id
												)
										)
										.map(asset =>
											asset.type === 'DB'
												? {
														id: asset.id,
														title: asset.hostname || '',
														tagInfo: asset.os,
														subtitle: asset.ip,
														[t('changeMonitoring:type')]: asset.type,
														[t('changeMonitoring:operating-system')]: asset.os,
														database: asset.dbType,
														cpe: asset.cpe
												  }
												: {
														id: asset.id,
														title: asset.hostname || '',
														tagInfo: asset.os,
														subtitle: asset.ip,
														[t('changeMonitoring:type')]: asset.type,
														[t('changeMonitoring:operating-system')]: asset.os,
														cpe: asset.cpe
												  }
										)
								: []
						}}
					/>
					<DeleteInstanceModal
						isOpen={isDeleteInstanceOpen}
						setIsOpen={setIsDeleteInstanceOpen}
						instance={instance}
					/>
					<AddNewAssetModal
						isOpen={addAssetToOpen}
						setIsOpen={setAddAssetToOpen}
						instance={instance}
					/>
					<FullWidthColumn
						data-toc-id={`instance-container-${instance.id}`}
						data-toc-title={instance.name}
						className='flex items-center justify-between text-fluid-heading-3'
					>
						{instance.name}
						<div className='flex'>
							<OverflowMenu
								ariaLabel='Add new asset menu'
								iconDescription={t('applicationInstances:add-asset')}
								size='lg'
								flipped
								renderIcon={Add}
							>
								<OverflowMenuItem
									itemText={t('applicationInstances:new-asset')}
									onClick={() => setAddAssetToOpen('new')}
								/>
								<OverflowMenuItem
									itemText={t('applicationInstances:existing-asset')}
									onClick={() => setAddAssetToOpen('existing')}
								/>
							</OverflowMenu>
							<Button
								hasIconOnly
								kind='ghost'
								renderIcon={TrashCan}
								tooltipPosition='bottom'
								iconDescription={t('applicationInstances:delete-instance')}
								onClick={() => setIsDeleteInstanceOpen(true)}
							/>
						</div>
					</FullWidthColumn>
					<FullWidthColumn className='space-y-7'>
						<ApplicationInstanceForm
							instance={instance}
							instanceAssets={instanceAssets}
							register={register}
							errors={errors}
						/>
					</FullWidthColumn>
					<FullWidthColumn className='pt-7'>
						<div className='flex flex-wrap justify-between space-x-2'>
							<div className='flex-1'>
								<InlineLoadingStatus
									isLoading={isLoading}
									isSuccess={isSuccess}
									isError={isError}
									error={error as ApiError}
								/>
							</div>
							<div className='flex w-full flex-1 justify-end space-x-5 pb-5'>
								<Button
									size='md'
									type='reset'
									kind='secondary'
									disabled={!isDirty}
									onClick={() => {
										reset({
											description: instance.description,
											name: instance.name
										});
									}}
								>
									{t('applicationInfo:discard')}
								</Button>
								<Button
									size='md'
									type='submit'
									disabled={!isValid || !isDirty}
									onClick={handleSubmit(updateInstance)}
								>
									{t('modals:save')}
								</Button>
							</div>
						</div>
					</FullWidthColumn>
				</Grid>
			</Form>
		</Tile>
	);
};
export default ApplicationInstanceTile;
