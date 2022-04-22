import { Button, Column, Grid, TextArea, TextInput, Tile } from '@carbon/react';

const ProcedureContainer = () => {
	return (
		<Tile href='ApplicationName' className='w-full bg-background'>
			<Grid fullWidth narrow className='space-y-7'>
				<Column
					sm={{ span: 4 }}
					md={{ span: 8 }}
					lg={{ span: 16 }}
					className='text-fluid-heading-3'
				>
					Titolo
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='procedure'
							labelText='Procedure'
							placeholder='Procedure'
							defaultValue='Default value'
							readOnly
						/>
						<TextInput
							className='w-full'
							id='procedure-owner'
							labelText='Procedure Owner'
							placeholder='Procedure Owner'
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
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='last-modified-date'
							labelText='Last Modified Date'
							defaultValue='mm/dd/yyyy'
							readOnly
						/>
						<TextInput
							className='w-full'
							id='last-modifier'
							labelText='Last Modifier'
							defaultValue='Default value'
							readOnly
						/>
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='last-review-date'
							labelText='Last Review Date'
							defaultValue='mm/dd/yyyy'
							readOnly
						/>
						<TextInput
							className='w-full'
							id='last-reviewer'
							labelText='Last Reviewer'
							defaultValue='Default value'
							readOnly
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
export default ProcedureContainer;
