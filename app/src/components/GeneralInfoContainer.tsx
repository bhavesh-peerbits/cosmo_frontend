import { Button, Column, Form, Grid, TextArea, TextInput, Tile } from '@carbon/react';
import { useForm } from 'react-hook-form';

interface GeneralInfoForm {
	code: string;
	name: string;
	owner: string;
	description: string;
	ownerDelegates: string;
	appMaintenance: string;
	operationSupplier: string;
}
const GeneralInfoContainer = () => {
	const {
		register,
		formState: { errors, isValid, isDirty }
	} = useForm<GeneralInfoForm>({ mode: 'onBlur' });
	return (
		<Tile href='ApplicationName' className='w-full bg-background'>
			<Grid fullWidth narrow className='space-y-7'>
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
								defaultValue='Default value'
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
								defaultValue='Default value'
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
								defaultValue='Default value'
								invalid={Boolean(errors.owner)}
								{...register('owner', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
							<TextInput
								className='w-full'
								id='owner-delegates'
								labelText='Owner Delegates'
								placeholder='Application owner delegates'
								defaultValue='Default value'
								{...register('ownerDelegates')}
							/>
						</div>
						<div className='flex w-full items-end space-x-5'>
							<TextInput
								className='w-full'
								id='application-maintenance-supplier'
								labelText='Application Maintenance Supplier'
								placeholder='Application maintenance supplier'
								defaultValue='Default value'
								{...register('appMaintenance')}
							/>
							<TextInput
								className='w-full'
								id='operation-supplier'
								labelText='Operation Supplier'
								placeholder='Operation supplier'
								defaultValue='Default value'
								{...register('operationSupplier')}
							/>
						</div>
						<TextArea
							className='w-full'
							id='description'
							labelText='Description'
							placeholder='Description'
							defaultValue='Default value'
							{...register('description')}
						/>
						<div className='flex justify-end space-x-5 pt-5'>
							<Button type='reset' kind='tertiary' disabled={!isDirty}>
								Cancel
							</Button>
							<Button type='submit' disabled={!isValid}>
								Save
							</Button>
						</div>
					</Form>
				</Column>
			</Grid>
		</Tile>
	);
};
export default GeneralInfoContainer;
