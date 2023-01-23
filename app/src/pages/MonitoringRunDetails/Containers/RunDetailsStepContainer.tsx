import useGetRunById from '@api/change-monitoring/useGetRunById';
import { smoothScroll } from '@components/TableOfContents/utils';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Layer } from '@carbon/react';
import { RunDtoStatusEnum } from 'cosmo-api/src/v1';
import DeltaResultContent from '../Components/DeltaResultContent';
import RunDetailsStepTile from '../Components/RunDetailsStepTile';
import RunSetupContent from '../Components/RunSetupContent';
import UploadFileContent from '../Components/UploadFileContent';

interface StatusTranslatorProps {
	stepStatus: RunDtoStatusEnum;
}

const RunDetailsStepContainer = () => {
	const { t } = useTranslation(['monitoringDashboard', 'evidenceRequest', 'runDetails']);
	const { runId = '' } = useParams();
	const { data: run } = useGetRunById(runId);
	// TODO (also fix isCurrent for RunDetailsStepTile)

	const statusMessage = ({ stepStatus }: StatusTranslatorProps) => {
		if (run?.status === stepStatus) {
			return t('evidenceRequest:current-step');
		}
		if (
			run?.status === 'SETUP' &&
			(stepStatus === 'UPLOAD' || stepStatus === 'WAITING_FOR_ANALYST')
		) {
			return t('runDetails:not-started');
		}
		if (run?.status === 'UPLOAD') {
			return stepStatus === 'SETUP'
				? t('monitoringDashboard:completed')
				: t('runDetails:not-started');
		}
		if (run?.status === 'WAITING_FOR_ANALYST') {
			return t('monitoringDashboard:completed');
		}
		return t('runDetails:not-started');
	};

	useLayoutEffect(() => {
		const selector = `*[id="tile-upload-${runId}"]`;
		smoothScroll(selector, 149);
	}, [runId]);
	if (!run) return null;

	return (
		<Layer className='space-y-5'>
			<RunDetailsStepTile
				id={`tile-setup-${runId}`}
				title='Setup'
				inCharge='Federica Bruno'
				isCurrent={run.status === 'SETUP'}
				detail={statusMessage({ stepStatus: 'SETUP' })}
			>
				<RunSetupContent run={run} />
			</RunDetailsStepTile>
			<RunDetailsStepTile
				id={`tile-upload-${runId}`}
				title={t('runDetails:file-upload')}
				isCurrent={run.status === 'UPLOAD'}
				// isFuture={run.status === 'SETUP'}
				inCharge='Federica Bruno'
				detail={statusMessage({ stepStatus: 'UPLOAD' })}
			>
				<UploadFileContent run={run} />
			</RunDetailsStepTile>
			<RunDetailsStepTile
				id={`tile-delta-${runId}`}
				title={t('runDetails:delta-result')}
				inCharge='Federica Bruno'
				isCurrent={run.status === 'WAITING_FOR_ANALYST'}
				// isFuture={run.status === 'UPLOAD' || run.status === 'SETUP'}
				detail={statusMessage({ stepStatus: 'WAITING_FOR_ANALYST' })}
			>
				<DeltaResultContent />
			</RunDetailsStepTile>
		</Layer>
	);
};
export default RunDetailsStepContainer;
