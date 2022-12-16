import { RadioTile, TileGroup, Layer } from '@carbon/react';
import OSScriptTileContent from './OSScriptTileContent';

type OSScriptListContainerProps = {
	data: {
		os: string;
		script: {
			script: string;
			description: string;
		}[];
	};
};
// TODO Fix all values/id when BE is ready

const OSScriptListContainer = ({ data }: OSScriptListContainerProps) => {
	return (
		<div className='space-y-5'>
			<span className='text-productive-heading-3'>{data.os}</span>
			{data.script.map(script => (
				<Layer>
					<TileGroup name='os-script-group'>
						<RadioTile value='c'>
							<OSScriptTileContent script={script} />
						</RadioTile>
					</TileGroup>
				</Layer>
			))}
		</div>
	);
};
export default OSScriptListContainer;
