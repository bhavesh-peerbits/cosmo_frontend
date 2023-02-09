/* eslint-disable no-nested-ternary */
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { Grid, Tile, Button, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import User from '@model/User';
import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';
import useLoginStore from '@hooks/auth/useLoginStore';
import { EvidenceRequestStatus } from '@model/EvidenceRequestStatus';
import EvidenceRequestApproveForm from '../Components/EvidenceRequestApproveForm';
import EvidenceRequestUploadForm from '../Components/EvidenceRequestUploadForm';
import FileLinkTable from '../../../components/EvidenceRequest/FileLinkTable';

const ActionEvidenceRequestInfo = ({
	steps,
	currentStep,
	owner,
	statusRequest,
	setIsOpen,
	path,
	erId,
	stepBeforeReturn
}: {
	steps: EvidenceRequestStep[];
	currentStep: number;
	owner: User;
	statusRequest: EvidenceRequestStatus;
	setIsOpen: (value: boolean) => void;
	path: string;
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
	const showAppForm = type === 'APPROVAL' && statusRequest === 'IN_PROGRESS';
	const showUplForm = type === 'UPLOAD' && statusRequest === 'IN_PROGRESS';
	const thereIsContent = (
		index: number,
		cStep: number,
		step: EvidenceRequestStep,
		totStep: number
	) => {
		return (
			((index + 1 !== cStep || cStep === totStep) &&
				(step.stepInfo?.publicComment || step.fileLinks.length)) ||
			(index + 1 === cStep && idUserInStep && (showUplForm || showAppForm))
		);
	};

	return (
		<div className='space-y-5'>
			{steps
				.sort((a, b) => +a.id - +b.id)
				.map((step, index) => {
					return (
						<Layer key={step.id}>
							<Tile className='w-full' key={step.id} id={`${step.stepOrder}`}>
								<Grid narrow>
									<FullWidthColumn className='flex justify-between space-x-1 space-y-4'>
										<div className='grid w-full grid-cols-4'>
											<p
												data-toc-id={`step-${step.stepOrder}`}
												className='col-span-2 inline flex-1 text-productive-heading-1'
											>
												{step.stepOrder} - {step.type}
											</p>
											{step.completionDate ? (
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
												<p className='col-span-3 mt-5'>{`${t('task-owner')} : ${
													step.reviewer.displayName
												}`}</p>
											) : step.stepOrder === 1 && owner ? (
												<p className='col-span-3 mt-5'>{`${t('owner')} : ${
													owner.displayName
												}`}</p>
											) : (
												<span className='col-span-3' />
											)}
											{thereIsContent(index, currentStep, step, steps.length) ? (
												<div className='mt-3 justify-self-end'>
													<Button
														size='sm'
														kind='ghost'
														onClick={() =>
															setShowMore({ ...showMore, [index]: !showMore[index] })
														}
														hasIconOnly
														renderIcon={showMore[index] ? ChevronUp : ChevronDown}
														iconDescription={t('additional-info')}
													/>
												</div>
											) : null}
											{showMore[index] ? (
												<>
													{index + 1 !== currentStep || steps.length === currentStep ? (
														<>
															{step.delegates?.length ? (
																<p className='col-span-4 mt-5'>
																	{`${t('task-delegates')} : `}
																	{`${step.delegates
																		.map(app => app.displayName)
																		.join(', ')}`}
																</p>
															) : null}
															{step.stepInfo?.publicComment ? (
																<p className='col-span-4 mt-5'>
																	{`${t('public-comment')} :`}
																	<br />
																	{`${step.stepInfo?.publicComment}`}
																</p>
															) : null}
															{step.fileLinks.length ? (
																<div className='col-span-4 mt-5'>
																	<p>{t('attachments')} :</p>
																	<Layer>
																		<FileLinkTable files={step.fileLinks} />
																	</Layer>
																</div>
															) : null}
														</>
													) : null}
													{index + 1 === currentStep && idUserInStep ? (
														showUplForm ? (
															<EvidenceRequestUploadForm
																step={currStep}
																erId={erId}
																path={path + step.stepOrder}
															/>
														) : showAppForm ? (
															<EvidenceRequestApproveForm setIsOpen={setIsOpen} />
														) : null
													) : null}
												</>
											) : null}
										</div>
									</FullWidthColumn>
								</Grid>
							</Tile>
						</Layer>
					);
				})}
		</div>
	);
};

export default ActionEvidenceRequestInfo;
