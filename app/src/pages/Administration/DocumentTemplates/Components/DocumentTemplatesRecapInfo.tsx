/* eslint-disable no-nested-ternary */
import {
	Column,
	Grid,
	Layer,
	StructuredListBody,
	StructuredListCell,
	StructuredListHead,
	StructuredListRow,
	StructuredListWrapper
} from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import Templates from '@model/Administration/DocumentTemplates';
import { useTranslation } from 'react-i18next';

interface RecapInfoProps {
	recapInfo: Templates;
}
const DocumentTemplatesRecapInfo = ({ recapInfo }: RecapInfoProps) => {
	const { t } = useTranslation(['modals', 'documentationAdmin']);

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
		<Layer>
			<Grid fullWidth>
				<Column sm={4} md={4} lg={4}>
					<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
						{t('documentationAdmin:type')}
					</p>
					<p className='text-xl block truncate font-normal'>
						{showTemplateType(recapInfo?.type ? recapInfo?.type : '')}
					</p>
				</Column>
				<Column sm={4} md={4} lg={4}>
					<p>{t('documentationAdmin:additionalInfo')}</p>
					<p>
						{recapInfo.freeTextEnabled && recapInfo.applicationEnabled
							? 'Free Text and Application'
							: recapInfo.freeTextEnabled
							? 'Free Text'
							: recapInfo.applicationEnabled
							? 'Application'
							: '-'}
					</p>
				</Column>
				<Column sm={4} md={4} lg={4}>
					<p>{t('documentationAdmin:noticeOfExpiration')}</p>
					<p>{noticeOfExpiration(recapInfo?.noticeOfExpiration)}</p>
				</Column>
				<Column sm={4} md={4} lg={4}>
					<p>{t('documentationAdmin:totalUsages')}</p>
					<p>{recapInfo?.usages}</p>
				</Column>
				<br />
				<Column sm={16} md={16} lg={16} className='mb-5'>
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
							{recapInfo?.steps.length > 0 &&
								recapInfo?.steps.map((step, index) => {
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
							{recapInfo?.chapters.length > 0 &&
								recapInfo?.chapters.map(chapter => {
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
			</Grid>
		</Layer>
	);
};
export default DocumentTemplatesRecapInfo;
