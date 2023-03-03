import { Grid, Column } from '@carbon/react';
import PageHeader from '@components/PageHeader';
import { useTranslation } from 'react-i18next';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import DocumentTemplatesContent from '@pages/Administration/DocumentTemplates/Containers/DocumentTemplatesContent';
import NewTemplateModal from './Modals/AddTemplatesModal';

const DocumentTemplates = () => {
	const { t } = useTranslation('documentationAdmin');
	const { t: tModals } = useTranslation('modals');
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<PageHeader
			pageTitle={t('documentation-templates')}
			intermediateRoutes={[{ name: 'Admin Panel', to: '/admin' }]}
			actions={[
				{
					name: tModals('new-template'),
					icon: Add,
					onClick: () => setIsModalOpen(true)
				}
			]}
		>
			<Grid fullWidth className='h-full p-container-1'>
				<NewTemplateModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
				<Column sm={4} md={8} lg={16}>
					<DocumentTemplatesContent />
				</Column>
			</Grid>
		</PageHeader>
	);
};
export default DocumentTemplates;
