import { Grid, Column, Tile, Stack } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { DonutChart, MeterChart } from '@carbon/charts-react';
import { useMemo } from 'react';
import { interfaces } from '@carbon/charts';
import useGetAnswersForReview from '@api/user-revalidation/useGetAnswersForReview';
import Answer from '@model/Answer';
import Campaign from '@model/Campaign';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';
import { AnswerApiTypeEnum } from 'cosmo-api/src';
import RevalidatorsTable from './RevalidatorsTable';

interface CampaignDetailsContainerProps {
	application: Application;
	reviewId: string;
	campaign: Campaign;
}

const CampaignDetailsContainer = ({
	application,
	reviewId,
	campaign
}: CampaignDetailsContainerProps) => {
	const { t } = useTranslation('userRevalidation');
	const { data = new Map<string, Answer>() } = useGetAnswersForReview(
		campaign.id,
		reviewId
	);

	const chartsData = useMemo(() => {
		const cData = [...data.values()]
			.filter(val => Boolean(val.answerType))
			.reduce(
				(previousValue, currentValue) => ({
					...previousValue,
					[currentValue.answerType as AnswerApiTypeEnum]:
						(previousValue[currentValue.answerType as AnswerApiTypeEnum] || 0) + 1
				}),
				{} as { [key: string]: number }
			);
		return Object.entries(cData).map(([key, value]) => ({
			group: key,
			value
		}));
	}, [data]);

	const donutData = useMemo(
		() => ({
			data: chartsData,
			options: {
				title: `Answers for ${application.name}`,
				resizable: true,
				legend: {
					alignment: interfaces.Alignments.CENTER
				},
				donut: {
					center: {
						label: 'Completed',
						number: chartsData.find(d => d.group === 'OK')?.value || 0,
						numberFormatter: (value: number) => `${value} / ${data.size}`
					},
					alignment: interfaces.Alignments.CENTER
				},
				height: '300px'
			}
		}),
		[application.name, chartsData, data.size]
	);

	const meterData = useMemo(
		() => ({
			data: [
				{
					group: 'Percentage of completion campaign',
					value: (
						((chartsData.find(d => d.group === 'OK')?.value || 0) * 100) /
						data.size
					).toFixed(2)
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
						'Percentage of completion campaign': 'blue'
					}
				}
			}
		}),
		[chartsData, data.size]
	);
	const statusData = useMemo(
		() => [
			{
				id: 'revalidation',
				label: 'Revalidation Type:',
				value: mapCampaignTypeToCampaignDisplayType(campaign.type)
			},
			{
				id: 'layer',
				label: 'Layer:',
				value: campaign.layer
			},
			{
				id: 'start-date',
				label: 'Start Date:',
				value: campaign.startDate
			},
			{
				id: 'due-date',
				label: 'Due Date:',
				value: campaign.dueDate
			}
		],
		[campaign.dueDate, campaign.layer, campaign.startDate, campaign.type]
	);
	return (
		<Grid className='space-y-5 lg:space-y-0'>
			<Column lg={11} md={8} sm={4}>
				<Tile className='bg-background'>
					<p className='text-heading-3'>{t('revalidators')} (N)</p>
					<RevalidatorsTable revalidators={application.delegates} />
				</Tile>
			</Column>
			<Column lg={5} md={8} sm={4} className='h-full space-y-5 pb-5'>
				<Tile className='bg-background'>
					<h2 className='text-heading-3'>Status</h2>
					<MeterChart options={meterData.options} data={meterData.data} />
					<Stack gap={5}>
						{statusData.map(({ id, label, value }) => (
							<div key={id} className='flex w-full'>
								<span className='mr-2 font-bold'>{label}</span>
								<span>{value?.toString()}</span>
							</div>
						))}
					</Stack>
				</Tile>

				<Tile className='bg-background'>
					<DonutChart data={donutData.data} options={donutData.options} />
				</Tile>
			</Column>
		</Grid>
	);
};
export default CampaignDetailsContainer;
