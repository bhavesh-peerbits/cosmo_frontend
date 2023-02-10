import { MeterChart } from '@carbon/charts-react';
import SetDueDateCampaignModal from '@components/Modals/SetDueDateCampaignModal';
import { Stack, Button } from '@carbon/react';
import { memo, useMemo, useState } from 'react';
import Campaign from '@model/Campaign';
import useGetCampaignStatus from '@api/user-revalidation/useGetCampaignStatus';
import { useTranslation } from 'react-i18next';
import useUiStore from '@hooks/useUiStore';
import { interfaces } from '@carbon/charts';
import { mapCampaignLayerToCampaignDisplayLayer } from '@model/CampaignLayer';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { Edit } from '@carbon/react/icons';

const CampaignStatus = memo(({ campaign }: { campaign: Campaign }) => {
	const { id, type, layer, startDate, dueDate } = campaign;
	const { data: status = 0 } = useGetCampaignStatus(id);
	const { t } = useTranslation(['userRevalidation', 'reviewNarrative', 'modals']);
	const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false);
	const { theme } = useUiStore();

	const meterData = useMemo(
		() => ({
			data: [
				{
					group: t('userRevalidation:percentage'),
					value: (status * 100).toFixed(2)
				}
			],
			options: {
				title: ' ',
				toolbar: {
					enabled: false
				},
				meter: {
					peak: 100
				},
				height: '100px',
				color: {
					scale: {
						[t('userRevalidation:percentage')]: 'blue'
					}
				},
				theme: theme as interfaces.ChartTheme
			}
		}),
		[status, theme, t]
	);
	const statusData = useMemo(
		() => [
			{
				id: 'revalidation',
				label: `${t('userRevalidation:revalidation-type')}:`,
				value: mapCampaignTypeToCampaignDisplayType(type)
			},
			{
				id: 'layer',
				label: `${t('userRevalidation:layer')}:`,
				value: mapCampaignLayerToCampaignDisplayLayer(layer)
			},
			{
				id: 'start-date',
				label: `${t('reviewNarrative:start-date')}:`,
				value: startDate ? startDate.toLocaleDateString('it-IT') : undefined
			},
			{
				id: 'due-date',
				label: `${t('reviewNarrative:due-date')}:`,
				value: dueDate ? dueDate.toLocaleDateString('it-IT') : undefined
			}
		],
		[dueDate, layer, startDate, type, t]
	);

	return (
		<>
			{isDueDateModalOpen && (
				<SetDueDateCampaignModal
					isOpen={isDueDateModalOpen}
					setIsOpen={setIsDueDateModalOpen}
					campaignId={id}
				/>
			)}
			<h2 className='text-heading-3'>{t('userRevalidation:status')}</h2>
			<div className='text-label-1'>
				{campaign.status && t(`userRevalidation:${campaign.status}`)}
			</div>
			<MeterChart options={meterData.options} data={meterData.data} />
			<Stack gap={5}>
				{statusData.map(({ id: statusId, label, value }) =>
					statusId === 'due-date' ? (
						<div key={statusId} className='flex w-full items-center justify-between'>
							<div>
								<span className='mr-2 font-bold'>{label}</span>
								<span>{value?.toString()}</span>
							</div>
							{campaign.status === 'REVIEW_IN_PROGRESS' && (
								<Button
									size='sm'
									kind='ghost'
									hasIconOnly
									iconDescription={t('userRevalidation:change-due-date')}
									renderIcon={Edit}
									onClick={() => setIsDueDateModalOpen(true)}
								/>
							)}
						</div>
					) : (
						<div key={statusId} className='flex w-full'>
							<span className='mr-2 font-bold'>{label}</span>
							<span>{value?.toString()}</span>
						</div>
					)
				)}
			</Stack>
		</>
	);
});

export default CampaignStatus;
