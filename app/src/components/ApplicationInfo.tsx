import { Button, Column, Grid } from '@carbon/react';
import { useState } from 'react';
import GeneralInfoContainer from './GeneralInfoContainer';
import ScrollToContent from './ScrollToContent';
import TechnicalInfoContainer from './TechnicalInfoContainer';

const ApplicationInfo = () => {
	const [isDirty, setIsDirty] = useState(false);
	const [isResetting, setIsResetting] = useState(false);

	return (
		<div className='pb-7'>
			<Grid fullWidth className='h-full'>
				<Column sm={2} md={2} lg={3}>
					<div className='sticky top-[112px]'>
						<ScrollToContent
							withCheckbox={false}
							contentList={[
								{ id: 'general-info', content: 'General Info' },
								{ id: 'technical-info', content: 'Technical Info' }
							]}
						/>
					</div>
				</Column>
				<Column sm={4} md={6} lg={13} className='pt-4'>
					<div className='space-y-4'>
						<div className=' flex w-full space-x-4'>
							<Button size='md'>Save Changes</Button>
							<Button
								kind='secondary'
								size='md'
								disabled={!isDirty}
								onClick={() => setIsResetting(true)}
							>
								Discard Changes
							</Button>
						</div>
						<div className='space-y-7'>
							<div id='general-info'>
								<GeneralInfoContainer
									setIsDirty={setIsDirty}
									isResetting={isResetting}
									setIsResetting={setIsResetting}
								/>
							</div>
							<div id='technical-info'>
								<TechnicalInfoContainer
									setIsDirty={setIsDirty}
									isResetting={isResetting}
									setIsResetting={setIsResetting}
								/>
							</div>
						</div>
					</div>
				</Column>
			</Grid>
		</div>
	);
};
export default ApplicationInfo;
