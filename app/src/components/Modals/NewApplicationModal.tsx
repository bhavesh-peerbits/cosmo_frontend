import {
	Button,
	Column,
	ComposedModal,
	Form,
	Grid,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ProgressIndicator,
	ProgressStep,
	TextArea,
	TextInput
} from '@carbon/react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface GeneralInfoForm {
	code: string;
	name: string;
	owner: string;
}

type NewApplicationProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const NewApplicationModal = ({ isOpen, setIsOpen }: NewApplicationProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const {
		register,
		formState: { errors, isValid }
	} = useForm<GeneralInfoForm>({ mode: 'onChange' });

	const GeneralInfo = (
		<Grid fullWidth className='space-y-7'>
			<Column
				sm={{ span: 4 }}
				md={{ span: 8 }}
				lg={{ span: 16 }}
				className='text-fluid-heading-3'
			>
				General Information
			</Column>
			<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }} className='space-y-5'>
				<Form className='w-full space-y-5'>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='code'
							invalidText={errors.code?.message}
							labelText='Code *'
							placeholder='Code'
							invalid={Boolean(errors.code)}
							{...register('code', {
								required: {
									value: true,
									message: 'Required'
								}
							})}
						/>
						<TextInput
							className='w-full'
							id='name'
							invalidText={errors.name?.message}
							labelText='Name *'
							placeholder='Name'
							invalid={Boolean(errors.name)}
							{...register('name', {
								required: {
									value: true,
									message: 'Required'
								}
							})}
						/>
					</div>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='owner'
							invalidText={errors.owner?.message}
							labelText='Owner *'
							placeholder='Application owner'
							invalid={Boolean(errors.owner)}
							{...register('owner', {
								required: {
									value: true,
									message: 'Required'
								}
							})}
						/>
					</div>
					<TextArea
						className='w-full'
						rows={1}
						id='owner-delegates'
						labelText='Owner Delegates'
						placeholder='Application owner delegates'
					/>
					<div className='flex w-full items-end space-x-5'>
						<TextInput
							className='w-full'
							id='application-maintenance-supplier'
							labelText='Application Maintenance Supplier'
							placeholder='Application maintenance supplier'
						/>
						<TextInput
							className='w-full'
							id='operation-supplier'
							labelText='Operation Supplier'
							placeholder='Operation supplier'
						/>
					</div>
					<TextArea
						className='w-full'
						id='description'
						labelText='Description'
						placeholder='Description'
					/>
				</Form>
			</Column>
		</Grid>
	);
	const TechnicalInfo = (
		<Grid fullWidth className='space-y-7'>
			<Column
				sm={{ span: 4 }}
				md={{ span: 8 }}
				lg={{ span: 16 }}
				className='text-fluid-heading-3'
			>
				Technical Information
			</Column>
			<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }} className='space-y-5'>
				<Form className='w-full space-y-5'>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='application-servers'
							labelText='Application Servers'
							placeholder='Application servers'
						/>
						<TextInput
							className='w-full'
							id='application-servers-os'
							labelText='Application Servers OS'
							placeholder='Application servers OS'
						/>
					</div>
					<TextInput
						className='w-full self-stretch'
						id='application-code-path'
						labelText='Application Code Path'
						placeholder='Application code path'
					/>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='db-servers'
							labelText='DB Servers'
							placeholder='DB servers'
						/>
						<TextInput
							className='w-full'
							id='db-servers-os'
							labelText='DB Servers OS'
							placeholder='DB servers OS'
						/>
					</div>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='database-service'
							labelText='Database Service'
							placeholder='Database service'
						/>
						<TextInput
							className='w-full'
							id='database-instance'
							labelText='Database Instance'
							placeholder='Database instance'
						/>
					</div>
				</Form>
			</Column>
		</Grid>
	);
	const currentContent = () => {
		switch (currentIndex) {
			case 1:
				return TechnicalInfo;
			default:
				return GeneralInfo;
		}
	};
	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)} size='lg'>
			<ModalHeader title='New Application' closeModal={() => setIsOpen(false)} />
			<ModalBody>
				<Grid fullWidth className='h-full'>
					<Column sm={1} md={2} lg={3}>
						<ProgressIndicator
							vertical
							currentIndex={currentIndex}
							className='sticky top-0'
						>
							<ProgressStep index={1} label='General Information' />
							<ProgressStep index={2} label='Technical Information' />
						</ProgressIndicator>
					</Column>
					<Column sm={3} md={6} lg={13}>
						{currentContent()}
					</Column>
				</Grid>
			</ModalBody>
			<ModalFooter>
				{currentIndex === 1 && (
					<Button onClick={() => setCurrentIndex(0)} kind='secondary'>
						Back
					</Button>
				)}
				{currentIndex === 0 && (
					<Button kind='secondary' onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
				)}

				{currentIndex === 1 && <Button> Create Application </Button>}
				{currentIndex === 0 && (
					<Button disabled={!isValid} onClick={() => setCurrentIndex(1)}>
						Next Step
					</Button>
				)}
			</ModalFooter>
		</ComposedModal>
	);
};
export default NewApplicationModal;
