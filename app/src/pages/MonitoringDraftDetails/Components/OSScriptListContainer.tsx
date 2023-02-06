import { RadioTile, TileGroup, Layer } from '@carbon/react';
import NoDataMessage from '@components/NoDataMessage';
import Script from '@model/Script';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
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
	const { t } = useTranslation('changeMonitoring');
	return (
		<div>
			{scripts.length === 0 ? (
				<NoDataMessage
					className='mt-10 p-5'
					title={t('no-scripts')}
					subtitle={t('no-scripts-subtitle')}
				/>
			) : (
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
			)}
		</div>
	);
};
export default OSScriptListContainer;
