import { ClickableTile, Layer } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Monitoring from '@model/Monitoring';
import { formatDate } from '@i18n';

type InboxMonitoringTileProps = {
	monitoring: Monitoring;
};
const InboxMonitoringTile = ({ monitoring }: InboxMonitoringTileProps) => {
	// TODO Check info, control code
	const { t } = useTranslation([
		'changeMonitoring',
		'monitoringDashboard',
		'evidenceRequest'
	]);
	const navigate = useNavigate();
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(monitoring.id)} className='mb-5'>
				<div className='space-y-3'>
					<p className='block truncate line-clamp-1 text-heading-2'>{monitoring.name}</p>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:frequency')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{monitoring.scheduling.frequency}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:total-runs')}:
							</p>
							<p className='block truncate text-body-short-1'>{monitoring.numberOfRun}</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('monitoringDashboard:current-run')}:
							</p>
							<p className='block truncate text-body-short-1'>{monitoring.currentRun}</p>
						</span>
					</div>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:start-date')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{formatDate(monitoring.scheduling.startDate, 'short')}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:end-date')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{formatDate(monitoring.scheduling.endDate, 'short')}
							</p>
						</span>
					</div>
					<span className='flex space-x-2'>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							{t('monitoringDashboard:status')}:
						</p>
						<p className='block truncate text-body-short-1'>{monitoring.status}</p>
					</span>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								Framework:
							</p>
							<p className='block truncate text-body-short-1'>{monitoring.framework}</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:controls')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{monitoring.controls
									? monitoring.controls?.join(', ')
									: t('evidenceRequest:no-control')}
							</p>
						</span>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default InboxMonitoringTile;
