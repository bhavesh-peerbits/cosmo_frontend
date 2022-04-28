import { Button, Column, Grid } from '@carbon/react';
import { Add, Email } from '@carbon/react/icons';
import { useState } from 'react';
import NewProcedureModal from './NewProcedureModal';
import ProcedureContainer from './ProcedureContainer';

const ProcedureInfo = () => {
	const [isNewProcedureOpen, setIsNewProcedureOpen] = useState(false);
	return (
		<div className='pb-7'>
			<Grid fullWidth narrow className='h-full'>
				<Column sm={2} md={2} lg={3}>
					<div>Progress</div>
				</Column>
				<Column sm={4} md={6} lg={13}>
					<div className='space-y-7'>
						<div className=' flex w-full space-x-4'>
							<Button
								size='md'
								renderIcon={Add}
								onClick={() => setIsNewProcedureOpen(true)}
							>
								New Procedure
							</Button>
							<NewProcedureModal
								isOpen={isNewProcedureOpen}
								setIsOpen={setIsNewProcedureOpen}
							/>
							<Button kind='tertiary' size='md' renderIcon={Email}>
								Review
							</Button>
						</div>
						<ProcedureContainer />
					</div>
				</Column>
			</Grid>
		</div>
	);
};
export default ProcedureInfo;
