/* eslint-disable no-nested-ternary */
import TableOfContents from '@components/TableOfContents';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { Grid, Tile, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import User from '@model/User';
import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';
import useLoginStore from '@hooks/auth/useLoginStore';
import { EvidenceRequestStatus } from '@model/EvidenceRequestStatus';
import EvidenceRequestApproveForm from './EvidenceRequestApproveForm';
import EvidenceRequestUploadForm from './EvidenceRequestUploadForm';
import FileLinkTable from './FileLinkTable';

const ActionEvidenceRequestInfo = ({
	steps,
	currentStep,
	owner,
	statusRequest,
	setIsOpen,
	erId,
	stepBeforeReturn
}: {
	steps: EvidenceRequestStep[];
	currentStep: number;
	owner: User;
	statusRequest: EvidenceRequestStatus;
	setIsOpen: (value: boolean) => void;
	erId: string;
	stepBeforeReturn?: number;
}) => {
	const { auth } = useLoginStore();
	const { t } = useTranslation('evidenceRequest');
	const { type } = steps.filter(st => st.stepOrder === currentStep)[0];
	let defaultShowMore: Record<number, boolean> = {};
	steps.forEach((_, i) => {
		defaultShowMore = { ...defaultShowMore, [i]: i + 1 === currentStep };
	});
	const currStep = steps.filter(st => st.stepOrder === currentStep)[0];
	const idUserInStep = auth?.user?.id
		? currStep &&
		  (currStep.approvers?.map(us => us.id).includes(auth.user.id) ||
				currStep.delegates?.map(us => us.id).includes(auth.user.id) ||
				currStep.reviewer?.id === auth.user.id)
		: false;
	const [showMore, setShowMore] = useState(defaultShowMore);
	useLayoutEffect(() => {
		const selector = `*[data-toc-id="step-${currentStep}"]`;
		smoothScroll(selector, 240);
		triggerFocus(selector);
	}, [currentStep]);

	return (
		<TableOfContents stickyOffset={100} tocStickyOffset={100}>
			<Grid fullWidth className='h-full'>
				<FullWidthColumn className='space-y-5 pt-4'>
					{steps
						.sort((a, b) => +a.id - +b.id)
						.map((step, index) => {
							return (
								<Tile
									className='w-full bg-background'
									key={step.id}
									id={`${step.stepOrder}`}
								>
									<Grid>
										<FullWidthColumn className='flex justify-between space-x-1 space-y-4'>
											<div className='grid w-full grid-cols-4'>
												<p
													data-toc-id={`step-${step.stepOrder}`}
													className='col-span-2 inline flex-1 text-productive-heading-1'
												>
													{step.type}
												</p>
												{step.completionDate && step.stepOrder !== currStep.stepOrder ? (
													<span className='col-span-2 justify-self-end'>{`${t(
														'completion-date'
													)}: ${step.completionDate.toLocaleDateString()}`}</span>
												) : index + 1 === currentStep ? (
													<span className='col-span-2 justify-self-end'>
														{t('current-step')}
														{stepBeforeReturn &&
															currStep.stepOrder < stepBeforeReturn &&
															` (${t('check-step', { stepNumber: stepBeforeReturn })})`}
													</span>
												) : (
													<span className='col-span-2 justify-self-end'>
														{t('not-completed')}
													</span>
												)}
												{step.approvers?.length ? (
													<p className='col-span-3 mt-5'>
														{`${t('approvers')} : ${step.approvers
															.map(app => app.displayName)
															.join(', ')}`}
													</p>
												) : step.reviewer ? (
													<p className='col-span-3 mt-5'>{`${t('reviewer')} : ${
														step.reviewer.displayName
													}`}</p>
												) : step.stepOrder === 1 && owner ? (
													<p className='col-span-3 mt-5'>{`${t('owner')} : ${
														owner.displayName
													}`}</p>
												) : (
													<span className='col-span-3' />
												)}
												<div className='mt-3 justify-self-end'>
													{!showMore[index] ? (
														<Button
															size='sm'
															kind='ghost'
															onClick={() => setShowMore({ ...showMore, [index]: true })}
															hasIconOnly
															renderIcon={ChevronDown}
															iconDescription={t('additional-info')}
														/>
													) : index + 1 !== currentStep ? (
														<Button
															size='sm'
															kind='ghost'
															onClick={() => setShowMore({ ...showMore, [index]: false })}
															hasIconOnly
															renderIcon={ChevronUp}
															iconDescription={t('additional-info')}
														/>
													) : null}
												</div>
												{showMore[index] &&
												index + 1 !== currentStep &&
												step.stepInfo?.publicComment ? (
													<p className='col-span-4 mt-5'>
														{`${t('public-comment')} :`}
														<br />
														{`${step.stepInfo?.publicComment}`}
													</p>
												) : null}
												{showMore[index] &&
												index + 1 === currentStep &&
												type === 'UPLOAD' &&
												idUserInStep &&
												statusRequest === 'IN_PROGRESS' ? (
													<EvidenceRequestUploadForm step={currStep} erId={erId} />
												) : showMore[index] &&
												  index + 1 === currentStep &&
												  type === 'APPROVAL' &&
												  idUserInStep &&
												  statusRequest === 'IN_PROGRESS' ? (
													<EvidenceRequestApproveForm setIsOpen={setIsOpen} />
												) : null}
												{showMore[index] ? (
													index + 1 !== currentStep && step.fileLinks.length ? (
														<div className='col-span-4 mt-5'>
															<p>{t('attachments')} :</p>
															<FileLinkTable files={step.fileLinks} />
														</div>
													) : null
												) : null}
											</div>
										</FullWidthColumn>
									</Grid>
								</Tile>
							);
						})}
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};

export default ActionEvidenceRequestInfo;
