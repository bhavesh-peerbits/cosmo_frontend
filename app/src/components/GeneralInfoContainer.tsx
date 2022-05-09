import { Column, Form, Grid, TextArea, TextInput, Tile } from '@carbon/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TiptapEditor from './tiptap/TiptapEditor';

interface GeneralInfoForm {
	name: string;
	codeName: string;
	owner: string;
	description: string;
	ownerDelegates: string;
	appMaintenance: string;
	operationSupplier: string;
}

type GeneralInfoProps = {
	setIsDirty: (val: boolean) => void;
	isResetting: boolean;
	setIsResetting: (val: boolean) => void;
};

const GeneralInfoContainer = ({
	setIsDirty,
	isResetting,
	setIsResetting
}: GeneralInfoProps) => {
	const {
		register,
		reset,
		formState: { errors }
	} = useForm<GeneralInfoForm>({ mode: 'onChange' });
	useEffect(() => {
		isResetting && (reset(), setIsResetting(false), setIsDirty(false));
	});
	return (
		<Tile href='ApplicationName' className='w-full bg-background pb-7'>
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
								id='name'
								invalidText={errors.name?.message}
								labelText='Name *'
								placeholder='Name'
								helperText='Application name'
								defaultValue='Default value'
								invalid={Boolean(errors.name)}
								{...register('name', {
									onChange: () => {
										setIsDirty(true);
									},
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
								defaultValue='Default value'
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
							labelText='Owner *'
							placeholder='Application owner'
							helperText='Last Name First Name'
							defaultValue='Default value'
							invalid={Boolean(errors.owner)}
							{...register('owner', {
								onChange: () => {
									setIsDirty(true);
								},
								required: {
									value: true,
									message: 'Required'
								}
							})}
						/>
						<TextArea
							className='w-full'
							rows={1}
							id='owner-delegates'
							labelText='Owner Delegates'
							placeholder='Application owner delegates'
							helperText="Please type in delegate's full name then press ENTER"
							defaultValue='Default value'
							{...register('ownerDelegates', {
								onChange: () => {
									setIsDirty(true);
								}
							})}
						/>
						<div className='flex w-full items-end space-x-5'>
							<TextInput
								className='w-full'
								id='application-maintenance-supplier'
								labelText='Application Maintenance Supplier'
								placeholder='Application maintenance supplier'
								defaultValue='Default value'
								{...(register('appMaintenance'),
								{
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
							<TextInput
								className='w-full'
								id='operation-supplier'
								labelText='Operation Supplier'
								placeholder='Operation supplier'
								defaultValue='Default value'
								{...(register('operationSupplier'),
								{
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
						</div>
						<TiptapEditor />
					</Form>
				</Column>
			</Grid>
		</Tile>
	);
};
export default GeneralInfoContainer;
