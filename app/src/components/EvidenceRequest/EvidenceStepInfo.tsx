/* eslint-disable no-nested-ternary */
import TableOfContents from '@components/TableOfContents';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { Grid, Tile, Button, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import User from '@model/User';
import FileLinkTable from './FileLinkTable';

const EvidenceStepInfo = ({
	steps,
	currentStep,
	owner
}: {
	steps: EvidenceRequestStep[];
	currentStep: number;
	owner: User;
}) => {
	const { t } = useTranslation('evidenceRequest');
	let defaultShowMore: Record<number, boolean> = {};
	steps.forEach((_, i) => {
		defaultShowMore = { ...defaultShowMore, [i]: false };
	});
	const [showMore, setShowMore] = useState(defaultShowMore);
	const thereIsContent = (index: number, cStep: number, step: EvidenceRequestStep) => {
		return index + 1 !== cStep && (step.stepInfo?.publicComment || step.fileLinks.length);
	};

	return (
		<TableOfContents stickyOffset={100} tocStickyOffset={100}>
			<Grid fullWidth className='h-full'>
				<FullWidthColumn className='space-y-5 pt-4'>
					{steps
						.sort((a, b) => +a.id - +b.id)
						.map((step, index) => {
							return (
								<Layer>
									<Tile className='w-full' key={step.id}>
										<Grid>
											<FullWidthColumn className='flex justify-between space-x-1 space-y-4'>
												<div className='grid w-full grid-cols-4'>
													<p
														data-toc-id={`step-${step.id}`}
														className='col-span-2 inline flex-1 text-productive-heading-1'
													>
														{step.type}
													</p>
													{step.completionDate ? (
														<span className='col-span-2 justify-self-end'>{`${t(
															'completion-date'
														)}: ${step.completionDate.toLocaleDateString()}`}</span>
													) : index + 1 === currentStep ? (
														<span className='col-span-2 justify-self-end'>
															{t('current-step')}
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
													{thereIsContent(index, currentStep, step) ? (
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
														index + 1 !== currentStep ? (
															<>
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
														) : null
													) : null}
												</div>
											</FullWidthColumn>
										</Grid>
									</Tile>
								</Layer>
							);
						})}
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};

export default EvidenceStepInfo;
