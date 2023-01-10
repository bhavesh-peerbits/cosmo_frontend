import { RadioTile, TileGroup, Layer } from '@carbon/react';
import Script from '@model/Script';
import OSScriptTileContent from './OSScriptTileContent';

type OSScriptListContainerProps = {
	scripts: Script[];
};
// TODO Fix all values/id when BE is ready

const OSScriptListContainer = ({ scripts }: OSScriptListContainerProps) => {
	return (
		<div>
			<span className='text-productive-heading-3'>{scripts[0].os}</span>
			<Layer key={scripts[0].os}>
				<TileGroup name='os-script-group'>
					{scripts.map(script => (
						<RadioTile value={script.id} className='mt-5'>
							<OSScriptTileContent script={script} />
						</RadioTile>
					))}
				</TileGroup>
			</Layer>
		</div>
	);
};
export default OSScriptListContainer;
