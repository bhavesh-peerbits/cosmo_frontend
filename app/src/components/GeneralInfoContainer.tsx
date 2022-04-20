import { Button, Column, Grid, TextArea, TextInput, Tile } from '@carbon/react';

const GeneralInfoContainer = () => {
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
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='code'
							labelText='Code'
							placeholder='Code'
							defaultValue='Default value'
						/>
						<TextInput
							className='w-full'
							id='name'
							labelText='Name'
							placeholder='Name'
							defaultValue='Default value'
						/>
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full items-stretch space-x-5'>
						<TextArea
							className='w-full'
							id='description'
							labelText='Description'
							placeholder='Description'
							defaultValue='Default value'
						/>
						<div className='flex w-full flex-col space-y-5'>
							<TextInput
								className='w-full'
								id='owner'
								labelText='Owner'
								placeholder='Application owner'
								defaultValue='Default value'
							/>
							<TextInput
								className='w-full'
								id='owner-delegates'
								labelText='Owner Delegates'
								placeholder='Application owner delegates'
								defaultValue='Default value'
							/>
						</div>
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='application-maintenance-supplier'
							labelText='Application Maintenance Supplier'
							placeholder='Application maintenance supplier'
							defaultValue='Default value'
						/>
						<TextInput
							className='w-full'
							id='operation-supplier'
							labelText='Operation Supplier'
							placeholder='Operation supplier'
							defaultValue='Default value'
						/>
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 5, offset: 3 }} lg={{ span: 3, offset: 13 }}>
					<div className='space-x-5'>
						<Button kind='tertiary'>Cancel</Button>
						<Button>Save</Button>
					</div>
				</Column>
			</Grid>
		</Tile>
	);
};
export default GeneralInfoContainer;
