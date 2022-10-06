import { Column, Grid } from '@carbon/react';
import Fade from '@components/Fade';

interface EvidenceRequestsTableViewProps {
	view: string;
}

const EvidenceRequestsTableView = ({ view }: EvidenceRequestsTableViewProps) => {
	return (
		<Fade>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={4} md={2} lg={3}>
					<div className='pl-5 md:ml-0'>filtri</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					tabella {view}
				</Column>
			</Grid>
		</Fade>
	);
};

export default EvidenceRequestsTableView;
