import { Column, Grid } from '@carbon/react';
import ProcedureContainer from './ProcedureContainer';

const ProcedureInfo = () => {
	return (
		<div className='pb-7'>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={2} md={2} lg={3}>
					<div>Progress </div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<div className='space-y-7'>
						<ProcedureContainer />
					</div>
				</Column>
			</Grid>
		</div>
	);
};
export default ProcedureInfo;
