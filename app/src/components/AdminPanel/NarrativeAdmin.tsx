import { Grid, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import AdminTile from './AdminTile';

const NarrativeAdmin = () => {
	const { t } = useTranslation('narrativeAdmin');
	return (
		<Grid fullWidth narrow className='mb-7 h-full space-y-5 px-5 pt-7 md:space-y-0'>
			<Column sm={4} md={2} lg={4}>
				<p className='text-productive-heading-2'>{t('narrative-admin')}</p>
				<Column>
					<p className='mt-5 text-body-long-2'>{t('narrative-admin-description')}</p>
				</Column>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile
					path=''
					title={t('procedures')}
					description={t('procedures-description')}
				/>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile path='' title='Review Email' description={t('email-description')} />
			</Column>
		</Grid>
	);
};
export default NarrativeAdmin;
