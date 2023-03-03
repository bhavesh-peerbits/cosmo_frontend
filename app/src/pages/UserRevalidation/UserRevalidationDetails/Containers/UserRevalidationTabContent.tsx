import RevalidationUsersContainer from '@pages/UserRevalidation/UserRevalidationDetails/Containers/RevalidationUsersContainer';
import CampaignApplication from '@model/UserRevalidation/CampaignApplication';
import { useMemo } from 'react';
import useAnswerStore from '@hooks/user-revalidation-review/useAnswerStore';
import { MeterChart } from '@carbon/charts-react';
import { interfaces } from '@carbon/charts';
import useUiStore from '@hooks/useUiStore';

interface UserRevalidationTabContentProps {
	review: CampaignApplication;
}

const UserRevalidationTabContent = ({ review }: UserRevalidationTabContentProps) => {
	const { answers } = useAnswerStore(review.id);
	const answersList = useMemo(() => [...answers.values()], [answers]);
	const { theme } = useUiStore();
	const state = useMemo(
		() => ({
			data: [
				{
					group: 'Answer Ok',
					value: answersList.filter(a => a.answerType === 'OK').length
				},
				{
					group: 'Answer Modify',
					value: answersList.filter(a => a.answerType === 'MODIFY').length
				},
				{
					group: 'Blocked',
					value: answersList.filter(a => a.answerType === 'LOCK').length
				},
				{
					group: 'Errors',
					value: answersList.filter(a => a.answerType === 'REPORT_ERROR').length
				}
				// {
				// 	group: 'Missing Answer',
				// 	value: answersList.filter(a => !a.answerType).length
				// }
			],
			options: {
				title: 'Answers recap',
				height: '130px',
				theme: theme as interfaces.ChartTheme,
				meter: {
					proportional: {
						total: answersList.length,
						unit: 'answers',
						breakdownFormatter: ({
							datasetsTotal,
							total
						}: {
							datasetsTotal: number;
							total: number;
						}) =>
							`Answers given: ${datasetsTotal} - Answers to give: ${
								total - datasetsTotal
							}`
					}
				},
				color: {
					scale: {
						'Answer Ok': '#0B96C3',
						'Answer Modify': '#008873',
						Blocked: '#5CB4A6',
						Errors: '#C7E2DC'
					}
				}
			}
		}),
		[answersList, theme]
	);

	return (
		<div className='h-fit'>
			<div className='mb-6'>
				<MeterChart data={state.data} options={state.options} />
			</div>
			<div>
				<RevalidationUsersContainer key={review.id} review={review} />
			</div>
		</div>
	);
};
export default UserRevalidationTabContent;
