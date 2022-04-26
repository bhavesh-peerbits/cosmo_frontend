import ApplicationInfo from '@components/ApplicationInfo';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { CloudDownload, Email, TrashCan } from '@carbon/react/icons';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import { useEffect, useRef, useState } from 'react';
import ProcedureInfo from '@components/ProcedureInfo';
import ApplicationChangesContainer from '@components/ApplicationChangesContainer';
import ReviewModal from '@components/ReviewModal';

const ApplicationDetail = () => {
	const [openModalReview, setOpenModalReview] = useState(false);
	const { breadcrumbSize } = useBreadcrumbSize();
	const tabRef = useRef<HTMLDivElement>(null);
	const tab = tabRef.current?.getElementsByClassName('sticky')?.[0] as HTMLElement;

	useEffect(() => {
		tab && (tab.style.top = `${breadcrumbSize}px`);
	}, [breadcrumbSize, tab]);
	return (
		<PageHeader
			pageTitle='ApplicationName'
			intermediateRoutes={[{ name: 'Management', to: '/management' }]}
			actions={[
				{
					name: 'Application Review',
					icon: Email,
					onClick: () => {
						setOpenModalReview(true);
					}
				},
				{
					name: 'Generate',
					icon: CloudDownload,
					onClick: () => {}
				},
				{
					name: 'Delete',
					icon: TrashCan,
					onClick: () => {}
				}
			]}
		>
			<div ref={tabRef} className='-mt-5 h-full'>
				<Tabs>
					<TabList
						className='sticky z-[9] bg-background shadow shadow-border-disabled'
						contained
						aria-label='List of tabs'
					>
						<Tab>Application Info</Tab>
						<Tab>Procedure Info</Tab>
						<Tab>Application Changes</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<ApplicationInfo />
						</TabPanel>
						<TabPanel>
							<ProcedureInfo />
						</TabPanel>
						<TabPanel>
							<ApplicationChangesContainer />
						</TabPanel>
					</TabPanels>
				</Tabs>
				{openModalReview ? <ReviewModal /> : ''}
			</div>
		</PageHeader>
	);
};
export default ApplicationDetail;
