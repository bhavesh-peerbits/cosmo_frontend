import { Column, Grid } from '@carbon/react';
import Campaign from '@model/Campaign';
import ApplicationCampaignStatus from './ApplicationCampaignStatus';

interface ApplicationCampaignsContainerProps {
	campaigns: Campaign[];
}

const ApplicationCampaignsContainer = ({
	campaigns
}: ApplicationCampaignsContainerProps) => {
	return (
		<Grid fullWidth>
			<Column sm={4} md={8} lg={{ start: 2, span: 15 }}>
				<Grid fullWidth>
					{campaigns.map(campaign => (
						<Column
							key={campaign.id}
							sm={4}
							md={4}
							lg={5}
							className='flex justify-center'
						>
							<ApplicationCampaignStatus campaign={campaign} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default ApplicationCampaignsContainer;
