import FullWidthColumn from '@components/FullWidthColumn';
import Asset from '@model/Asset';
import { useForm } from 'react-hook-form';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import useModifyAsset from '@api/asset/useModifyAsset';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import AssetPathsTable from '../Components/AssetPathsTable';
import AssetTileForm, { AssetFormData } from '../Components/AssetTileForm';

type AssetFormContainerProps = {
	asset: Asset;
	isReview?: boolean;
};
const AssetFormContainer = ({ asset, isReview }: AssetFormContainerProps) => {
	const { t } = useTranslation(['applicationInfo', 'modals']);
	const { mutate, isError, isSuccess, isLoading, error } = useModifyAsset();

	const {
		register,
		reset,
		watch,
		handleSubmit,
		setValue,
		getValues,
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
			cpe: asset.cpe,
			paths: asset.paths.length ? asset.paths : []
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
		const { dbType, dbVersion, hostname, ip, os, type, ports, cpe, paths } = data;
		return mutate({
			assetId: asset.id,
			asset: {
				...asset,
				paths,
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

	// useEffect(() => {
	// 	setValue(
	// 		'paths',
	// 		assetPaths.map(path => path.path),
	// 		{ shouldDirty: true }
	// 	);
	// }, [assetPaths, setValue]);

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
				assetPaths={getValues('paths')}
				setValue={setValue}
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
								dbType: asset.dbType,
								paths: asset.paths.length ? asset.paths : []
							});
							// setAssetPaths(asset.paths);
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
