import FullWidthColumn from '@components/FullWidthColumn';
import Asset from '@model/Asset';
import { useForm } from 'react-hook-form';
import { Button } from '@carbon/react';
import { useTranslation } from 'react-i18next';
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
	const {
		mutate,
		isError,
		isSuccess,
		isLoading,
		error,
		reset: resetApi
	} = useModifyAsset();

	const {
		register,
		reset,
		watch,
		handleSubmit,
		setValue,
		formState: { errors, isDirty }
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
				assetPaths={watch('paths')}
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
							resetApi();
							reset(
								{
									hostname: asset.hostname,
									ports: asset.ports,
									type: asset.type || 'DB',
									os: asset.os || 'WINDOWS',
									ip: asset.ip,
									dbVersion: asset.dbVersion,
									dbType: asset.dbType,
									paths: asset.paths.length ? asset.paths : [],
									cpe: asset.cpe
								},
								{ keepDirty: false }
							);
						}}
					>
						{t('applicationInfo:discard')}
					</Button>
					<Button
						size='md'
						type='submit'
						disabled={Object.keys(errors).length > 0 || !isDirty}
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
