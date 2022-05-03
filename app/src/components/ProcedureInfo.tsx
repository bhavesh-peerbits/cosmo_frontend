import { Button, Column, Grid } from '@carbon/react';
import { Add, Email } from '@carbon/react/icons';
import { useState } from 'react';
import NewProcedureModal from './Modals/NewProcedureModal';
import ProcedureContainer from './ProcedureContainer';
import MultipleReviewModal from './Modals/MultipleReviewModal';
import ScrollToContent from './ScrollToContent';

const ProcedureInfo = () => {
	const proceduresList = [
		{ id: 'procedure-1', content: 'Procedure 1' },
		{ id: 'procedure-2', content: 'Procedure 2' },
		{ id: 'procedure-3', content: 'Procedure 3' }
	];
	const [isNewProcedureOpen, setIsNewProcedureOpen] = useState(false);
	const [isCheckboxView, setIsCheckboxView] = useState(false);
	const [showProcedureModal, setShowProcedureModal] = useState(false);
	return (
		<div className='pb-7'>
			<Grid fullWidth className='h-full '>
				<Column sm={2} md={2} lg={3} className='justify-self-start'>
					<div className='sticky top-[112px]'>
						<ScrollToContent withCheckbox={isCheckboxView} contentList={proceduresList} />
					</div>
				</Column>
				<Column sm={4} md={6} lg={13} className='pt-4'>
					<div className='space-y-4'>
						<div className=' flex w-full space-x-4'>
							<Button
								size='md'
								renderIcon={Add}
								onClick={() => setIsNewProcedureOpen(true)}
								disabled={isCheckboxView}
							>
								New Procedure
							</Button>
							<NewProcedureModal
								isOpen={isNewProcedureOpen}
								setIsOpen={setIsNewProcedureOpen}
							/>
							<div className='flex items-center space-x-2'>
								<Button
									kind={isCheckboxView ? 'primary' : 'tertiary'}
									size='md'
									renderIcon={Email}
									onClick={
										isCheckboxView
											? () => setShowProcedureModal(true)
											: () => setIsCheckboxView(true)
									}
								>
									Review
								</Button>
								{isCheckboxView && (
									<Button
										kind='secondary'
										size='md'
										onClick={() => setIsCheckboxView(false)}
									>
										Cancel
									</Button>
								)}
							</div>
						</div>
						{showProcedureModal && (
							<MultipleReviewModal
								isOpen={showProcedureModal}
								setIsOpen={setShowProcedureModal}
								type='procedure'
							/>
						)}
						<div className='space-y-7'>
							{proceduresList.map(procedure => (
								<div id={procedure.id}>
									<ProcedureContainer />
								</div>
							))}
						</div>
					</div>
				</Column>
			</Grid>
		</div>
	);
};
export default ProcedureInfo;
