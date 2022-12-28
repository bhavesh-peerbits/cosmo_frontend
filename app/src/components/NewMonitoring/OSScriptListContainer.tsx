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
		<div>
			<span className='text-productive-heading-3'>{data.os}</span>{' '}
			<Layer key={data.os}>
				<TileGroup name='os-script-group'>
					{data.script.map(script => (
						<RadioTile value={script.script} className='mt-5'>
							<OSScriptTileContent script={script} />
						</RadioTile>
					))}
				</TileGroup>
			</Layer>
		</div>
	);
};
export default OSScriptListContainer;
