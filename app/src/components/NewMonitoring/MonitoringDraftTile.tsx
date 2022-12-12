import { ClickableTile, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MonitoringDraftTile = () => {
	const navigate = useNavigate();
	const { t } = useTranslation(['changeMonitoring', 'modals']);
	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate('')} className='mb-5'>
				<div className='space-y-3'>
					<p className='block truncate line-clamp-1 text-heading-2'>Monitoring Name</p>
					<div className='space-y-2'>
						{' '}
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('modals:application')}:
							</p>
							<p className='block truncate text-body-short-1'>app name</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:app-instance')}:
							</p>
							<p className='block truncate text-body-short-1'>app instance</p>
						</span>
					</div>
					<span className='flex space-x-2'>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							Assets:
						</p>
						<p className='block truncate text-body-short-1'>number</p>
					</span>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								Framework:
							</p>
							<p className='block truncate text-body-short-1'>framework</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('changeMonitoring:control-code')}:
							</p>
							<p className='block truncate text-body-short-1'>control code</p>
						</span>
					</div>
					<span className='flex space-x-2'>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							Script:
						</p>
						<p className='block truncate text-body-short-1'>script</p>
					</span>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default MonitoringDraftTile;
