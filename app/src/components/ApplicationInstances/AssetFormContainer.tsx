import FullWidthColumn from '@components/FullWidthColumn';
import Asset from '@model/Asset';
import { useForm } from 'react-hook-form';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import AssetPathsTable from './AssetPathsTable';
import AssetTileForm, { AssetFormData } from './AssetTileForm';

type AssetFormContainerProps = {
	asset: Asset;
	isReview?: boolean;
};
const AssetFormContainer = ({ asset, isReview }: AssetFormContainerProps) => {
	const { t } = useTranslation(['applicationInfo', 'modals']);

	const {
		register,
		reset,
		watch,
		formState: { errors, isDirty, isValid }
	} = useForm<AssetFormData>({
		mode: 'onChange',
		defaultValues: {
			hostname: asset.hostname,
			ports: asset.ports,
			type: asset.type || 'DB',
			os: asset.os || 'WINDOWS',
			ip: asset.ip,
			dbVersion: asset.dbVersion,
			dbType: asset.dbType
		}
	});

	return (
		<FullWidthColumn className='space-y-5'>
			<AssetTileForm
				asset={asset}
				readOnly={isReview}
				register={register}
				watch={watch}
				errors={errors}
			/>
			<AssetPathsTable asset={asset} readOnly />
			{!isReview && (
				<div className='flex w-full flex-1 justify-end space-x-5 pb-5'>
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
			)}
		</FullWidthColumn>
	);
};
export default AssetFormContainer;
