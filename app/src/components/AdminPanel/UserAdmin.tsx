import { Grid, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import AdminTile from './AdminTile';

const UserAdmin = () => {
	const { t } = useTranslation('userAdmin');
	return (
		<Grid fullWidth narrow className='mt-5 mb-5 h-full space-y-5 px-5 md:space-y-0'>
			<Column sm={4} md={2} lg={4}>
				<p className='font-bold text-productive-heading-2'>{t('user-admin')}</p>
				<Column>
					<p className='mt-5 text-body-long-2'>{t('user-admin-description')}</p>
				</Column>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile
					path='role-assignment'
					title={t('role-assignment')}
					description={t('role-assignment-description')}
				/>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile
					path='applications-visibility'
					title={t('app-visibility')}
					description={t('app-visibility-description')}
				/>
			</Column>
		</Grid>
	);
};
export default UserAdmin;
