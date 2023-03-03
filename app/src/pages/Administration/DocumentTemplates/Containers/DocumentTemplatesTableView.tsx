import { ContentSwitcher, Switch } from '@carbon/react';
import { Grid as GridIcon, HorizontalView } from '@carbon/react/icons';
import useDocumentTemplates from '@hooks/document-templates/useDocumentTemplates';
import DocumentTemplatesTable from '@pages/Administration/DocumentTemplates/Components/DocumentTemplatesTable';

const DocumentTemplatesTableView = () => {
	const { setFilters, templates } = useDocumentTemplates();
	return (
		<div className='space-y-5'>
			<div className='flex justify-end'>
				<ContentSwitcher
					size='lg'
					selectedIndex={1}
					onChange={() => setFilters({ isTile: true })}
					className='w-min'
				>
					<Switch name='first'>
						<GridIcon />
					</Switch>
					<Switch name='second'>
						<HorizontalView />
					</Switch>
				</ContentSwitcher>
			</div>
			<DocumentTemplatesTable documentTemplates={templates} />
		</div>
	);
};
export default DocumentTemplatesTableView;
