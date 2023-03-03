import { ClickableTile, Layer } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Templates from '@model/Administration/DocumentTemplates';
import { DocumentView, Edit, TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import { formatDate } from '@i18n';
import DeleteTemplatesModal from '../Modals/DeleteTemplatesModal';
import ViewTemplatesModal from '../Modals/ViewTemplatesModal';

type DocumentTemplatesTileProps = {
	documentTemplates: Templates;
};

type DeleteModalType = {
	open: boolean;
	id: number;
};
const DocumentTemplatesTile = ({ documentTemplates }: DocumentTemplatesTileProps) => {
	const { t } = useTranslation(['documentationAdmin']);
	const navigate = useNavigate();

	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [documentData, setDocumentData] = useState(documentTemplates);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<DeleteModalType>({
		open: false,
		id: 0
	});

	const showTemplateType = (type?: string) => {
		return type && type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
	};

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(1)} className='mb-5'>
				<div className='flex flex-col space-y-3'>
					<div className='flex justify-start md:justify-between'>
						<p className='block truncate line-clamp-1 text-heading-2'>
							{documentTemplates?.name}
						</p>
						<div className='text-lg flex space-x-5'>
							<DocumentView
								size='24'
								onClick={() => {
									setIsReviewModalOpen(true);
									setDocumentData(documentTemplates);
								}}
							/>
							<Edit size='24' onClick={() => setIsEditModalOpen(true)} />
							<TrashCan
								size='24'
								onClick={() =>
									setIsDeleteModalOpen({ open: true, id: documentTemplates?.id })
								}
							/>
						</div>
					</div>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:type')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{showTemplateType(documentTemplates?.type)}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:changes')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{documentTemplates.allowChanges ? 'Allowed' : 'Not allowed'}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:total-approval-steps')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{documentTemplates?.approvalSteps}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:total-chapters')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{documentTemplates?.totalChapters}
							</p>
						</span>
					</div>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:created-on')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{formatDate(documentTemplates.createdOn, 'P')}
							</p>
						</span>
						<span className='flex space-x-2'>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:total-usage')}:
							</p>
							<p className='block truncate text-body-short-1'>
								{documentTemplates?.usages}
							</p>
						</span>
					</div>
				</div>
			</ClickableTile>

			<ViewTemplatesModal
				isOpen={isReviewModalOpen}
				setIsOpen={setIsReviewModalOpen}
				documentTemplate={documentData}
			/>
			<ViewTemplatesModal
				isOpen={isEditModalOpen}
				setIsOpen={setIsEditModalOpen}
				documentTemplate={documentData}
			/>
			<DeleteTemplatesModal
				isOpen={isDeleteModalOpen.open}
				setIsOpen={setIsDeleteModalOpen}
				id={isDeleteModalOpen.id}
			/>
		</Layer>
	);
};
export default DocumentTemplatesTile;
