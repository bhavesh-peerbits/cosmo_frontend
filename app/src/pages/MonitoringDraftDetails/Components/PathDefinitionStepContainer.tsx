/* eslint-disable @typescript-eslint/no-unused-vars */
import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Layer, Button } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import MonitoringAsset from '@model/MonitoringAsset';
import AssetExpandableTile from './AssetExpandableTile';
import PathAssetTable from './PathAssetTable';

type PathDefinitionProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
	draft: MonitoringDraft;
};

const PathDefinitionStepContainer = ({ setCurrentStep, draft }: PathDefinitionProps) => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);

	const [globalPaths, setGlobalPaths] = useState<{ path: string; selected?: boolean }[]>(
		[]
	);
	const [assetsData, setAssetsData] = useState<MonitoringAsset[] | undefined>(
		draft.monitoringAssets
	);
	const [assetsPath, setAssetsPath] = useState<MonitoringAsset[] | undefined>(
		draft.monitoringAssets
	);

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
				{/* {sameSetup && (
					<Layer>
						<PathAssetTable
							globalData={globalPaths}
							canAdd
							setGlobalData={setGlobalPaths}
						/>
					</Layer>
				)} */}
				{draft.monitoringAssets?.map(ma => (
					<AssetExpandableTile title={ma.asset.hostname || ''}>
						<PathAssetTable
							assetData={assetsData}
							setAssetData={setAssetsData}
							canAdd={!sameSetup}
							assetId={ma.asset.id || ''}
						/>
					</AssetExpandableTile>
				))}
				{/*

					<AssetExpandableTile title='Asset'>
						<PathAssetTable
							data={assetsPath.filter(path => path.assetId === 'asset2')}
							assetId='2'
							canAdd={!sameSetup}
							setData={setAssetsPath}
						/>
					</AssetExpandableTile>
				</div> */}
			</FullWidthColumn>
			{/* <FullWidthColumn className='justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<Button
					size='md'
					kind='secondary'
					className='w-full md:w-fit'
					onClick={() => setCurrentStep(old => old - 1)}
				>
					{t('back')}
				</Button>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={handleSubmit(saveDraft)}
					disabled={!isValid || isLoading}
				>
					{t('save-next')}
					{isLoading && <InlineLoading />}
				</Button>
			</FullWidthColumn> */}
		</>
	);
};
export default PathDefinitionStepContainer;
