import { Grid, Column } from '@carbon/react';
import GeneralInfoContainer from './GeneralInfoContainer';

const ApplicationInfo = () => {
	return (
		<div>
			{' '}
			<Grid fullWidth narrow>
				<Column sm={2} md={2} lg={3}>
					<div>Progress </div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<div>
						<GeneralInfoContainer />
					</div>
				</Column>
			</Grid>
		</div>
	);
};
export default ApplicationInfo;
