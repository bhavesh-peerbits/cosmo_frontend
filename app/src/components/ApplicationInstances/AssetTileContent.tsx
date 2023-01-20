import Asset from '@model/Asset';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import AssetPathsTable from './AssetPathsTable';
import AssetTileForm, { ApplicationInstanceFormData } from './AssetTileForm';

type AssetTileContentProps = {
	asset: Asset;
	register: UseFormRegister<ApplicationInstanceFormData>;
	index: number;
	watch: UseFormWatch<ApplicationInstanceFormData>;
	errors: FieldErrors<ApplicationInstanceFormData>;
};
const AssetTileContent = ({
	asset,
	register,
	index,
	watch,
	errors
}: AssetTileContentProps) => {
	return (
		<div className='space-y-5'>
			<AssetTileForm
				asset={asset}
				register={register}
				index={index}
				watch={watch}
				errors={errors}
			/>
			<AssetPathsTable asset={asset} />
		</div>
	);
};
export default AssetTileContent;
