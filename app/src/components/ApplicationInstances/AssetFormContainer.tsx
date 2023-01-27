import FullWidthColumn from '@components/FullWidthColumn';
import Asset from '@model/Asset';
import { useForm } from 'react-hook-form';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useModifyAsset from '@api/asset/useModifyAsset';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import AssetPathsTable from './AssetPathsTable';
import AssetTileForm, { AssetFormData } from './AssetTileForm';

type AssetFormContainerProps = {
	asset: Asset;
	isReview?: boolean;
};
const AssetFormContainer = ({ asset, isReview }: AssetFormContainerProps) => {
	const { t } = useTranslation(['applicationInfo', 'modals']);
	const { mutate, isError, isSuccess, isLoading, error } = useModifyAsset();
	const [assetPaths, setAssetPaths] = useState(asset.paths);

	const {
		register,
		reset,
		watch,
		handleSubmit,
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
			dbType: asset.dbType,
			cpe: asset.cpe
		}
	});

	// const checkIfPathsEqual = () => {
	// 	return (
	// 		asset.paths.map(path => path.path).length ===
	// 			assetPaths.map(path => path.path).length &&
	// 		asset.paths
	// 			.map(path => path.path)
	// 			.every(path => {
	// 				return assetPaths.map(el => el.path).includes(path);
	// 			})
	// 	);
	// };

	const modifyAsset = (data: AssetFormData) => {
		const { dbType, dbVersion, hostname, ip, os, type, ports, cpe } = data;
		return mutate({
			assetId: asset.id,
			asset: {
				...asset,
				paths: assetPaths,
				dbType,
				dbVersion,
				hostname,
				ip,
				os,
				cpe,
				ports: ports.replace(/,*$/, ''),
				type
			}
		});
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
				readOnly={isReview}
				assetPaths={assetPaths}
				setAssetPaths={setAssetPaths}
			/>
			{!isReview && (
				<div className='flex w-full flex-1 justify-end space-x-5 pb-5'>
					<div className='flex-1'>
						<InlineLoadingStatus
							isLoading={isLoading}
							isSuccess={isSuccess}
							isError={isError}
							error={error as ApiError}
						/>
					</div>
					<Button
						size='md'
						type='reset'
						kind='secondary'
						disabled={!isDirty || isLoading}
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
							setAssetPaths(asset.paths);
						}}
					>
						{t('applicationInfo:discard')}
					</Button>
					<Button
						size='md'
						type='submit'
						disabled={!isValid || !isDirty}
						onClick={handleSubmit(modifyAsset)}
					>
						{t('modals:save')}
					</Button>
				</div>
			)}
		</FullWidthColumn>
	);
};
export default AssetFormContainer;
