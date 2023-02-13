import { RadioTile, TileGroup, Layer } from '@carbon/react';
import Script from '@model/ChangeMonitoring/Script';
import { Dispatch, SetStateAction } from 'react';
import OSScriptTileContent from './OSScriptTileContent';

type OSScriptListContainerProps = {
	scripts: Script[];
	selectedScript?: number;
	setSelectedScript: Dispatch<SetStateAction<number | undefined>>;
};

const OSScriptListContainer = ({
	scripts,
	selectedScript,
	setSelectedScript
}: OSScriptListContainerProps) => {
	return (
		<div>
			<span className='text-productive-heading-3'>{scripts[0].os}</span>
			<Layer key={scripts[0].os}>
				<TileGroup
					name='script-group'
					onChange={e => setSelectedScript(e as unknown as number)}
					defaultSelected={selectedScript}
				>
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
