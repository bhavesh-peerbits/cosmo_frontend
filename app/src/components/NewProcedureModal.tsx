import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItemGroup,
	SelectItem,
	Toggle
} from '@carbon/react';
import { useState } from 'react';

type NewProcedureModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const NewProcedureModal = ({ isOpen, setIsOpen }: NewProcedureModalProps) => {
	const [isCopySelected, setIsCopySelected] = useState(false);
	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
			<ModalHeader title='Add Procedure' closeModal={() => setIsOpen(false)} />
			<ModalBody>
				<div className='flex flex-col space-y-7'>
					<Toggle
						aria-label='Toggle Copy Procedure'
						labelText='Copy procedure'
						labelA=''
						labelB='Copy'
						id='toggle-1'
						onToggle={() => setIsCopySelected(!isCopySelected)}
					/>
					{isCopySelected ? (
						<Select id='select-app' labelText='Select application'>
							<SelectItemGroup label='Application group 1' />
							<SelectItem text='Application1' value='Application1' />
							<SelectItem text='Application2' value='Application2' />
							<SelectItemGroup label='Application group 2' />
							<SelectItem text='Application3' value='Application3' />
							<SelectItem text='Application4' value='Application4' />
						</Select>
					) : (
						''
					)}

					<Select id='select-procedure' labelText='Select a procedure'>
						<SelectItemGroup label='Procedure group 1' />
						<SelectItem text='Procedure1' value='Procedure1' />
						<SelectItem text='Procedure2' value='Procedure2' />
						<SelectItemGroup label='Procedure group 2' />
						<SelectItem text='Procedure3' value='Procedure3' />
						<SelectItem text='Procedure4' value='Procedure4' />
					</Select>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button> Add Procedure </Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default NewProcedureModal;
