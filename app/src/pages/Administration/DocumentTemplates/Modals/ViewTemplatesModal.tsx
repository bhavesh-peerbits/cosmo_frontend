/* eslint-disable no-nested-ternary */
import {
	ComposedModal,
	ModalBody,
	ModalHeader,
	Column,
	Grid,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListRow,
	StructuredListCell,
	StructuredListBody
} from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import Templates from '@model/Administration/DocumentTemplates';
import { useTranslation } from 'react-i18next';

type ViewTemplatesModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	documentTemplate: Templates;
};

const ViewTemplatesModal = ({
	isOpen,
	setIsOpen,
	documentTemplate
}: ViewTemplatesModalProps) => {
	const { t } = useTranslation(['modals', 'documentationAdmin']);

	const cleanUp = () => {
		setIsOpen(false);
	};

	const noticeOfExpiration = (hours: number) => {
		if (hours % 168 === 0) {
			return `${hours / 168} weeks before`;
		}
		if (hours % 24 === 0) {
			return `${hours / 24} days before`;
		}
		return `${hours} hours before`;
	};

	const showTemplateType = (type: string) => {
		return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
	};
	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader title={documentTemplate?.name} closeModal={cleanUp} />
			<ModalBody>
				<Column lg={16} md={8} sm={4} className='mb-6'>
					<Grid>
						<Column md={4} lg={4} sm={4}>
							<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('documentationAdmin:type')}
							</p>
							<p className='text-xl block truncate font-normal'>
								{showTemplateType(documentTemplate?.type ? documentTemplate?.type : '')}
							</p>
						</Column>
						<Column md={4} lg={4} sm={4}>
							<p>{t('documentationAdmin:additionalInfo')}</p>
							<p>
								{documentTemplate?.freeTextEnabled && documentTemplate?.applicationEnabled
									? 'Free Text and Application'
									: documentTemplate?.freeTextEnabled
									? 'Free Text'
									: documentTemplate?.applicationEnabled
									? 'Application'
									: '-'}
							</p>
						</Column>
						<Column md={4} lg={4} sm={4}>
							<p>{t('documentationAdmin:noticeOfExpiration')}</p>
							<p>{noticeOfExpiration(documentTemplate?.noticeOfExpiration)}</p>
						</Column>
						<Column md={4} lg={4} sm={4}>
							<p>{t('documentationAdmin:totalUsages')}</p>
							<p>{documentTemplate?.usages}</p>
						</Column>
					</Grid>
				</Column>
				<Column className='mb-5'>
					<StructuredListWrapper isCondensed>
						<StructuredListHead>
							<StructuredListRow head>
								<StructuredListCell head>
									{t('documentationAdmin:stepOrder')}
								</StructuredListCell>
								<StructuredListCell head>
									{t('documentationAdmin:approvers')}
								</StructuredListCell>
							</StructuredListRow>
						</StructuredListHead>
						<StructuredListBody>
							{documentTemplate?.steps.length > 0 &&
								documentTemplate?.steps.map((step, index) => {
									return (
										<StructuredListRow>
											<StructuredListCell noWrap>
												{t('documentationAdmin:step')} {index}
											</StructuredListCell>
											<StructuredListCell>
												<div className='flex'>
													{(step?.approvers && step?.approvers.length > 0) ||
													(step?.delegates && step?.delegates.length > 0)
														? step?.approvers &&
														  step?.approvers.map(approver => {
																return (
																	<UserProfileImage
																		initials={
																			!approver.name && !approver.surname
																				? approver.username
																				: `${approver.name || ''} ${
																						approver.surname || ''
																				  }`
																		}
																		imageDescription={approver?.username}
																		size='md'
																	/>
																);
														  })
														: 'No approver selected'}
													{step?.delegates &&
														step?.delegates.length > 0 &&
														step?.delegates.map(delegates => {
															return (
																<UserProfileImage
																	initials={
																		!delegates.name && !delegates.surname
																			? delegates.username
																			: `${delegates.name || ''} ${
																					delegates.surname || ''
																			  }`
																	}
																	imageDescription={delegates?.username}
																	size='md'
																/>
															);
														})}
												</div>
											</StructuredListCell>
										</StructuredListRow>
									);
								})}
						</StructuredListBody>
						<br />
						<StructuredListHead>
							<StructuredListRow head>
								<StructuredListCell head>
									{t('documentationAdmin:chapterName')}
								</StructuredListCell>
								<StructuredListCell head>
									{t('documentationAdmin:description')}
								</StructuredListCell>
							</StructuredListRow>
						</StructuredListHead>
						<StructuredListBody>
							{documentTemplate?.chapters.length > 0 &&
								documentTemplate?.chapters.map(chapter => {
									return (
										<StructuredListRow>
											<StructuredListCell noWrap>
												{t('documentationAdmin:step')} {chapter?.chapterTitle}
											</StructuredListCell>
											<StructuredListCell>{chapter?.chapterTitle}</StructuredListCell>
										</StructuredListRow>
									);
								})}
						</StructuredListBody>
					</StructuredListWrapper>
				</Column>
			</ModalBody>
		</ComposedModal>
	);
};
export default ViewTemplatesModal;
