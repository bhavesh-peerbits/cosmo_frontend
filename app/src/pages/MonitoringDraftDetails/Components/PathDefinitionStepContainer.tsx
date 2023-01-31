import FullWidthColumn from '@components/FullWidthColumn';
import { Toggle, Tooltip, Button, InlineLoading, Layer } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MonitoringDraft from '@model/MonitoringDraft';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import useSaveDraftPath from '@api/change-monitoring-analyst/useSaveDraftPath';
import PathAssetTable from './PathAssetTable';
import AssetExpandableTile from './AssetExpandableTile';
import SameSetupPathTable from './SameSetupPathTable';
import { RunMonitoringAsset } from '../types/RunMonitoringAsset';

type PathDefinitionProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
	draft: MonitoringDraft;
};

const PathDefinitionStepContainer = ({ setCurrentStep, draft }: PathDefinitionProps) => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);
	const { mutate, isLoading, isError, isSuccess, error } = useSaveDraftPath();
	const [globalPaths, setGlobalPaths] = useState<PathMonitoringDto[]>([]);
	const [assetsData, setAssetsData] = useState<RunMonitoringAsset[] | undefined>(
		draft.monitoringAssets
	);

	const saveDraft = () => {
		return mutate(
			{
				monitoringAssets: assetsData?.map(asset => {
					return { ...asset, paths: [...asset.paths, ...globalPaths] };
				})
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

	useEffect(() => {
		setGlobalPaths([]);
		setAssetsData(draft.monitoringAssets);
	}, [setGlobalPaths, sameSetup, setAssetsData, draft.monitoringAssets]);

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
						<SameSetupPathTable
							globalData={globalPaths}
							setGlobalData={setGlobalPaths}
							assetIds={draft.monitoringAssets?.map(ma => ma.asset.id) || []}
							os={draft.monitoringAssets?.[0].asset.os}
						/>
					</Layer>
				)}

				<div>
					{draft.monitoringAssets?.map(ma => (
						<AssetExpandableTile title={ma.asset.hostname || ''} key={ma.id}>
							<PathAssetTable
								assetData={assetsData}
								canAdd={!sameSetup}
								assetId={ma.asset.id || ''}
								setAssetData={setAssetsData}
							/>
						</AssetExpandableTile>
					))}
				</div>
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
					disabled={
						isLoading ||
						(!sameSetup &&
							(!assetsData?.length ||
								!assetsData?.every(
									assetData =>
										assetData.paths.length && assetData.paths.some(p => p.selected)
								))) ||
						(sameSetup &&
							assetsData?.some(asset => asset.paths.length === 0) &&
							!globalPaths.length) ||
						(globalPaths.length > 0 && !globalPaths?.some(p => p.selected))
					}
				>
					{t('save-next')}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default PathDefinitionStepContainer;
