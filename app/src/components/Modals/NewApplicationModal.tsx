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
	TextInput,
	Tile
} from '@carbon/react';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

interface NewAppForm {
	name: string;
	codeName: string;
	owner: string;
	description: string;
	ownerDelegates: string;
	appMaintenance: string;
	operationSupplier: string;
	appServers: string;
	appServersOS: string;
	appCodePath: string;
	technicalCode: string;
	dbServers: string;
	dbServersOS: string;
	dbInstance: string;
	dbService: string;
}

type NewApplicationProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const NewApplicationModal = ({ isOpen, setIsOpen }: NewApplicationProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const {
		register,
		reset,
		formState: { errors, isValid }
	} = useForm<NewAppForm>({ mode: 'onChange' });

	const GeneralInfo = React.memo(() => (
		<Tile className='w-full pb-7'>
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
					<Form className='w-full space-y-5' id='general-info-form'>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='name'
								invalidText={errors.name?.message}
								labelText='Name *'
								placeholder='Name'
								helperText='Application name'
								invalid={Boolean(errors.name)}
								{...register('name', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
							<TextInput
								className='w-full'
								id='codeName'
								invalidText={errors.owner?.message}
								labelText='Code *'
								placeholder='Application code'
								helperText='Acronym for the application name'
								invalid={Boolean(errors.owner)}
								{...register('codeName', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</div>
						<TextInput
							className='w-full'
							id='owner'
							invalidText={errors.owner?.message}
							labelText='Owner'
							placeholder='Application owner'
							invalid={Boolean(errors.owner)}
							{...register('owner')}
						/>
						<TextArea
							className='w-full'
							rows={1}
							id='owner-delegates'
							labelText='Owner Delegates'
							placeholder='Application owner delegates'
							{...register('ownerDelegates')}
						/>
						<div className='flex w-full items-end space-x-5'>
							<TextInput
								className='w-full'
								id='application-maintenance-supplier'
								labelText='Application Maintenance Supplier'
								placeholder='Application maintenance supplier'
								{...register('appMaintenance')}
							/>
							<TextInput
								className='w-full'
								id='operation-supplier'
								labelText='Operation Supplier'
								placeholder='Operation supplier'
								{...register('operationSupplier')}
							/>
						</div>
						<div>
							<p className='mb-3 text-text-secondary text-label-1'> Description </p>
							<TiptapEditor />
						</div>
					</Form>
				</Column>
			</Grid>
		</Tile>
	));
	const TechnicalInfo = React.memo(() => (
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
				<Form className='w-full space-y-5' id='technical-info-form'>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='application-server'
							labelText='Application Servers'
							placeholder='Application servers'
							{...register('appServers')}
						/>
						<TextInput
							className='w-full'
							id='application-servers-os'
							labelText='Application Servers OS'
							placeholder='Application servers OS'
							{...register('appServersOS')}
						/>
					</div>
					<TextInput
						className='w-full self-stretch'
						id='application-code-path'
						labelText='Application Code Path'
						placeholder='Application code path'
						{...register('appCodePath')}
					/>
					<TextInput
						className='w-full self-stretch'
						id='technical-code'
						labelText='Technical Code'
						placeholder='Technical code'
						{...register('technicalCode')}
					/>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='db-servers'
							labelText='DB Servers'
							placeholder='DB servers'
							{...register('dbServers')}
						/>
						<TextInput
							className='w-full'
							id='db-servers-os'
							labelText='DB Servers OS'
							placeholder='DB servers OS'
							{...register('dbServersOS')}
						/>
					</div>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='database-service'
							labelText='Database Service'
							placeholder='Database service'
							{...register('dbService')}
						/>
						<TextInput
							className='w-full'
							id='database-instance'
							labelText='Database Instance'
							placeholder='Database instance'
							{...register('dbInstance')}
						/>
					</div>
				</Form>
			</Column>
		</Grid>
	));
	return (
		<ComposedModal
			open={isOpen}
			onClose={() => {
				setIsOpen(false);
				setCurrentIndex(0);
				reset();
			}}
			size='lg'
		>
			<ModalHeader
				title='New Application'
				closeModal={() => {
					setIsOpen(false);
					setCurrentIndex(0);
					reset();
				}}
			/>
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
						{currentIndex === 0 ? <GeneralInfo /> : <TechnicalInfo />}
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
					<Button
						type='reset'
						kind='secondary'
						onClick={() => {
							setIsOpen(false);
							setCurrentIndex(0);
							reset();
						}}
					>
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
