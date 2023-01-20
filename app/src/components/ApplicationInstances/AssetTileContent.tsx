import Asset from '@model/Asset';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import AssetPathsTable from './AssetPathsTable';
import AssetTileForm, { ApplicationInstanceFormData } from './AssetTileForm';

type AssetTileContentProps = {
	asset: Asset;
	register: UseFormRegister<ApplicationInstanceFormData>;
	index: number;
	watch: UseFormWatch<ApplicationInstanceFormData>;
};
const AssetTileContent = ({ asset, register, index, watch }: AssetTileContentProps) => {
	return (
		<div className='space-y-5'>
			<AssetTileForm asset={asset} register={register} index={index} watch={watch} />
			<AssetPathsTable asset={asset} />
		</div>
	);
};
export default AssetTileContent;
