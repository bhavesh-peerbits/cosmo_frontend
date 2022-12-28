import { smoothScroll } from '@components/TableOfContents/utils';
import { formatDate } from '@i18n';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import RunDetailsStepTile from '../Components/RunDetailsStepTile';
import RunSetupContent from '../Components/RunSetupContent';
import UploadFileContent from '../Components/UploadFileContent';

const RunDetailsStepContainer = () => {
	const { t } = useTranslation(['monitoringDashboard', 'evidenceRequest', 'runDetails']);
	const { runId } = useParams();
	// TODO Fix selector based on the current step (also fix isCurrent for RunDetailsStepTile)
	useLayoutEffect(() => {
		const selector = `*[id="tile-upload-${runId}"]`;
		smoothScroll(selector, 149);
	}, [runId]);

	return (
		<div className='space-y-5'>
			<RunDetailsStepTile
				id={`tile-setup-${runId}`}
				title='Setup'
				inCharge='Federica Bruno'
				detail={`${t('monitoringDashboard:completed-on')} ${formatDate(
					new Date(),
					'short'
				)}`}
			>
				<RunSetupContent />
			</RunDetailsStepTile>
			<RunDetailsStepTile
				id={`tile-upload-${runId}`}
				title={t('runDetails:file-upload')}
				inCharge='Federica Bruno'
				isCurrent
				detail={t('evidenceRequest:current-step')}
			>
				<UploadFileContent />
			</RunDetailsStepTile>
			<RunDetailsStepTile
				id={`tile-delta-${runId}`}
				title='Delta'
				inCharge='Federica Bruno'
				detail={t('runDetails:not-started')}
			>
				content
			</RunDetailsStepTile>
		</div>
	);
};
export default RunDetailsStepContainer;
