import {
	Column,
	Grid,
	Layer,
	Search,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from '@carbon/react';
import Fade from '@components/Fade';
import Centered from '@components/Centered';
import NoDataMessage from '@components/NoDataMessage';
import EvidenceRequest from '@model/EvidenceRequest';
import EvidenceRequestTileContainer from './EvidenceRequestTileContainer';

const SearchBar = () => {
	return (
		<Layer className='ml-5 w-full'>
			<Search
				size='lg'
				labelText='Search Request Name'
				placeholder='Search Request Name'
			/>
		</Layer>
	);
};

const RequestPanel = ({
	status,
	requests
}: {
	status: string;
	requests: EvidenceRequest[];
}) => {
	const reqs = requests.filter(req => (status ? req.status === status : true));
	return (
		<Grid fullWidth narrow className='h-full'>
			<Column sm={4} md={8} lg={16}>
				<div className='flex flex-col space-y-7'>
					<div className='flex w-full '>
						<SearchBar />
					</div>
					<div>
						{reqs.length === 0 ? (
							<Fade>
								<Centered>
									<NoDataMessage title='No Requests' />
								</Centered>
							</Fade>
						) : (
							<EvidenceRequestTileContainer elements={reqs} />
						)}
					</div>
				</div>
			</Column>
		</Grid>
	);
};

const EvidenceRequestTileView = () => {
	const requests = [
		{
			id: 1,
			name: 'long long long Name',
			type: 'type',
			workflowtype: 'wftype',
			applications: [{ name: 'ciao' }, { name: 'ciao2' }],
			status: 'Completed'
		},
		{
			id: 2,
			name: 'long long long Name',
			type: 'type',
			workflowtype: 'wftype',
			applications: [{ name: 'ciao' }, { name: 'ciao2' }],
			status: 'Ongoing'
		},
		{
			id: 3,
			name: 'long long long Name',
			type: 'type',
			workflowtype: 'wftype',
			applications: [{ name: 'ciao' }, { name: 'ciao2' }],
			status: 'Draft'
		},
		{
			id: 4,
			name: 'long long long Name',
			type: 'type',
			workflowtype: 'wftype',
			applications: [{ name: 'ciao' }, { name: 'ciao2' }],
			status: 'Draft'
		}
	];

	return (
		<Tabs>
			<TabList aria-label='Filter Request' className='mb-5 '>
				<Tab>All </Tab>
				<Tab>Draft</Tab>
				<Tab>Ongoing</Tab>
				<Tab>Completed</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>{RequestPanel({ status: '', requests })}</TabPanel>
				<TabPanel>{RequestPanel({ status: 'Draft', requests })}</TabPanel>
				<TabPanel>{RequestPanel({ status: 'Ongoing', requests })}</TabPanel>
				<TabPanel>{RequestPanel({ status: 'Completed', requests })}</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default EvidenceRequestTileView;
