import { Column, Grid } from '@carbon/react';
import useAdminProcedures from '@hooks/admin-panel/useAdminProcedures';
import ProcedureTile from './ProcedureTile';

const ProceduresTileContainer = () => {
	const { procedures } = useAdminProcedures();

	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					{procedures.map(procedure => (
						<Column sm={4} md={3} lg={8} xlg={5} max={4}>
							<ProcedureTile key={procedure.id} procedure={procedure} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default ProceduresTileContainer;
