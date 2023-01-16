import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { useTranslation } from 'react-i18next';
import { UnorderedList, ListItem } from '@carbon/react';
import Monitoring from '@model/Monitoring';

type MonitoringSummaryDetailsProps = {
	monitoring: Monitoring;
};
const MonitoringSummaryDetails = ({ monitoring }: MonitoringSummaryDetailsProps) => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const { breadcrumbSize } = useBreadcrumbSize();

	return (
		<div className='sticky space-y-5' style={{ top: breadcrumbSize + 24 }}>
			<div>
				<p className='font-bold text-productive-heading-2'>
					{t('changeMonitoring:monitoring-type')}
				</p>
				<p className='text-sm text-body-compact-1'>
					{monitoring?.type
						? t('changeMonitoring:automatic')
						: t('changeMonitoring:manual')}
				</p>
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>Assets</p>
				{monitoring?.monitoringAssets?.map(asset => (
					<p className='text-sm text-body-compact-1'>{asset.asset.hostname}</p>
				))}
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>
					{t('evidenceRequest:framework-name')}
				</p>
				<p className='text-sm text-body-compact-1'>{monitoring.frameworkLeafsName}</p>
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>
					{t('evidenceRequest:framework-code')}
				</p>
				<p className='text-sm text-body-compact-1'>{monitoring.frameworkLeafsCodes}</p>
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>Paths</p>
				{monitoring?.monitoringAssets?.map(asset => (
					<p className='text-sm text-body-compact-1'>
						{asset.paths.map(path => (
							<UnorderedList nested className='ml-4'>
								<ListItem className='break-words'>{path.path}</ListItem>
							</UnorderedList>
						))}
					</p>
				))}
			</div>
			<div>
				<p className='font-bold text-productive-heading-2'>
					{t('changeMonitoring:control-code')}
				</p>
				<p className='text-sm text-body-compact-1'>
					{monitoring?.controlCode.split('-').map(code => (
						<UnorderedList nested className='ml-4'>
							<ListItem className='break-words'>{code}</ListItem>
						</UnorderedList>
					))}
				</p>
			</div>
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
