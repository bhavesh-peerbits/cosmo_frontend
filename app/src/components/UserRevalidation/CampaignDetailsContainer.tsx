import { Grid, Column, Tile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { DonutChart } from '@carbon/charts-react';
import { ReactNode, useMemo } from 'react';
import { interfaces } from '@carbon/charts';
import Campaign from '@model/Campaign';
import useUiStore from '@hooks/useUiStore';
import useAnswers from '@hooks/user-revalidation/useAnswers';
import RevalidatorsTable from './RevalidatorsTable';

interface CampaignDetailsContainerProps {
	application: Application;
	reviewId: string;
	campaign: Campaign;
	children: ReactNode;
}

const CampaignDetailsContainer = ({
	application,
	reviewId,
	campaign,
	children
}: CampaignDetailsContainerProps) => {
	const { t } = useTranslation('userRevalidation');
	const { theme } = useUiStore();
	const {
		answers: data,
		filters,
		setFilters
	} = useAnswers({ campaignId: campaign.id, reviewId });

	const chartsData = useMemo(() => {
		const cData = [...data.values()].reduce(
			(previousValue, currentValue) => ({
				...previousValue,
				[currentValue.answerType || 'Not completed']:
					(previousValue[currentValue.answerType || 'Not completed'] || 0) + 1
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
				title: `${t('answers-for')} ${application.name}`,
				resizable: true,
				legend: {
					alignment: interfaces.Alignments.CENTER
				},
				donut: {
					center: {
						label: t('completed'),
						number: [...data.values()].filter(val => Boolean(val.answerType)).length,
						numberFormatter: (value: number) => `${value} / ${data.length}`
					},
					alignment: interfaces.Alignments.CENTER
				},
				height: '300px',
				theme: theme as interfaces.ChartTheme
			}
		}),
		[theme, application.name, chartsData, data, t]
	);

	return (
		<Grid className='space-y-5 lg:space-y-0'>
			<Column lg={11} md={8} sm={4}>
				<Tile className='bg-background'>
					<p className='text-heading-3'>
						{t('revalidators')} (
						{[...data.values()].filter(d => Boolean(d.revalidationUser)).length})
					</p>
					<RevalidatorsTable
						answers={[...data.values()]}
						dueDate={campaign.dueDate}
						filters={filters}
						setFilters={setFilters}
					/>
				</Tile>
			</Column>
			<Column lg={5} md={8} sm={4} className='h-full space-y-5 pb-5'>
				<Tile className='bg-background'>{children}</Tile>

				<Tile className='bg-background'>
					<DonutChart data={donutData.data} options={donutData.options} />
				</Tile>
			</Column>
		</Grid>
	);
};
export default CampaignDetailsContainer;
