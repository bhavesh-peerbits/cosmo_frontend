import ApiError from '@api/ApiError';
import useAddPathToAllAssetRun from '@api/change-monitoring/useAddPathToAllAssetRun';
import useAddPathToAnAssetRun from '@api/change-monitoring/useAddPathToAnAssetRun';
import useSaveNotesRun from '@api/change-monitoring/useSaveNotesRun';
import { Toggle, TextArea, Button, Tooltip, InlineLoading, Layer } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import Run from '@model/Run';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import PathAssetTable from '@pages/MonitoringDraftDetails/Components/PathAssetTable';
import SameSetupPathTable from '@pages/MonitoringDraftDetails/Components/SameSetupPathTable';
import { RunMonitoringAsset } from '@pages/MonitoringDraftDetails/types/RunMonitoringAsset';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RunSetupContentProps {
	run: Run;
}

interface NotesForm {
	notes: string;
}

const RunSetupContent = ({ run }: RunSetupContentProps) => {
	const { t } = useTranslation(['runDetails', 'monitoringDashboard', 'changeMonitoring']);
	const [sameSetup, setSameSetup] = useState(false);
	const {
		mutate: mutateAll,
		isLoading: isLoadingAll,
		isSuccess: isSuccessAll,
		isError: isErrorAll,
		error: errorAll
	} = useAddPathToAllAssetRun();
	const {
		mutate: mutateNotes,
		isLoading: isLoadingNotes,
		isSuccess: isSuccessNotes,
		isError: isErrorNotes,
		error: errorNotes
	} = useSaveNotesRun();
	const { mutate, isLoading, isError, isSuccess, error } = useAddPathToAnAssetRun();
	const [globalPaths, setGlobalPaths] = useState<PathMonitoringDto[]>([]);
	const [assetsData, setAssetsData] = useState<RunMonitoringAsset[] | undefined>(
		run.runAsset
	);

	const { register, watch } = useForm<NotesForm>({
		mode: 'onChange',
		defaultValues: { notes: run.notes }
	});
	const notes = watch('notes');
	const savePathOnAllAssetsRun = () => {
		globalPaths.forEach(path => mutateAll({ path: path.path, runId: run.id }));
	};

	const savePathOnAnAssetRun = () => {
		assetsData
			?.map(ad => ({
				assetId: ad.asset.id,
				paths: ad.paths
					.map(p => p.path)
					.filter(
						pt =>
							run.runAsset
								.find(ra => ra.asset.id === ad.asset.id)
								?.paths.map(p => p.path)
								.indexOf(pt) === -1
					)
			}))
			.filter(toSave => toSave.paths?.length)
			.forEach(assetAndPaths =>
				assetAndPaths.paths.forEach(assetPath =>
					mutate({ assetId: assetAndPaths.assetId, path: assetPath, runId: run.id })
				)
			);
	};

	const saveRunNotes = () => {
		mutateNotes({ notes, runId: run.id });
	};

	const handleSave = () => {
		savePathOnAllAssetsRun();
		savePathOnAnAssetRun();
		saveRunNotes();
	};

	return (
		<div className='space-y-7 pb-9 pt-5'>
			<TextArea labelText={t('monitoringDashboard:note')} {...register('notes')} />
			<FullWidthColumn>
				<Toggle
					aria-label='Path toggle'
					id='path-toggle'
					labelA={t('changeMonitoring:different')}
					labelB={t('changeMonitoring:same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('changeMonitoring:asset-setup-toggle')}</p>
							<Tooltip
								align='top'
								label={t('changeMonitoring:same-setup-additional-info')}
							>
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
							assetIds={run.runAsset.map(ma => ma.asset.id)}
						/>
					</Layer>
				)}

				<div>
					{run.runAsset.map(ma => (
						<AssetExpandableTile title={ma.asset.hostname || ''} key={ma.id}>
							<PathAssetTable
								assetData={assetsData}
								setAssetData={setAssetsData}
								canAdd={!sameSetup}
								assetId={ma.asset.id || ''}
							/>
						</AssetExpandableTile>
					))}
				</div>
			</FullWidthColumn>
			<FullWidthColumn className='justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<InlineLoadingStatus
					{...{
						isLoading: false,
						isSuccess: isSuccess || isSuccessAll || isSuccessNotes,
						isError: isError || isErrorAll || isErrorNotes,
						error: (error || errorAll || errorNotes) as ApiError
					}}
				/>
				<div>{(isLoading || isLoadingAll || isLoadingNotes) && <InlineLoading />}</div>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={() => handleSave()}
					disabled={
						isLoading ||
						isLoadingAll ||
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
					{t('runDetails:save')}
				</Button>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={() => handleSave()}
					disabled={
						isLoading ||
						isLoadingAll ||
						isLoadingNotes ||
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
					{t('changeMonitoring:save-next')}
				</Button>
			</FullWidthColumn>
		</div>
	);
};
export default RunSetupContent;
