import { useTranslation } from 'react-i18next';
import { Button, SwitcherDivider, Layer, DataTableSkeleton } from '@carbon/react';
import AssetExpandableTile from '@pages/MonitoringDraftDetails/Components/AssetExpandableTile';
import Run from '@model/Run';
import { Suspense } from 'react';
import AddFileToPathModal from '../Modals/AddFileToPathModal';
import RunAssetPeriodContent from './RunAssetPeriodContent';

interface UploadFileContentProps {
	run: Run;
}

const UploadFileContent = ({ run }: UploadFileContentProps) => {
	const { t } = useTranslation(['runDetails', 'changeMonitoring']);

	return (
		<div className='space-y-7 pb-9 pt-5'>
			<div>
				{run.runAsset.map(runAsset => (
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
								<RunAssetPeriodContent old runAsset={runAsset} />
								<SwitcherDivider className='mr-7 w-auto' />
								<RunAssetPeriodContent old={false} runAsset={runAsset} />
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
				))}
			</div>
			<div className='flex justify-end space-x-5'>
				<Button size='md' kind='tertiary'>
					{t('runDetails:save')}
				</Button>
				<Button size='md'>{t('changeMonitoring:save-next')}</Button>
			</div>
		</div>
	);
};
export default UploadFileContent;
