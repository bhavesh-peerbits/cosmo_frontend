import { Button, Grid, TextArea, TextInput } from '@carbon/react';
import { TrashCan, SubtractAlt } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import DeleteAssetModal from '@components/Modals/DeleteAssetModal';
import Asset from '@model/Asset';
import Instance from '@model/Instance';
import InstanceAsset from '@model/InstanceAsset';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import { useState } from 'react';
import {
	UseFormRegister,
	UseFormWatch,
	FieldErrors,
	FieldArrayWithId
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AssetTileContent from './AssetTileContent';
import { ApplicationInstanceFormData } from './AssetTileForm';

type ApplicationInstanceFormProps = {
	instance: InstanceAsset;
	register: UseFormRegister<ApplicationInstanceFormData>;
	watch: UseFormWatch<ApplicationInstanceFormData>;
	errors: FieldErrors<ApplicationInstanceFormData>;
	fields: FieldArrayWithId<ApplicationInstanceFormData, 'assets', 'id'>[];
};

const ApplicationInstanceForm = ({
	instance,
	register,
	watch,
	errors,
	fields
}: ApplicationInstanceFormProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances']);
	const [assetToDelete, setAssetToDelete] = useState<{
		asset: Asset;
		isGlobal?: boolean;
		instance?: Instance;
	}>();

	return (
		<Grid fullWidth className='space-y-5'>
			<DeleteAssetModal
				assetToDelete={assetToDelete}
				setAssetToDelete={setAssetToDelete}
			/>
			<FullWidthColumn>
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
			<FullWidthColumn>
				<TextArea
					id={`${instance.instance?.id}-input-description`}
					labelText={t('applicationInstances:description')}
					placeholder={t('applicationInstances:instance-description-placeholder')}
					{...register('description')}
				/>
			</FullWidthColumn>
			{!!instance.assets?.length && (
				<FullWidthColumn>
					{instance.assets?.map(asset => (
						<AssetExpandableTile
							title={
								<div className='flex items-center justify-between'>
									{asset.hostname}
									<div className='space-x-3'>
										<Button
											size='sm'
											kind='ghost'
											hasIconOnly
											renderIcon={SubtractAlt}
											iconDescription={t('applicationInstances:delete-asset-instance')}
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
											iconDescription={t('applicationInstances:delete-asset-global')}
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
								errors={errors}
							/>
						</AssetExpandableTile>
					))}
				</FullWidthColumn>
			)}
		</Grid>
	);
};
export default ApplicationInstanceForm;
