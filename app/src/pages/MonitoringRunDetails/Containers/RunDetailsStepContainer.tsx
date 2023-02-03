import { smoothScroll } from '@components/TableOfContents/utils';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer } from '@carbon/react';
import { RunDtoStatusEnum } from 'cosmo-api/src/v1';
import Monitoring from '@model/Monitoring';
import Run from '@model/Run';
import useGetAllFilesAnswersInbox from '@api/change-monitoring-inbox/useGetAllFilesAnswersInbox';
import useGetAllFilesAnswer from '@api/change-monitoring-analyst/useGetAllFilesAnswer';
import useCloseCompleteRunInbox from '@api/change-monitoring-inbox/useCloseCompleteRunInbox';
import useCloseCompletedRun from '@api/change-monitoring-analyst/useCloseCompletedRun';
import DeltaResultContent from '../Components/DeltaResultContent';
import RunDetailsStepTile from '../Components/RunDetailsStepTile';
import RunSetupContent from '../Components/RunSetupContent';
import UploadFileContent from '../Components/UploadFileContent';

interface StatusTranslatorProps {
	stepStatus: RunDtoStatusEnum;
}
type RunDetailsStepProps = {
	monitoring: Monitoring;
	run: Run;
};

const RunDetailsStepContainer = ({ monitoring, run }: RunDetailsStepProps) => {
	const { t } = useTranslation(['evidenceRequest', 'runDetails']);

	// TODO (also fix isCurrent for RunDetailsStepTile)

	const statusMessage = ({ stepStatus }: StatusTranslatorProps) => {
		if (run.status === 'TERMINATED') {
			return t('runDetails:terminated');
		}
		if (run.status === 'COMPLETED') {
			return t('runDetails:completed');
		}
		if (run?.status === stepStatus) {
			return t('evidenceRequest:current-step');
		}
		if (
			run?.status === 'SETUP' &&
			(stepStatus === 'UPLOAD' ||
				stepStatus === 'WAITING_FOR_ANALYST' ||
				stepStatus === 'WAITING_FOR_FOCALPOINT')
		) {
			return t('runDetails:not-started');
		}
		if (run?.status === 'UPLOAD') {
			return stepStatus === 'SETUP'
				? t('runDetails:completed')
				: t('runDetails:not-started');
		}
		if (stepStatus === 'WAITING_FOR_ANALYST') {
			return t('runDetails:completed');
		}
		return t('runDetails:completed');
	};

	useLayoutEffect(() => {
		const selector = `*[id="tile-upload-${run.id}"]`;
		smoothScroll(selector, 149);
	}, [run.id]);
	if (!run) return null;

	const isInbox = window.location.pathname.includes('change-monitoring');

	return (
		<Layer className='space-y-5'>
			<RunDetailsStepTile
				id={`tile-setup-${run.id}`}
				title='Setup'
				inCharge={monitoring.owner.displayName}
				isCurrent={run.status === 'SETUP'}
				detail={statusMessage({ stepStatus: 'SETUP' })}
			>
				<RunSetupContent run={run} />
			</RunDetailsStepTile>
			<RunDetailsStepTile
				id={`tile-upload-${run.id}`}
				title={t('runDetails:file-upload')}
				isCurrent={run.status === 'UPLOAD'}
				inCharge={monitoring.owner.displayName}
				detail={statusMessage({ stepStatus: 'UPLOAD' })}
			>
				<Layer>
					<UploadFileContent run={run} />
				</Layer>
			</RunDetailsStepTile>
			<RunDetailsStepTile
				id={`tile-delta-${run.id}`}
				title={t('runDetails:delta-result')}
				inCharge={
					run.status === 'WAITING_FOR_FOCALPOINT'
						? run.focalPoint?.displayName || ''
						: monitoring.owner.displayName
				}
				isCurrent={run.status === 'WAITING_FOR_ANALYST'}
				detail={statusMessage({ stepStatus: run.status })}
			>
				<DeltaResultContent
					run={run}
					monitoringName={monitoring.name}
					getAllFilesFn={isInbox ? useGetAllFilesAnswersInbox : useGetAllFilesAnswer}
					closeCompleteRunFn={isInbox ? useCloseCompleteRunInbox : useCloseCompletedRun}
				/>
			</RunDetailsStepTile>
		</Layer>
	);
};
export default RunDetailsStepContainer;
