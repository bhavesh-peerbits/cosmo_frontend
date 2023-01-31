import ApiError from '@api/ApiError';
import useAddPathToAllAssetRun from '@api/change-monitoring-analyst/useAddPathToAllAssetRun';
import useAddPathToAnAssetRun from '@api/change-monitoring-analyst/useAddPathToAnAssetRun';
import useGoNextStepRun from '@api/change-monitoring-analyst/useGoNextStepRun';
import useSaveNotesRun from '@api/change-monitoring-analyst/useSaveNotesRun';
import { Toggle, TextArea, Button, Tooltip, InlineLoading, Layer } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import Run from '@model/Run';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import PathAssetTable from '@pages/MonitoringDraftDetails/Components/PathAssetTable';
import SameSetupPathTable from '@pages/MonitoringDraftDetails/Components/SameSetupPathTable';
import {
	fromRunMonitoringAssetToRunAsset,
	RunMonitoringAsset
} from '@pages/MonitoringDraftDetails/types/RunMonitoringAsset';
import { PathMonitoringDto } from 'cosmo-api/src/v1';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

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
		mutateAsync: mutateAll,
		isLoading: isLoadingAll,
		isSuccess: isSuccessAll,
		isError: isErrorAll,
		error: errorAll
	} = useAddPathToAllAssetRun();
	const {
		mutateAsync: mutateNotes,
		isLoading: isLoadingNotes,
		isSuccess: isSuccessNotes,
		isError: isErrorNotes,
		error: errorNotes
	} = useSaveNotesRun();
	const {
		mutate: mutateGoNext,
		isLoading: isLoadingGoNext,
		isSuccess: isSuccessGoNext,
		isError: isErrorGoNext,
		error: errorGoNext
	} = useGoNextStepRun();
	const { mutateAsync, isLoading, isError, isSuccess, error } = useAddPathToAnAssetRun();
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
		return Promise.all(
			globalPaths.map(path => mutateAll({ path: path.path, runId: run.id }))
		);
	};

	const savePathOnAnAssetRun = () => {
		return mutateAsync({
			runAssets: assetsData?.map(fromRunMonitoringAssetToRunAsset) ?? []
		});
	};
	const saveRunNotes = () => {
		return mutateNotes({ notes: notes || ' ', runId: run.id });
	};

	const handleSave = () => {
		return Promise.all([
			savePathOnAllAssetsRun(),
			savePathOnAnAssetRun(),
			saveRunNotes()
		]);
	};

	const handleGoNext = async () => {
		await handleSave();
		mutateGoNext({ runId: run.id });
	};

	return (
		<div className='space-y-7 pb-9 pt-5'>
			<Layer>
				<TextArea
					labelText={t('monitoringDashboard:note')}
					{...register('notes')}
					className={cx('', { 'pointer-events-none': run.status !== 'SETUP' })}
				/>
			</Layer>
			{run.status === 'SETUP' && (
				<div>
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
				</div>
			)}
			<div className='space-y-7'>
				{sameSetup && (
					<Layer>
						<SameSetupPathTable
							globalData={globalPaths}
							setGlobalData={setGlobalPaths}
							assetIds={run.runAsset.map(ma => ma.asset.id)}
							os={run.runAsset[0].asset.os}
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
								status={run.status}
							/>
						</AssetExpandableTile>
					))}
				</div>
			</div>
			{run.status === 'SETUP' && (
				<div className='justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
					<InlineLoadingStatus
						{...{
							isLoading: false,
							isSuccess: isSuccess || isSuccessAll || isSuccessNotes || isSuccessGoNext,
							isError: isError || isErrorAll || isErrorNotes || isErrorGoNext,
							error: (error || errorAll || errorNotes || errorGoNext) as ApiError
						}}
					/>
					<div>{(isLoading || isLoadingAll || isLoadingNotes) && <InlineLoading />}</div>
					<Button
						size='md'
						className='w-full md:w-fit'
						onClick={() => handleSave()}
						kind='tertiary'
						disabled={
							isLoading ||
							isLoadingAll ||
							isLoadingNotes ||
							isLoadingGoNext ||
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
						onClick={() => handleGoNext()}
						disabled={
							run.status !== 'SETUP' ||
							isLoading ||
							isLoadingAll ||
							isLoadingNotes ||
							isLoadingGoNext ||
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
				</div>
			)}
		</div>
	);
};
export default RunSetupContent;
