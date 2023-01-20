import { Button, Form, Grid, Tile, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { TrashCan, Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import DeleteInstanceModal from '@components/Modals/DeleteInstanceModal';
import InstanceAsset from '@model/InstanceAsset';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AddNewAssetModal from '@components/Modals/AddNewAssetModal';
import MultiAddSelect from '@components/MultiAddSelect';
import { ApplicationInstanceFormData } from './AssetTileForm';
import ApplicationInstanceForm from './ApplicationInstanceForm';

type ApplicationInstanceTileProps = {
	instance: InstanceAsset;
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

	const {
		register,
		reset,
		control,
		watch,
		formState: { errors, isDirty, isValid }
	} = useForm<ApplicationInstanceFormData>({
		mode: 'onChange',
		defaultValues: {
			name: instance.instance?.name,
			description: instance.instance?.description
		}
	});

	const { fields, append } = useFieldArray({
		name: 'assets',
		control
	});

	useEffect(() => {
		instance.assets?.map(a =>
			append({
				hostname: a.hostname,
				ports: a.ports,
				type: a.type,
				os: a.os,
				ip: a.ip,
				dbVersion: a.dbVersion,
				dbType: a.dbType,
				key: a.id
			})
		);
	}, [append, instance.assets]);

	useEffect(() => {
		reset({
			name: instance.instance?.name,
			description: instance.instance?.description,
			assets: instance.assets?.map(a => {
				return {
					hostname: a.hostname,
					ports: a.ports,
					type: a.type,
					os: a.os,
					ip: a.ip,
					dbVersion: a.dbVersion,
					dbType: a.dbType,
					key: a.id
				};
			})
		});
	}, [instance.assets, instance.instance?.description, instance.instance?.name, reset]);

	if (!instance || !instance.instance) {
		return null;
	}
	// TODO Change items and filter items based on already associated assets
	// TODO Edit items in onSubmit filter
	return (
		<Tile href={`${instance.instance?.id}`} className='w-full bg-background'>
			<Form>
				<Grid fullWidth>
					<MultiAddSelect
						itemsLabel='Assets'
						noResultsTitle={t('userSelect:no-results')}
						noResultsDescription={t('userSelect:different-keywords')}
						onCloseButtonText={t('userSelect:cancel')}
						onSubmit={() => {
							setAddAssetToOpen(undefined);
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
							entries: instance.assets
								? instance.assets.map(asset =>
										asset.type === 'DB'
											? {
													id: asset.id,
													title: asset.hostname || '',
													tagInfo: asset.os,
													subtitle: asset.ip,
													[t('changeMonitoring:type')]: asset.type,
													[t('changeMonitoring:operating-system')]: asset.os,
													database: asset.dbType,
													cpe: 'here goes cpe'
											  }
											: {
													id: asset.id,
													title: asset.hostname || '',
													tagInfo: asset.os,
													subtitle: asset.ip,
													[t('changeMonitoring:type')]: asset.type,
													[t('changeMonitoring:operating-system')]: asset.os,
													cpe: 'here goes cpe'
											  }
								  )
								: []
						}}
					/>
					<DeleteInstanceModal
						isOpen={isDeleteInstanceOpen}
						setIsOpen={setIsDeleteInstanceOpen}
						instance={instance.instance}
					/>
					<AddNewAssetModal
						isOpen={addAssetToOpen}
						setIsOpen={setAddAssetToOpen}
						instance={instance.instance}
					/>
					<FullWidthColumn
						data-toc-id={`instance-container-${instance.instance?.id}`}
						data-toc-title={instance.instance?.name}
						className='flex items-center justify-between text-fluid-heading-3'
					>
						{instance.instance?.name}
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
							{/* <Button
								hasIconOnly
								kind='ghost'
								renderIcon={Add}
								tooltipPosition='bottom'
								iconDescription={t('applicationInstances:add-asset')}
								onClick={() => setIsAddAssetOpen(true)}
							/> */}
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
							register={register}
							watch={watch}
							errors={errors}
							fields={fields}
						/>
						<Grid fullWidth>
							<FullWidthColumn>
								<div className='flex flex-wrap justify-between space-x-2'>
									<div className='flex-1'>
										{/* <InlineLoadingStatus
											isLoading={isAddLoading || isEditLoading}
											isSuccess={isAddSuccess || isEditSuccess}
											isError={isAddError || isEditError}
											error={(addError || editError) as ApiError}
										/> */}
									</div>
									<div className='flex w-full flex-1 justify-end space-x-5'>
										<Button
											size='md'
											type='reset'
											kind='secondary'
											disabled={!isDirty}
											onClick={() => {
												reset();
											}}
										>
											{t('applicationInfo:discard')}
										</Button>
										<Button size='md' type='submit' disabled={!isValid || !isDirty}>
											{t('modals:save')}
										</Button>
									</div>
								</div>
							</FullWidthColumn>
						</Grid>
					</FullWidthColumn>
				</Grid>
			</Form>
		</Tile>
	);
};
export default ApplicationInstanceTile;
