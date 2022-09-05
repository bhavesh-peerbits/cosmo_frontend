import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import Campaign from '@model/Campaign';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@i18n';
import { mapCampaignTypeToCampaignDisplayType } from '@model/CampaignType';

interface ApplicationCampaignStatusProps {
	campaign: Campaign;
}

const ApplicationCampaignStatus = ({ campaign }: ApplicationCampaignStatusProps) => {
	const { t } = useTranslation('userRevalidation');
	const navigate = useNavigate();
	// const meterData = useMemo(
	// 	() => ({
	// 		data: [
	// 			{
	// 				group: 'Percentage of completion campaign',
	// 				value: (23.3).toFixed(2)
	// 			}
	// 		],
	// 		options: {
	// 			title: ' ',
	// 			toolbar: {
	// 				enabled: false
	// 			},
	// 			meter: {
	// 				peak: 100
	// 			},
	// 			height: '100px',
	// 			color: {
	// 				scale: {
	// 					'Percentage of completion campaign': 'blue'
	// 				}
	// 			}
	// 			// theme: theme as interfaces.ChartTheme
	// 		}
	// 	}),
	// 	[]
	// );
	return (
		<Grid className='pt-6'>
			<FullWidthColumn>
				<Button
					className='m-0 flex justify-start p-0 underline text-heading-3'
					onClick={() => navigate(`/user-revalidation/${campaign.id}`)}
					kind='ghost'
				>
					{campaign.name}
				</Button>
			</FullWidthColumn>
			<FullWidthColumn>
				<p className='text-text-secondary text-body-long-2'>{`${t('due-date')}: ${
					campaign.dueDate ? formatDate(campaign.dueDate, 'short') : '-'
				}`}</p>
			</FullWidthColumn>
			<FullWidthColumn>
				<p className='text-text-secondary text-body-long-2'>{`${t(
					'revalidation-type'
				)}: ${mapCampaignTypeToCampaignDisplayType(campaign.type)}`}</p>
			</FullWidthColumn>
			<FullWidthColumn>
				{/* <MeterChart options={meterData.options} data={meterData.data} /> TODO */}
			</FullWidthColumn>
		</Grid>
	);
};
export default ApplicationCampaignStatus;