import { Column, Grid } from '@carbon/react';
import GeneralInfoContainer from './GeneralInfoContainer';
import TechnicalInfoContainer from './TechnicalInfoContainer';

const ApplicationInfo = () => {
	return (
		<Grid fullWidth narrow className='h-full'>
			<Column sm={2} md={2} lg={3}>
				<div>Progress </div>
			</Column>
			<Column sm={4} md={6} lg={13}>
				<div className='space-y-7'>
					<GeneralInfoContainer />
					<TechnicalInfoContainer />
				</div>
			</Column>
		</Grid>
	);
};
export default ApplicationInfo;
