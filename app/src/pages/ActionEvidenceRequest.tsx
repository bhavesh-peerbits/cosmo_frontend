import useGetEvidenceRequestById from '@api/evidence-request/useGetEvidenceRequestById';
import PageHeader from '@components/PageHeader';
import { Tab, TabList, TabPanel, TabPanels, Grid, Column } from '@carbon/react';
import StickyTabs from '@components/StickyTabs';
import { useParams } from 'react-router-dom';
import EvidenceRequestDetails from '@components/EvidenceRequest/EvidenceRequestDetails';
import EvidenceRequestInfo from '@components/EvidenceRequest/EvidenceRequestInfo';
import ActionEvidenceRequestInfo from '@components/EvidenceRequest/ActionEvidenceRequestInfo';
import ActionEvidenceRequestModal from '@components/Modals/ActionEvidenceRequestModal';
import { useState } from 'react';

const ActionEvidenceRequest = () => {
	const { requestId = '' } = useParams<'requestId'>();
	const { data } = useGetEvidenceRequestById(requestId);
	const [isOpen, setIsOpen] = useState(false);
	const path = `${new Date().getFullYear()}/${data?.application.codeName}/${
		data?.workflowName
	}/${data?.code}/`.replaceAll(' ', '');

	if (!data) {
		return null;
	}
	return (
		<PageHeader
			pageTitle={`${data.code} - ${data.name}`}
			intermediateRoutes={[{ name: 'Evidence Request', to: '/evidence-request-action' }]}
		>
			<>
				<StickyTabs>
					<TabList
						contained
						aria-label='List of tabs'
						className='sticky z-10 bg-background'
					>
						<Tab className='max-w-none'>Steps</Tab>
						<Tab className='max-w-none'>Request Info</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Grid fullWidth narrow className='h-full space-y-5 py-3 md:space-y-0'>
								<Column sm={4} md={3} lg={3}>
									<div className='pl-6'>
										<EvidenceRequestDetails request={data} />
									</div>
								</Column>
								<Column sm={4} md={5} lg={13} className='pl-5 pr-3'>
									<ActionEvidenceRequestInfo
										steps={data.steps}
										currentStep={data.currentStep}
										owner={data.creator}
										setIsOpen={setIsOpen}
										path={path}
										statusRequest={data.status}
										erId={data.id}
										stepBeforeReturn={data.stepBeforeReturn}
									/>
								</Column>
							</Grid>
						</TabPanel>
						<TabPanel>
							<Grid fullWidth narrow className='h-full space-y-5 py-3 md:space-y-0'>
								<Column sm={4} md={3} lg={3}>
									<div className='pl-6'>
										<EvidenceRequestDetails request={data} />
									</div>
								</Column>
								<Column sm={4} md={5} lg={13} className='pl-5 pr-3'>
									<EvidenceRequestInfo
										stepRequest={data.steps.filter(step => step.type === 'REQUEST')[0]}
										currentStep={data.currentStep}
										status={data.status}
										disabled
										action
									/>
								</Column>
							</Grid>
						</TabPanel>
					</TabPanels>
				</StickyTabs>
				<ActionEvidenceRequestModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					steps={data.steps}
					currentStep={data.currentStep}
					erId={data.id}
				/>
			</>
		</PageHeader>
	);
};

export default ActionEvidenceRequest;
