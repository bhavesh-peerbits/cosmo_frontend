import { Tab, TabList, Tabs } from '@carbon/react';
import { useState } from 'react';
import ApplicationHeader from './ApplicationHeader';
import ApplicationInfo from './ApplicationInfo';

const ApplicationContainer = () => {
	const [selectedTab, setSelectedTab] = useState('');

	const contentToRender = () => {
		switch (selectedTab) {
			case 'Application Changes':
				return <div>Changes</div>;
			case 'Procedure Info':
				return <div>Procedure Information</div>;
			default:
				return <ApplicationInfo />;
		}
	};
	return (
		<div className='h-full'>
			<ApplicationHeader />
			<div className='h-full'>
				<Tabs>
					<TabList contained ariaLabel='List of tabs'>
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
