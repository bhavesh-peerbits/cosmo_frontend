import { useTranslation } from 'react-i18next';
import { Button, SwitcherDivider, Layer, DataTableSkeleton } from '@carbon/react';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import Run from '@model/Run';
import { Suspense } from 'react';
import useCalculateDelta from '@api/change-monitoring-analyst/useCalculateDelta';
import ApiError from '@api/ApiError';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import AddFileToPathModal from '../Modals/AddFileToPathModal';
import RunAssetPeriodContent from './RunAssetPeriodContent';

interface UploadFileContentProps {
	run: Run;
}

const UploadFileContent = ({ run }: UploadFileContentProps) => {
	const { t } = useTranslation(['runDetails', 'changeMonitoring']);
	const { mutate, isError, error, isLoading, isSuccess, reset } = useCalculateDelta();

	const calculateDelta = () => {
		return mutate({ runId: run.id }, { onSuccess: () => reset() });
	};

	return (
		<div className='space-y-7 pb-9 pt-5'>
			<div>
				{run.runAsset.length > 1 ? (
					run.runAsset.map(runAsset => (
						<AssetExpandableTile
							key={`upload-${runAsset.asset.hostname}`}
							title={runAsset.asset.hostname ?? ''}
						>
							<Suspense
								fallback={
									<div className='space-y-7'>
										<DataTableSkeleton showHeader={false} />
										<DataTableSkeleton showHeader={false} />
									</div>
								}
							>
								<div className='space-y-5'>
									<RunAssetPeriodContent
										old
										runAsset={runAsset}
										canEdit={run.status === 'UPLOAD'}
										level={0}
									/>
									<SwitcherDivider className='mr-7 w-auto' />
									<RunAssetPeriodContent
										old={false}
										runAsset={runAsset}
										canEdit={run.status === 'UPLOAD'}
										level={0}
									/>
								</div>
							</Suspense>
							<Layer level={0}>
								<AddFileToPathModal
									includeLastRun
									orderNumber={`${run.orderNumber}`}
									assetId={runAsset.asset.id}
								/>
							</Layer>
						</AssetExpandableTile>
					))
				) : (
					<div className='space-y-5'>
						<RunAssetPeriodContent
							old
							runAsset={run.runAsset[0]}
							canEdit={run.status === 'UPLOAD'}
						/>
						<SwitcherDivider className='mr-7 w-auto' />
						<RunAssetPeriodContent
							old={false}
							runAsset={run.runAsset[0]}
							canEdit={run.status === 'UPLOAD'}
						/>
						<Layer level={0}>
							<AddFileToPathModal
								includeLastRun
								orderNumber={`${run.orderNumber}`}
								assetId={run.runAsset[0].asset.id}
							/>
						</Layer>
					</div>
				)}
			</div>
			{run.status === 'UPLOAD' && (
				<div className='flex justify-end space-x-5'>
					<InlineLoadingStatus
						{...{ isLoading, isSuccess, isError, error: error as ApiError }}
					/>
					<Button
						size='md'
						onClick={() => calculateDelta()}
						disabled={
							run.status !== 'UPLOAD' ||
							!run.runAsset.every(
								runAsset =>
									runAsset.runFileLinks?.length === runAsset.paths.length * 2 &&
									runAsset.runFileLinks.filter(file => file.old).length ===
										runAsset.paths.length
							)
						}
					>
						{t('changeMonitoring:save-next')}
					</Button>
				</div>
			)}
		</div>
	);
};
export default UploadFileContent;
