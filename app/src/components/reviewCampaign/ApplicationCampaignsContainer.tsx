import { Column, Grid } from '@carbon/react';
import ApplicationCampaignStatus from './ApplicationCampaignStatus';

const ApplicationCampaignsContainer = () => {
	return (
		<Grid fullWidth>
			<Column sm={4} md={8} lg={{ start: 2, span: 15 }}>
				<Grid fullWidth>
					<Column sm={4} md={4} lg={5}>
						<ApplicationCampaignStatus />
					</Column>
					<Column sm={4} md={4} lg={5}>
						<ApplicationCampaignStatus />
					</Column>
					<Column sm={4} md={4} lg={5}>
						<ApplicationCampaignStatus />
					</Column>
					<Column sm={4} md={4} lg={5}>
						<ApplicationCampaignStatus />
					</Column>
				</Grid>
			</Column>
		</Grid>
	);
};
export default ApplicationCampaignsContainer;
