import { Button, Grid, TextArea, TextInput } from '@carbon/react';
import { TrashCan, SubtractAlt } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import DeleteAssetModal from '@pages/Narrative/ReviewDetail/Modals/DeleteAssetModal';
import Asset from '@model/Narrative/Asset';
import Instance from '@model/Instance';
import AssetExpandableTile from '@pages/ChangeMonitoring/MonitoringDraftDetails/Components/AssetExpandableTile';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AssetFormContainer from './AssetFormContainer';

export interface ApplicationInstanceFormData {
	name: string;
	description: string;
}

type ApplicationInstanceFormProps = {
	instance: Instance;
	instanceAssets?: Asset[];
	isReview?: boolean;
	register: UseFormRegister<ApplicationInstanceFormData>;
	errors: FieldErrors<ApplicationInstanceFormData>;
};

const ApplicationInstanceForm = ({
	instance,
	instanceAssets,
	isReview,
	register,
	errors
}: ApplicationInstanceFormProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances', 'applicationInfo']);
	const [assetToDelete, setAssetToDelete] = useState<{
		asset: Asset;
		isGlobal: boolean;
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
					id={`${instance?.id}-input-name`}
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
					id={`${instance.id}-input-description`}
					labelText={t('applicationInstances:description')}
					placeholder={t('applicationInstances:instance-description-placeholder')}
					{...register('description')}
				/>
			</FullWidthColumn>
			{!!instanceAssets?.length && (
				<FullWidthColumn>
					{instanceAssets.map(asset => (
						<AssetExpandableTile
							key={asset.id}
							title={
								<div className='flex items-center justify-between'>
									{asset.hostname}
									{!isReview && (
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
													setAssetToDelete({ asset, instance, isGlobal: false });
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
									)}
								</div>
							}
						>
							<AssetFormContainer asset={asset} isReview={isReview} />
						</AssetExpandableTile>
					))}
				</FullWidthColumn>
			)}
		</Grid>
	);
};
export default ApplicationInstanceForm;
