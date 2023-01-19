import Asset from '@model/Asset';
import { UseFormRegister } from 'react-hook-form';
import AssetTileForm, { ApplicationInstanceFormData } from './AssetTileForm';

type AssetTileContentProps = {
	asset: Asset;
	register: UseFormRegister<ApplicationInstanceFormData>;
	index: number;
};
const AssetTileContent = ({ asset, register, index }: AssetTileContentProps) => {
	return (
		<div className='space-y-5'>
			<AssetTileForm asset={asset} register={register} index={index} />
			<p>Here goes paths table</p>
		</div>
	);
};
export default AssetTileContent;
