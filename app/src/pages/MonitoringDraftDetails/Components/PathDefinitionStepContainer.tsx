import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Layer } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import AssetExpandableTile from './AssetExpandableTile';
import PathAssetTable from './PathAssetTable';

const PathDefinitionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);

	const fakeDataPath = [
		{
			included: true,
			path: 'path1veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylong'
		},
		{ included: false, path: 'path2' },
		{ included: true, path: 'path3' },
		{ included: true, path: 'path4' }
	];

	const [data, setData] = useState<
		{
			included: boolean;
			path: string;
		}[]
	>(fakeDataPath);

	return (
		<>
			<FullWidthColumn>
				<Toggle
					aria-label='Path toggle'
					id='path-toggle'
					labelA={t('different')}
					labelB={t('same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('asset-setup-toggle')}</p>
							<Tooltip align='top' label={t('same-setup-additional-info')}>
								<button type='button' onClick={e => e.preventDefault()}>
									<Information />
								</button>
							</Tooltip>
						</div>
					}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='space-y-7'>
				{sameSetup && (
					<Layer>
						<PathAssetTable isSameSetup data={data} canAdd setData={setData} />
					</Layer>
				)}
				<div>
					<AssetExpandableTile title='Asset'>
						<PathAssetTable data={data} assetId='1' canAdd={!sameSetup} />
					</AssetExpandableTile>
					<AssetExpandableTile title='Asset'>
						<PathAssetTable data={data} assetId='2' canAdd={!sameSetup} />
					</AssetExpandableTile>
				</div>
			</FullWidthColumn>
		</>
	);
};
export default PathDefinitionStepContainer;
