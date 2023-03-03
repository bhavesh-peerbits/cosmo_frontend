import { Column, Grid } from '@carbon/react';
import useDocumentTemplates from '@hooks/document-templates/useDocumentTemplates';
import DocumentTemplatesTile from './DocumentTemplatesTile';

const DocumentTemplatesContainer = () => {
	const { templates } = useDocumentTemplates();
	return (
		<Grid fullWidth narrow className='pl-5'>
			{templates.map(template => (
				<Column key={template.id} sm={4} md={4} lg={8} xlg={4} max={4}>
					<DocumentTemplatesTile documentTemplates={template} />
				</Column>
			))}
		</Grid>
	);
};
export default DocumentTemplatesContainer;
