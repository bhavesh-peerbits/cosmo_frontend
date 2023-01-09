import { Column, Grid } from '@carbon/react';
import MonitoringDraft from '@model/MonitoringDraft';
import MonitoringDraftTile from '../Components/MonitoringDraftTile';

type MonitoringDraftTileContainerProps = {
	drafts: MonitoringDraft[];
};
const MonitoringDraftTileContainer = ({ drafts }: MonitoringDraftTileContainerProps) => {
	return (
		<Grid fullWidth narrow className='pl-5'>
			<Column sm={4} md={8} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					{drafts.map(draft => (
						<Column sm={4} md={4} lg={8} xlg={4} max={4}>
							<MonitoringDraftTile draft={draft} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default MonitoringDraftTileContainer;
