import FullWidthColumn from '@components/FullWidthColumn';
import Asset from '@model/Asset';
import { useForm } from 'react-hook-form';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AssetPathsTable from './AssetPathsTable';
import AssetTileForm, { AssetFormData } from './AssetTileForm';

type AssetFormContainerProps = {
	asset: Asset;
	isReview?: boolean;
};
const AssetFormContainer = ({ asset, isReview }: AssetFormContainerProps) => {
	const { t } = useTranslation(['applicationInfo', 'modals']);
	const [assetPaths, setAssetPaths] = useState(
		asset.paths.map(path => {
			return { path: path.path };
		})
	);

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

	const checkIfPathsEqual = () => {
		return (
			asset.paths.map(path => path.path).length ===
				assetPaths.map(path => path.path).length &&
			asset.paths
				.map(path => path.path)
				.every(path => {
					return assetPaths.map(el => el.path).includes(path);
				})
		);
	};

	return (
		<FullWidthColumn className='space-y-5'>
			<AssetTileForm
				asset={asset}
				readOnly={isReview}
				register={register}
				watch={watch}
				errors={errors}
			/>
			<AssetPathsTable
				asset={asset}
				readOnly
				assetPaths={assetPaths}
				setAssetPaths={setAssetPaths}
			/>
			{!isReview && (
				<div className='flex w-full flex-1 justify-end space-x-5 pb-5'>
					<Button
						size='md'
						type='reset'
						kind='secondary'
						disabled={!isDirty || !checkIfPathsEqual()}
						onClick={() => {
							reset({
								hostname: asset.hostname,
								ports: asset.ports,
								type: asset.type || 'DB',
								os: asset.os || 'WINDOWS',
								ip: asset.ip,
								dbVersion: asset.dbVersion,
								dbType: asset.dbType
							});
							setAssetPaths(
								asset.paths.map(path => {
									return { path: path.path };
								})
							);
						}}
					>
						{t('applicationInfo:discard')}
					</Button>
					<Button
						size='md'
						type='submit'
						disabled={!isValid || !isDirty || checkIfPathsEqual()}
					>
						{t('modals:save')}
					</Button>
				</div>
			)}
		</FullWidthColumn>
	);
};
export default AssetFormContainer;
