import { Column, Grid, TextInput } from '@carbon/react';
import User from '@model/User';
import { icons } from '@components/IconPicker';

export interface GeneralInfoForm {
	generalInfo: {
		name: string;
		icon: keyof typeof icons;
		codeName: string;
		owner: User;
		description: string;
		delegates: User[];
		appMaintenance: string;
		operationSupplier: string;
	};
}

const GeneralInfoReview = () => {
	return (
		<Grid fullWidth>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='name'
					labelText='Name *'
					placeholder='Name'
					helperText='Application name'
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='code'
					labelText='Code *'
					placeholder='Code'
					helperText='Acronym for the application name'
				/>
			</Column>

			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-maintenance-supplier'
					labelText='Application Maintenance Supplier'
					placeholder='Application maintenance supplier'
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='operation-supplier'
					labelText='Operation Supplier'
					placeholder='Operation supplier'
				/>
			</Column>
		</Grid>
	);
};
export default GeneralInfoReview;
