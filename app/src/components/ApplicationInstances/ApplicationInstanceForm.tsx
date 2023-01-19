import { Button, Form, Grid, Tile, TextArea, TextInput } from '@carbon/react';
import { TrashCan, SubtractAlt, Add } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import DeleteInstanceModal from '@components/Modals/DeleteInstanceModal';
import InstanceAsset from '@model/InstanceAsset';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OptionsTile } from '@carbon/ibm-products';
import DeleteAssetModal from '@components/Modals/DeleteAssetModal';
import Asset from '@model/Asset';
import Instance from '@model/Instance';
import AssetTileContent from './AssetTileContent';
import { ApplicationInstanceFormData } from './AssetTileForm';

type ApplicationInstanceFormProps = {
	instance: InstanceAsset;
};
const ApplicationInstanceForm = ({ instance }: ApplicationInstanceFormProps) => {
	const { t } = useTranslation(['applicationInstances', 'modals', 'applicationInfo']);
	const [isDeleteInstanceOpen, setIsDeleteInstanceOpen] = useState(false);
	const [assetToDelete, setAssetToDelete] = useState<{
		asset: Asset;
		isGlobal?: boolean;
		instance?: Instance;
	}>();

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

	const { fields, append, update } = useFieldArray({
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
	}, [
		instance.assets,
		instance.instance?.description,
		instance.instance?.name,
		reset,
		update
	]);

	if (!instance || !instance.instance) {
		return null;
	}

	return (
		<Tile href={`${instance.instance?.id}`} className='w-full bg-background'>
			<Form>
				<Grid fullWidth>
					<DeleteInstanceModal
						isOpen={isDeleteInstanceOpen}
						setIsOpen={setIsDeleteInstanceOpen}
						instance={instance.instance}
					/>
					<DeleteAssetModal
						assetToDelete={assetToDelete}
						setAssetToDelete={setAssetToDelete}
					/>
					<FullWidthColumn
						data-toc-id={`instance-container-${instance.instance?.id}`}
						data-toc-title={instance.instance?.name}
						className='flex items-center justify-between text-fluid-heading-3'
					>
						{instance.instance?.name}
						<div>
							<Button
								hasIconOnly
								kind='ghost'
								renderIcon={Add}
								tooltipPosition='bottom'
								iconDescription={t('applicationInstances:add-asset')}
								onClick={() => setIsDeleteInstanceOpen(true)}
							/>
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

					<FullWidthColumn>
						<Grid fullWidth>
							<FullWidthColumn className='mb-5'>
								<TextInput
									id={`${instance.instance?.id}-input-name`}
									labelText={`${t('applicationInstances:instance-name')} *`}
									placeholder={t('applicationInstances:instance-name-placeholder')}
									invalidText={errors.name?.message}
									invalid={Boolean(errors.name)}
									{...register('name', {
										required: {
											value: true,
											message: `${t('modals:field-required')}`
										}
									})}
								/>
							</FullWidthColumn>
							<FullWidthColumn className='mb-5'>
								<TextArea
									id={`${instance.instance?.id}-input-description`}
									labelText={t('applicationInstances:description')}
									placeholder={t('applicationInstances:instance-description-placeholder')}
									{...register('description')}
								/>
							</FullWidthColumn>
							{instance.assets?.map(asset => (
								<FullWidthColumn>
									<OptionsTile
										summary={asset.ip}
										title={
											<div className='flex items-center justify-between'>
												{asset.hostname}
												<div className='space-x-3'>
													<Button
														size='sm'
														kind='ghost'
														hasIconOnly
														renderIcon={SubtractAlt}
														iconDescription={t(
															'applicationInstances:delete-asset-instance'
														)}
														tooltipPosition='bottom'
														onClick={e => {
															e.stopPropagation();
															setAssetToDelete({ asset, instance: instance.instance });
														}}
													/>
													<Button
														size='sm'
														kind='ghost'
														hasIconOnly
														renderIcon={TrashCan}
														iconDescription={t(
															'applicationInstances:delete-asset-global'
														)}
														tooltipPosition='bottom'
														onClick={e => {
															e.stopPropagation();
															setAssetToDelete({ asset, isGlobal: true });
														}}
													/>
												</div>
											</div>
										}
									>
										<AssetTileContent
											asset={asset}
											index={fields.findIndex(f => f.key === asset.id)}
											register={register}
											watch={watch}
										/>
									</OptionsTile>
								</FullWidthColumn>
							))}

							<FullWidthColumn className='mt-5'>
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
											onClick={() => reset()}
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
export default ApplicationInstanceForm;
