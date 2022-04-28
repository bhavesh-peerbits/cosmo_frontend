import { Button, Column, Grid } from '@carbon/react';
import GeneralInfoContainer from './GeneralInfoContainer';
import ScrollToContent from './ScrollToContent';
import TechnicalInfoContainer from './TechnicalInfoContainer';

const ApplicationInfo = () => {
	return (
		<div className='pb-7'>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={2} md={2} lg={3}>
					<div className='sticky top-[112px]'>
						<ScrollToContent
							contentList={[
								{ id: 'general-info', content: 'General Info' },
								{ id: 'technical-info', content: 'Technical Info' }
							]}
						/>
					</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<div className='space-y-7'>
						<div className=' flex w-full space-x-4'>
							<Button size='md'>Save Changes</Button>
							<Button kind='secondary' size='md'>
								Discard Changes
							</Button>
						</div>
						<div id='general-info'>
							<GeneralInfoContainer />
						</div>
						<div id='technical-info'>
							<TechnicalInfoContainer />
						</div>
					</div>
				</Column>
			</Grid>
		</div>
	);
};
export default ApplicationInfo;
