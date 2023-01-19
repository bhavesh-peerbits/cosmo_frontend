import { Button, Form, Grid, Tile, TextArea, TextInput, Layer } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import DeleteInstanceModal from '@components/Modals/DeleteInstanceModal';
import InstanceAsset from '@model/InstanceAsset';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { OptionsTile } from '@carbon/ibm-products';
import AssetTileContent from './AssetTileContent';
import { ApplicationInstanceFormData } from './AssetTileForm';

type ApplicationInstanceFormProps = {
	instance: InstanceAsset;
};
const ApplicationInstanceForm = ({ instance }: ApplicationInstanceFormProps) => {
	const { t } = useTranslation(['applicationInstances', 'modals', 'applicationInfo']);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const {
		register,
		reset,
		control,
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

	if (!instance || !instance.instance) {
		return null;
	}

	return (
		<Tile href={`${instance.instance?.id}`} className='w-full bg-background'>
			<Form>
				<Grid fullWidth>
					<DeleteInstanceModal
						isOpen={isDeleteOpen}
						setIsOpen={setIsDeleteOpen}
						instance={instance.instance}
					/>
					<FullWidthColumn
						data-toc-id={`instance-container-${instance.instance?.id}`}
						data-toc-title={instance.instance?.name}
						className='flex items-center justify-between text-fluid-heading-3'
					>
						{instance.instance?.name}
						<Button
							hasIconOnly
							kind='ghost'
							renderIcon={TrashCan}
							tooltipPosition='bottom'
							iconDescription={t('applicationInstances:delete-instance')}
							onClick={() => setIsDeleteOpen(true)}
						/>
					</FullWidthColumn>

					<FullWidthColumn>
						<Grid fullWidth>
							<FullWidthColumn className='mb-5'>
								<TextInput
									id={`${instance.instance?.id}-input-name`}
									labelText={t('applicationInstances:instance-name')}
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
								<Layer level={0}>
									<TextArea
										labelText={t('applicationInstances:description')}
										placeholder={t(
											'applicationInstances:instance-description-placeholder'
										)}
										{...register('description')}
										readOnly
									/>
								</Layer>
							</FullWidthColumn>
							{instance.assets?.map(asset => (
								<FullWidthColumn className='mb-5'>
									<OptionsTile summary={asset.ip} title={asset.hostname}>
										<AssetTileContent
											asset={asset}
											index={fields.findIndex(f => f.key === asset.id)}
											register={register}
										/>
									</OptionsTile>
								</FullWidthColumn>
							))}

							<FullWidthColumn className='mt-7'>
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
