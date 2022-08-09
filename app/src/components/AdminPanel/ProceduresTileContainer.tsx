import useGetProcedures from '@api/procedures/useGetProcedures';
import { Column, Grid } from '@carbon/react';
import Procedure from '@model/Procedure';
import ProcedureTile from './ProcedureTile';

const ProceduresTileContainer = () => {
	const { data: procedures = new Map<string, Procedure>() } = useGetProcedures();

	return (
		<Grid fullWidth narrow>
			<Column sm={4} md={6} lg={16} xlg={15} max={16}>
				<Grid fullWidth>
					{[...procedures.values()]?.map(procedure => (
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
