import { Button, Column, Grid } from '@carbon/react';
import { useState } from 'react';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import GeneralInfoContainer from './GeneralInfoContainer';
import ScrollToContent from './ScrollToContent';
import TechnicalInfoContainer from './TechnicalInfoContainer';

const ApplicationInfo = () => {
	const { breadcrumbSize } = useBreadcrumbSize();
	const [isDirty, setIsDirty] = useState(false);
	return (
		<TableOfContents stickyOffset={breadcrumbSize * 2}>
			<h3 data-toc-id='8' style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
				Cras molestie condimentum
			</h3>

			<p>
				Elementum dui gravida non. Mauris et nisl semper, elementum quam non, lacinia
				purus. Vivamus aliquam vitae sapien volutpat efficitur.
			</p>

			<h3 data-toc-id='9' style={{ paddingBottom: '1rem', paddingTop: '2rem' }}>
				Praesent fermentum sodales
			</h3>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras molestie condimentum
				consectetur. Nulla tristique lacinia elit.
			</p>
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
							<Button kind='secondary' size='md' disabled={!isDirty}>
								Discard Changes
							</Button>
						</div>
						<div className='space-y-7'>
							<div id='general-info'>
								<GeneralInfoContainer setIsDirty={setIsDirty} />
							</div>
							<div id='technical-info'>
								<TechnicalInfoContainer />
							</div>
						</div>
					</div>
				</Column>
			</Grid>
		</TableOfContents>
		//
	);
};
export default ApplicationInfo;
