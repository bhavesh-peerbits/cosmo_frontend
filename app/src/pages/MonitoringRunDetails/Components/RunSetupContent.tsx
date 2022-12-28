import { Toggle, TextArea, Button, Tooltip } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

const RunSetupContent = () => {
	const { t } = useTranslation(['runDetails', 'monitoringDashboard', 'changeMonitoring']);
	return (
		<div className='space-y-7 pb-9 pt-5'>
			<TextArea labelText={t('monitoringDashboard:note')} />
			<Toggle
				aria-label='Asset same setup'
				id='asset-same-setup'
				labelText={
					<div className='flex space-x-3'>
						<p className='text-label-1'>{t('runDetails:repeat-new-path')}</p>
						<Tooltip align='top' label={t('runDetails:repeat-path-description')}>
							<button type='button' onClick={e => e.preventDefault()}>
								<Information />
							</button>
						</Tooltip>
					</div>
				}
				labelA='No'
				labelB={t('runDetails:repeat')}
			/>
			<div className='flex justify-end space-x-5'>
				<Button kind='tertiary'>{t('runDetails:save')}</Button>
				<Button>{t('changeMonitoring:save-next')}</Button>
			</div>
		</div>
	);
};
export default RunSetupContent;
