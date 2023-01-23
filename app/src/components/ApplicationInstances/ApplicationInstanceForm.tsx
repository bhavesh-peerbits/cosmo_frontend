import { Button, Grid, TextArea, TextInput } from '@carbon/react';
import { TrashCan, SubtractAlt } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import DeleteAssetModal from '@components/Modals/DeleteAssetModal';
import Asset from '@model/Asset';
import Instance from '@model/Instance';
import InstanceAsset from '@model/InstanceAsset';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AssetFormContainer from './AssetFormContainer';

export interface ApplicationInstanceFormData {
	name: string;
	description: string;
}

type ApplicationInstanceFormProps = {
	instance: InstanceAsset;
	isReview?: boolean;
	register: UseFormRegister<ApplicationInstanceFormData>;
	errors: FieldErrors<ApplicationInstanceFormData>;
	reset?: UseFormReset<ApplicationInstanceFormData>;
	isDirty?: boolean;
	isValid?: boolean;
};

const ApplicationInstanceForm = ({
	instance,
	isReview,
	register,
	errors,
	isDirty,
	isValid,
	reset
}: ApplicationInstanceFormProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances', 'applicationInfo']);
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
			{!isReview && (
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
						<div className='flex w-full flex-1 justify-end space-x-5 pb-5'>
							<Button
								size='md'
								type='reset'
								kind='secondary'
								disabled={!isDirty}
								onClick={() => {
									reset &&
										reset({
											description: instance.instance?.description,
											name: instance.instance?.name
										});
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
			)}
			{!!instance.assets?.length && (
				<FullWidthColumn>
					{instance.assets?.map(asset => (
						<AssetExpandableTile
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
