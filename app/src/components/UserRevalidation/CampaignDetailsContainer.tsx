import { Grid, Column, Tile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import { DonutChart } from '@carbon/charts-react';
import { ReactNode, useEffect, useMemo } from 'react';
import { interfaces } from '@carbon/charts';
import Campaign from '@model/Campaign';
import useUiStore from '@hooks/useUiStore';
import useGetAnswersForReview from '@api/user-revalidation/useGetAnswersForReview';
import Answer from '@model/Answer';
import ModifyAnswerModal from '@components/Modals/ModifyAnswerModal';
import { useSetRecoilState } from 'recoil';
import RevalidationReminderStore from '@store/user-revalidation/RevalidationReminderStore';
import User from '@model/User';
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
	const { data = new Map<string, Answer>() } = useGetAnswersForReview(
		campaign.id,
		reviewId
	);
	const setReminderData = useSetRecoilState(RevalidationReminderStore);

	useEffect(() => {
		const users: User[] = [];
		[...data.values()].forEach(ans => {
			if (!ans.givenAt) {
				ans.delegated?.forEach(us => users.push(us));
				ans.revalidationUser && users.push(ans.revalidationUser);
			}
		});
		setReminderData(old => ({
			...old,
			userApp: old.userApp.set(application.id, {
				users: users.filter(
					(user, i, arr) => arr.findIndex(us => us.id === user.id) === i
				),
				appId: application.id
			})
		}));
	}, [application.id, data, setReminderData]);

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
						numberFormatter: (value: number) => `${value} / ${data.size}`
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
		<>
			<Grid className='space-y-5 lg:space-y-0'>
				<Column lg={11} md={8} sm={4}>
					<Tile className='bg-background'>
						<p className='text-heading-3'>
							{t('revalidators')} (
							{
								[...data.values()]
									.map(u => u.revalidationUser?.id)
									.filter((value, index, self) => self.indexOf(value) === index).length
							}
							)
						</p>
						<RevalidatorsTable
							answers={[...data.values()]}
							dueDate={campaign.dueDate}
							campaignType={campaign.type}
							reviewId={reviewId}
							status={campaign.status}
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
			<ModifyAnswerModal />
		</>
	);
};
export default CampaignDetailsContainer;
