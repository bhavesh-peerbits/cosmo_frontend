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
			assetId: 'asset1',
			included: true,
			path: 'path1veryveryveryveryveryveryveryveryveryveryveryveryveryveryveryverylong'
		},
		{ assetId: 'asset1', included: false, path: 'path2' },
		{ assetId: 'asset2', included: true, path: 'path3' },
		{ assetId: 'asset2', included: true, path: 'path4' }
	];
	const [newPaths, setNewPaths] = useState<{ path: string; included: boolean }[]>([]);
	const [assetsPath, setAssetsPath] =
		useState<{ assetId?: string; path: string; included: boolean }[]>(fakeDataPath);

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
						<PathAssetTable isSameSetup data={newPaths} canAdd setData={setNewPaths} />
					</Layer>
				)}
				<div>
					<AssetExpandableTile title='Asset'>
						<PathAssetTable
							data={assetsPath.filter(path => path.assetId === 'asset1')}
							assetId='1'
							canAdd={!sameSetup}
							setData={setAssetsPath}
						/>
					</AssetExpandableTile>
					<AssetExpandableTile title='Asset'>
						<PathAssetTable
							data={assetsPath.filter(path => path.assetId === 'asset2')}
							assetId='2'
							canAdd={!sameSetup}
							setData={setAssetsPath}
						/>
					</AssetExpandableTile>
				</div>
			</FullWidthColumn>
		</>
	);
};
export default PathDefinitionStepContainer;
