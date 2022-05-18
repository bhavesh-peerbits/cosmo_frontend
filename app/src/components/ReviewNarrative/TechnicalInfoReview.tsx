import { Grid, TextInput, Column, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { Checkmark } from '@carbon/react/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface TechnicalInfoForm {
	technicalInfo: {
		appServers: string;
		appServersOS: string;
		appCodePath: string;
		technicalCode: string;
		dbServers: string;
		dbServersOS: string;
		dbService: string;
		dbInstance: string;
	};
}

const TechnicalInfoReview = () => {
	const [isConfirmed, setIsConfirmed] = useState(false);
	const {
		register,
		reset,
		formState: { isDirty }
	} = useForm<TechnicalInfoForm>({
		mode: 'onChange'
	});

	return (
		<Grid fullWidth>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-servers'
					labelText='Application Servers'
					placeholder='Application servers'
					{...register('technicalInfo.appServers')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-servers-os'
					labelText='Application Servers OS'
					placeholder='Application servers OS'
					{...register('technicalInfo.appServersOS')}
				/>
			</Column>
			<FullWidthColumn className='mb-5'>
				<TextInput
					className='w-full self-stretch'
					id='application-code-path'
					labelText='Application Code Path'
					placeholder='Application code path'
					{...register('technicalInfo.appCodePath')}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='mb-5'>
				<TextInput
					className='w-full self-stretch'
					id='technical-code'
					labelText='Technical Code'
					placeholder='Technical code'
					{...register('technicalInfo.technicalCode')}
				/>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='db-servers'
					labelText='DB Servers'
					placeholder='DB servers'
					{...register('technicalInfo.dbServers')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='db-servers-os'
					labelText='DB Servers OS'
					placeholder='DB servers OS'
					{...register('technicalInfo.dbServersOS')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='database-service'
					labelText='Database Service'
					placeholder='Database service'
					{...register('technicalInfo.dbService')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='database-instance'
					labelText='Database Instance'
					placeholder='Database instance'
					{...register('technicalInfo.dbInstance')}
				/>
			</Column>
			<FullWidthColumn className='flex justify-end'>
				<div className='flex w-full flex-1 justify-end space-x-5'>
					<Button
						type='reset'
						kind='tertiary'
						disabled={!isDirty && !isConfirmed}
						onClick={() => reset()}
					>
						Cancel
					</Button>
					{isConfirmed ? (
						<div className='flex h-8 items-center space-x-2 text-link-primary'>
							<p className='text-body-short-2'>Confirmed</p>
							<Checkmark />
						</div>
					) : (
						<Button type='submit' onClick={() => setIsConfirmed(true)} size='md'>
							Confirm
						</Button>
					)}
				</div>
			</FullWidthColumn>
		</Grid>
	);
};

export default TechnicalInfoReview;
