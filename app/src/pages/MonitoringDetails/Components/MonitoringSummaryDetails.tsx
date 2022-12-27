import { useTranslation } from 'react-i18next';

const MonitoringSummaryDetails = () => {
	const { t } = useTranslation('changeMonitoring');

	const paths = ['path1', 'path2'];
	const assets = ['asset1', 'asset2'];
	return (
		<div className='space-y-5'>
			<div>
				<p className='font-bold text-productive-heading-2'>{t('monitoring-type')}</p>
				<p className='text-sm text-body-compact-1'>type</p>
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>Assets</p>
				{assets?.map(asset => (
					<p className='text-sm text-body-compact-1'>{asset}</p>
				))}
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>Framework</p>
				<p className='text-sm text-body-compact-1'>framework</p>
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>Paths</p>
				{paths?.map(path => (
					<p className='text-sm text-body-compact-1'>{path}</p>
				))}
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>{t('control-code')}</p>
				<p className='text-sm text-body-compact-1'>code</p>
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>{t('note')}</p>
				<p className='text-sm text-body-compact-1'>note</p>
			</div>
		</div>
	);
};
export default MonitoringSummaryDetails;
