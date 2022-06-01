import { Column, Grid, TextInput } from '@carbon/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';

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

interface TechnicalInfoProps {
	register: UseFormRegister<TechnicalInfoForm>;
	errors: FieldErrors<TechnicalInfoForm>;
}

const TechnicalInfo = ({ register }: TechnicalInfoProps) => {
	const { t } = useTranslation('applicationInfo');
	return (
		<Grid fullWidth>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-servers'
					labelText={t('app-servers')}
					placeholder={t('app-servers')}
					{...register('technicalInfo.appServers')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-servers-os'
					labelText={t('app-servers-os')}
					placeholder={t('app-servers-os')}
					{...register('technicalInfo.appServersOS')}
				/>
			</Column>
			<FullWidthColumn className='mb-5'>
				<TextInput
					className='w-full self-stretch'
					id='application-code-path'
					labelText={t('app-code-path')}
					placeholder={t('app-code-path')}
					{...register('technicalInfo.appCodePath')}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='mb-5'>
				<TextInput
					className='w-full self-stretch'
					id='technical-code'
					labelText={t('technical-code')}
					placeholder={t('technical-code')}
					{...register('technicalInfo.technicalCode')}
				/>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='db-servers'
					labelText={t('db-servers')}
					placeholder={t('db-servers')}
					{...register('technicalInfo.dbServers')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='db-servers-os'
					labelText={t('db-servers-os')}
					placeholder={t('db-servers-os')}
					{...register('technicalInfo.dbServersOS')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='database-service'
					labelText={t('db-service')}
					placeholder={t('db-service')}
					{...register('technicalInfo.dbService')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='database-instance'
					labelText={t('db-instance')}
					placeholder={t('db-instance')}
					{...register('technicalInfo.dbInstance')}
				/>
			</Column>
		</Grid>
	);
};
export default TechnicalInfo;
