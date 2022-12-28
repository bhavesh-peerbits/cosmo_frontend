import { formatDate } from '@i18n';
import { useTranslation } from 'react-i18next';
import RunDetailsStepTile from '../Components/RunDetailsStepTile';

const RunDetailsStepContainer = () => {
	const { t } = useTranslation(['monitoringDashboard', 'evidenceRequest', 'runDetails']);
	return (
		<div className='space-y-5'>
			<RunDetailsStepTile
				title='Setup'
				inCharge='Federica Bruno'
				detail={`${t('monitoringDashboard:completed-on')} ${formatDate(
					new Date(),
					'short'
				)}`}
			>
				<div>content</div>
			</RunDetailsStepTile>
			<RunDetailsStepTile
				title={t('runDetails:file-upload')}
				inCharge='Federica Bruno'
				detail={t('evidenceRequest:current-step')}
			>
				<div>content</div>
			</RunDetailsStepTile>
			<RunDetailsStepTile
				title='Delta'
				inCharge='Federica Bruno'
				detail={t('runDetails:not-started')}
			>
				<div>content</div>
			</RunDetailsStepTile>
		</div>
	);
};
export default RunDetailsStepContainer;
