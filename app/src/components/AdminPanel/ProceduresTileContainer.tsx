import { Column, Grid } from '@carbon/react';
import ProcedureTile from './ProcedureTile';

const ProceduresTileContainer = () => {
	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					<Column sm={4} md={3} lg={8} xlg={5} max={4}>
						<ProcedureTile />
					</Column>
				</Grid>
			</Column>
		</Grid>
	);
};
export default ProceduresTileContainer;
