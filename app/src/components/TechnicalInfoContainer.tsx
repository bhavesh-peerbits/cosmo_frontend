import { Column, Form, Grid, TextInput, Tile } from '@carbon/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface TechnicalInfoForm {
	appServers: string;
	appServersOS: string;
	appCodePath: string;
	technicalCode: string;
	dbServers: string;
	dbServersOS: string;
	dbService: string;
	dbInstance: string;
}
type TechnicalInfoProps = {
	setIsDirty: (val: boolean) => void;
	isResetting: boolean;
	setIsResetting: (val: boolean) => void;
};
const TechnicalInfoContainer = ({
	setIsDirty,
	isResetting,
	setIsResetting
}: TechnicalInfoProps) => {
	const { register, reset } = useForm<TechnicalInfoForm>({ mode: 'onChange' });
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
								{...register('appServers', {
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
							<TextInput
								className='w-full'
								id='application-servers-os'
								labelText='Application Servers OS'
								placeholder='Application servers OS'
								defaultValue='Default value'
								{...register('appServersOS', {
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
						</div>
						<TextInput
							className='w-full self-stretch'
							id='application-code-path'
							labelText='Application Code Path'
							placeholder='Application code path'
							defaultValue='Default value'
							{...register('appCodePath', {
								onChange: () => {
									setIsDirty(true);
								}
							})}
						/>
						<TextInput
							className='w-full self-stretch'
							id='technical-code'
							labelText='Technical Code'
							placeholder='Technical code'
							defaultValue='Default value'
							{...register('technicalCode', {
								onChange: () => {
									setIsDirty(true);
								}
							})}
						/>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='db-servers'
								labelText='DB Servers'
								placeholder='DB servers'
								defaultValue='Default value'
								{...register('dbServers', {
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
							<TextInput
								className='w-full'
								id='db-servers-os'
								labelText='DB Servers OS'
								placeholder='DB servers OS'
								defaultValue='Default value'
								{...register('dbServersOS', {
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
						</div>
						<div className='flex w-full space-x-5'>
							<TextInput
								className='w-full'
								id='database-service'
								labelText='Database Service'
								placeholder='Database service'
								defaultValue='Default value'
								{...register('dbService', {
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
							<TextInput
								className='w-full'
								id='database-instance'
								labelText='Database Instance'
								placeholder='Database instance'
								defaultValue='Default value'
								{...register('dbInstance', {
									onChange: () => {
										setIsDirty(true);
									}
								})}
							/>
						</div>
					</Form>
				</Column>
			</Grid>
		</Tile>
	);
};
export default TechnicalInfoContainer;
