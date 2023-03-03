import useDocumentTemplates from '@hooks/document-templates/useDocumentTemplates';
import DocumentTemplatesTableView from './DocumentTemplatesTableView';
import DocumentTemplatesTileView from './DocumentTemplatesTileView';

const DocumentTemplatesContent = () => {
	const { filters } = useDocumentTemplates();

	return filters.isTile !== false ? (
		<DocumentTemplatesTileView />
	) : (
		<DocumentTemplatesTableView />
	);
};
export default DocumentTemplatesContent;
