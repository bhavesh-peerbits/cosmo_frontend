import { Grid, Column } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import AdminTile from '../Components/AdminTile';

const DocumentAdmin = () => {
	const { t } = useTranslation('documentationAdmin');
	return (
		<Grid fullWidth narrow className='mb-5 h-full space-y-5 px-5 pt-5 md:space-y-0'>
			<Column sm={4} md={2} lg={4}>
				<p className='text-productive-heading-2'>{t('documentation-admin')}</p>
				<Column>
					<p className='mt-5 text-body-long-2'>{t('documentation-admin-description')}</p>
				</Column>
			</Column>
			<Column sm={4} md={3} lg={4}>
				<AdminTile
					path='document-templates'
					title={t('documentation-templates')}
					description={t('documentation-templates-description')}
				/>
			</Column>
		</Grid>
	);
};
export default DocumentAdmin;
