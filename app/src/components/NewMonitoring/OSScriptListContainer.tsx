import { RadioTile, TileGroup, Layer } from '@carbon/react';
import OSScriptTileContent from './OSScriptTileContent';

const OSScriptListContainer = () => {
	return (
		<div className='space-y-5'>
			<span className='text-productive-heading-3'>OS Type</span>
			<Layer>
				<TileGroup name='os-script-group'>
					<RadioTile value='c'>
						<OSScriptTileContent />
					</RadioTile>
				</TileGroup>
			</Layer>
		</div>
	);
};
export default OSScriptListContainer;
