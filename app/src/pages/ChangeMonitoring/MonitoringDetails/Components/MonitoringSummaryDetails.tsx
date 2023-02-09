import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { useTranslation } from 'react-i18next';
import { UnorderedList, ListItem } from '@carbon/react';
import Monitoring from '@model/Monitoring';
import GetSchedulingDisplayInfo from '@i18n/common/displaySchedulingInfo';

type MonitoringSummaryDetailsProps = {
	monitoring: Monitoring;
};
const MonitoringSummaryDetails = ({ monitoring }: MonitoringSummaryDetailsProps) => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const { breadcrumbSize } = useBreadcrumbSize();

	return (
		<div className='sticky space-y-5' style={{ top: breadcrumbSize + 24 }}>
			<div className='flex flex-col'>
				<span className='text-heading-2'>{t('changeMonitoring:monitoring-type')}</span>
				<span className='text-text-secondary text-body-short-1'>
					{monitoring?.type === 'AUTOMATIC'
						? t('changeMonitoring:automatic')
						: t('changeMonitoring:manual')}
				</span>
			</div>
			{!!monitoring?.monitoringAssets?.length && (
				<div className='flex flex-col'>
					<span className='text-heading-2'>Assets</span>
					<UnorderedList nested className='ml-4'>
						{monitoring.monitoringAssets.map(ma => (
							<ListItem className='break-words'>{ma.asset.hostname}</ListItem>
						))}
					</UnorderedList>
				</div>
			)}
			{monitoring?.frameworkLeafsCodes && (
				<div className='flex flex-col'>
					<span className='text-heading-2'>{t('evidenceRequest:framework-code')}</span>
					<UnorderedList nested className='ml-4'>
						{monitoring.frameworkLeafsCodes.split('-').map(code => (
							<ListItem className='break-words'>{code}</ListItem>
						))}
					</UnorderedList>
				</div>
			)}
			{monitoring?.frameworkLeafsName && (
				<div className='flex flex-col'>
					<span className='text-heading-2'>{t('evidenceRequest:framework-name')}</span>
					<UnorderedList nested className='ml-4'>
						{monitoring.frameworkLeafsName.split('-').map(name => (
							<ListItem className='break-words'>{name}</ListItem>
						))}
					</UnorderedList>
				</div>
			)}
			{monitoring?.script && (
				<div className='flex flex-col'>
					<span className='text-heading-2'>Script</span>
					<span className='text-body-short-1'>{monitoring.script.name}</span>
				</div>
			)}
			{monitoring?.scheduling && (
				<div className='flex flex-col'>
					<span className='text-heading-2'>{t('changeMonitoring:scheduling')}</span>
					<span className='text-body-short-1'>
						{GetSchedulingDisplayInfo(monitoring.scheduling)}
					</span>
				</div>
			)}
			{monitoring?.note && (
				<div>
					<p className='font-bold text-productive-heading-2'>
						{t('changeMonitoring:note')}
					</p>
					<p className='text-sm text-body-compact-1'>{monitoring.note}</p>
				</div>
			)}
		</div>
	);
};
export default MonitoringSummaryDetails;
