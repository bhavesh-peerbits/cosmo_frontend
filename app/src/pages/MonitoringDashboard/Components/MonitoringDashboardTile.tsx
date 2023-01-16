import { ClickableTile, Layer } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Monitoring from '@model/Monitoring';
import { formatDate } from '@i18n';
import { TranslateFrequency } from '@i18n/common/switchTranslation';

type MonitoringDashboardTileProps = {
	monitoring: Monitoring;
};
const MonitoringDashboardTile = ({ monitoring }: MonitoringDashboardTileProps) => {
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
								{TranslateFrequency(monitoring.scheduling.frequency)}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:total-runs')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{monitoring.scheduling.totalRuns}
							</p>
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
								{monitoring.scheduling.endDate
									? formatDate(monitoring.scheduling.endDate, 'short')
									: '-'}
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
							<p className='block truncate text-body-short-1'>
								{monitoring.frameworkName ?? '-'}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:control-code')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{monitoring.controlCode
									? monitoring.controlCode
									: t('evidenceRequest:no-control')}
							</p>
						</span>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default MonitoringDashboardTile;
