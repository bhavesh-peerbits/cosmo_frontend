import { Column, Grid } from '@carbon/react';
import useAdminProcedures from '@hooks/admin-panel/useAdminProcedures';
import ProcedureTile from './ProcedureTile';

const ProceduresTileContainer = () => {
	const { procedures } = useAdminProcedures();

	return (
		<Grid fullWidth narrow className='pl-5'>
			<Column sm={4} md={8} lg={16} xlg={16} max={16}>
				<Grid fullWidth narrow condensed>
					{procedures.map(procedure => (
						<Column sm={4} md={4} lg={8} xlg={4} max={4}>
							<ProcedureTile key={procedure.id} procedure={procedure} />
						</Column>
					))}
				</Grid>
			</Column>
		</Grid>
	);
};
export default ProceduresTileContainer;
