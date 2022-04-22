import { Tab, TabList, Tabs } from '@carbon/react';
import { useState } from 'react';
import ApplicationChangesContainer from './ApplicationChangesContainer';
import ApplicationHeader from './ApplicationHeader';
import ApplicationInfo from './ApplicationInfo';
import ProcedureInfo from './ProcedureInfo';

const ApplicationContainer = () => {
	const [selectedTab, setSelectedTab] = useState('');

	const contentToRender = () => {
		switch (selectedTab) {
			case 'Application Changes':
				return <ApplicationChangesContainer />;
			case 'Procedure Info':
				return <ProcedureInfo />;
			default:
				return <ApplicationInfo />;
		}
	};
	return (
		<div className='h-full'>
			<ApplicationHeader />
			<div className='h-full'>
				<Tabs>
					<TabList contained aria-label='Tab List'>
						<Tab
							selected
							onKeyDown={() => setSelectedTab('Application Info')}
							onClick={() => setSelectedTab('Application Info')}
						>
							Application Info
						</Tab>
						<Tab
							selected={false}
							onKeyDown={() => setSelectedTab('Procedure Info')}
							onClick={() => setSelectedTab('Procedure Info')}
						>
							Procedure Info
						</Tab>
						<Tab
							selected={false}
							onKeyDown={() => setSelectedTab('Procedure Info')}
							onClick={() => setSelectedTab('Application Changes')}
						>
							Application Changes
						</Tab>
					</TabList>
					<div className='h-full pt-7'>{contentToRender()}</div>
				</Tabs>
			</div>
		</div>
	);
};

export default ApplicationContainer;
