import { Button, Column, Form, Grid, TextInput, Tile } from '@carbon/react';
import { useForm } from 'react-hook-form';

interface TechnicalInfoForm {
	appServers: string;
	appServersOS: string;
	appCodePath: string;
	dbServers: string;
	dbServersOS: string;
	dbService: string;
	dbInstance: string;
}
const TechnicalInfoContainer = () => {
	const {
		register,
		formState: { isValid, isDirty }
	} = useForm<TechnicalInfoForm>({ mode: 'onBlur' });
	return (
		<Tile href='ApplicationName' className='w-full bg-background pb-7'>
			<Grid fullWidth narrow className='space-y-7'>
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
								defaultValue='Default value'
								{...register('appServers')}
							/>
							<TextInput
								className='w-full'
								id='application-servers-os'
								labelText='Application Servers OS'
								placeholder='Application servers OS'
								defaultValue='Default value'
								{...register('appServersOS')}
							/>
						</div>
						<TextInput
							className='w-full self-stretch'
							id='application-code-path'
							labelText='Application Code Path'
							placeholder='Application code path'
							defaultValue='Default value'
							{...register('appCodePath')}
						/>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='db-servers'
								labelText='DB Servers'
								placeholder='DB servers'
								defaultValue='Default value'
								{...register('dbServers')}
							/>
							<TextInput
								className='w-full'
								id='db-servers-os'
								labelText='DB Servers OS'
								placeholder='DB servers OS'
								defaultValue='Default value'
								{...register('dbServersOS')}
							/>
						</div>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='database-service'
								labelText='Database Service'
								placeholder='Database service'
								defaultValue='Default value'
								{...register('dbService')}
							/>
							<TextInput
								className='w-full'
								id='database-instance'
								labelText='Database Instance'
								placeholder='Database instance'
								defaultValue='Default value'
								{...register('dbInstance')}
							/>
						</div>
					</Form>
				</Column>
			</Grid>
		</Tile>
	);
};
export default TechnicalInfoContainer;
