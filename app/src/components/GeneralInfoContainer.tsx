import { Column, Form, Grid, TextArea, TextInput, Tile } from '@carbon/react';
import { useForm } from 'react-hook-form';

interface GeneralInfoForm {
	name: string;
	owner: string;
	description: string;
	ownerDelegates: string;
	appMaintenance: string;
	operationSupplier: string;
}

type GeneralInfoProps = {
	setIsDirty: (val: boolean) => void;
};

const GeneralInfoContainer = ({ setIsDirty }: GeneralInfoProps) => {
	const {
		register,
		formState: { errors }
	} = useForm<GeneralInfoForm>({ mode: 'onChange' });
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
								invalid={Boolean(errors.name)}
								defaultValue='Default value'
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
								id='owner'
								invalidText={errors.owner?.message}
								labelText='Owner *'
								placeholder='Application owner'
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
						</div>
						<TextArea
							className='w-full'
							rows={1}
							id='owner-delegates'
							labelText='Owner Delegates'
							placeholder='Application owner delegates'
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
						<TextArea
							className='w-full'
							id='description'
							labelText='Description'
							placeholder='Description'
							defaultValue='Default value'
							{...(register('description'),
							{
								onChange: () => {
									setIsDirty(true);
								}
							})}
						/>
					</Form>
				</Column>
			</Grid>
		</Tile>
	);
};
export default GeneralInfoContainer;
