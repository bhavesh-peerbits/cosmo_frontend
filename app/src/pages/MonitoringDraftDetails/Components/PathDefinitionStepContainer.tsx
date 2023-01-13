/* eslint-disable @typescript-eslint/no-unused-vars */
import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Button, InlineLoading } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import MonitoringAsset from '@model/MonitoringAsset';
import useSaveMonitoringDraft from '@api/change-monitoring/useSaveMonitoringDraft';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import PathAssetTable from './PathAssetTable';
import AssetExpandableTile from './AssetExpandableTile';

type PathDefinitionProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
	draft: MonitoringDraft;
};

const PathDefinitionStepContainer = ({ setCurrentStep, draft }: PathDefinitionProps) => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);
	const { mutate, isLoading, isError, isSuccess, error } = useSaveMonitoringDraft();

	const [globalPaths, setGlobalPaths] = useState<{ path: string; selected?: boolean }[]>(
		[]
	);
	const [assetsData, setAssetsData] = useState<MonitoringAsset[] | undefined>(
		draft.monitoringAssets
	);
	const [assetsPath, setAssetsPath] = useState<MonitoringAsset[] | undefined>(
		draft.monitoringAssets
	);

	const saveDraft = () => {
		return mutate(
			{
				draft: {
					...draft,
					monitoringAssets: assetsData
				}
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

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
			<FullWidthColumn className='justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<InlineLoadingStatus
					{...{ isLoading: false, isSuccess, isError, error: error as ApiError }}
				/>
				<div>{isLoading && <InlineLoading />}</div>
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
					onClick={() => saveDraft()}
					// disabled={!isValid || isLoading}
				>
					{t('save-next')}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default PathDefinitionStepContainer;
