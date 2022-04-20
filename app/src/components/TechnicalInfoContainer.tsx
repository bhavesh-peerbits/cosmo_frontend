import { Button, Column, Grid, TextArea, TextInput, Tile } from '@carbon/react';

const TechnicalInfoContainer = () => {
	return (
		<Tile href='ApplicationName' className='w-full bg-background'>
			<Grid fullWidth narrow className='space-y-7'>
				<Column
					sm={{ span: 4 }}
					md={{ span: 8 }}
					lg={{ span: 16 }}
					className='text-fluid-heading-3'
				>
					Technical Information
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='application-servers'
							labelText='Application Servers'
							placeholder='Application servers'
							defaultValue='Default value'
						/>
						<TextInput
							className='w-full'
							id='application-servers-os'
							labelText='Application Servers OS'
							placeholder='Application servers OS'
							defaultValue='Default value'
						/>
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full items-stretch space-x-5'>
						<TextArea
							className='w-full'
							id='application-code-path'
							labelText='Application Code Path'
							placeholder='Application code path'
							defaultValue='Default value'
						/>
						<div className='flex w-full flex-col space-y-5'>
							<TextInput
								className='w-full'
								id='db-servers'
								labelText='DB Servers'
								placeholder='DB servers'
								defaultValue='Default value'
							/>
							<TextInput
								className='w-full'
								id='db-servers-os'
								labelText='DB Servers OS'
								placeholder='DB servers OS'
								defaultValue='Default value'
							/>
						</div>
					</div>
				</Column>
				<Column sm={{ span: 4 }} md={{ span: 8 }} lg={{ span: 16 }}>
					<div className='flex w-full space-x-5'>
						<TextInput
							className='w-full'
							id='database-service'
							labelText='Database Service'
							placeholder='Database service'
							defaultValue='Default value'
						/>
						<TextInput
							className='w-full'
							id='database-instance'
							labelText='Database Instance'
							placeholder='Database instance'
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
export default TechnicalInfoContainer;
