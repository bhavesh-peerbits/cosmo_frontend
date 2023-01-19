import Asset from '@model/Asset';
import AssetTileForm from './AssetTileForm';

type AssetTileContentProps = {
	asset: Asset;
};
const AssetTileContent = ({ asset }: AssetTileContentProps) => {
	return (
		<div className='space-y-5'>
			<AssetTileForm asset={asset} />
			<p>Here goes paths table</p>
		</div>
	);
};
export default AssetTileContent;
