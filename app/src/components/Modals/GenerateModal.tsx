import {
	Grid,
	ComposedModal,
	Column,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button
} from '@carbon/react';

type GenerateModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const GenerateModal = ({ isOpen, setIsOpen }: GenerateModalProps) => {
	return (
		<Grid fullWidth narrow>
			<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
				<Column>
					<ModalHeader
						title='Narrative Name'
						label='Generate Narrative'
						closeModal={() => setIsOpen(false)}
					/>
				</Column>

				<ModalBody>
					<Column lg={16} md={8} sm={4}>
						<div className='divide-y divide-solid divide-border-subtle-1'>
							<div className='space-y-5 pb-5'>
								<div className='flex w-full space-x-5'>
									<p className='flex w-full text-heading-compact-1'>Application Name:</p>
									<p className='flex w-full text-heading-compact-1'>Owner:</p>
								</div>
								<div className='flex w-full space-x-5'>
									<p className='flex w-full text-heading-compact-1'>
										Application Maintenance Supplier:
									</p>
								</div>
								<div className='flex w-full space-x-5'>
									<p className='flex w-full text-heading-compact-1'>
										Operation Supplier:
									</p>
									<p className='flex w-full text-heading-compact-1'>Code:</p>
								</div>
							</div>
							<div className='space-y-5 pt-5 pb-5'>
								<div className='flex w-full space-x-5'>
									<p className='flex w-full text-heading-compact-1'>
										Application Servers:
									</p>
									<p className='flex w-full text-heading-compact-1'>
										Application Servers OS:
									</p>
								</div>
								<div className='flex w-full space-x-5'>
									<p className='flex w-full text-heading-compact-1'>
										Application Code Path:
									</p>
									<p className='flex w-full text-heading-compact-1'>DB Servers:</p>
								</div>
								<div className='flex w-full space-x-5'>
									<p className='flex w-full text-heading-compact-1'>Database Service:</p>
									<p className='flex w-full text-heading-compact-1'>Database Instance:</p>
								</div>
							</div>
							<div className='pt-5'>
								<p className='flex w-full text-heading-compact-1'>Total Procedures:</p>
							</div>
						</div>
					</Column>
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button>Generate Narrative</Button>
				</ModalFooter>
			</ComposedModal>
		</Grid>
	);
};
export default GenerateModal;
