/* eslint-disable no-nested-ternary */
import TableOfContents from '@components/TableOfContents';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { Grid, Tile, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import UserBase from '@model/UserBase';
import FileLinkTable from './FileLinkTable';

const EvidenceStepInfo = ({
	steps,
	currentStep,
	owner
}: {
	steps: EvidenceRequestStep[];
	currentStep: number;
	owner: UserBase;
}) => {
	const { t } = useTranslation('evidenceRequest');
	let defaultShowMore: Record<number, boolean> = {};
	steps.forEach((_, i) => {
		defaultShowMore = { ...defaultShowMore, [i]: false };
	});
	const [showMore, setShowMore] = useState(defaultShowMore);
	return (
		<TableOfContents stickyOffset={100} tocStickyOffset={146}>
			<Grid fullWidth className='h-full'>
				<FullWidthColumn className='space-y-5 pt-4'>
					{steps
						.sort((a, b) => +a.id - +b.id)
						.map((step, index) => {
							return (
								<Tile className='w-full bg-background' key={step.id}>
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
													)}: ${step.completionDate}`}</span>
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
													<p className='col-span-3 mt-5'>{`${t('reviewer')} : ${
														step.reviewer.displayName
													}`}</p>
												) : owner ? (
													<p className='col-span-3 mt-5'>{`${t('owner')} : ${
														owner.displayName
													}`}</p>
												) : null}
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
													) : (
														<Button
															size='sm'
															kind='ghost'
															onClick={() => setShowMore({ ...showMore, [index]: false })}
															hasIconOnly
															renderIcon={ChevronUp}
															iconDescription={t('additional-info')}
														/>
													)}
												</div>
												{showMore[index] ? (
													step.stepInfo && JSON.parse(step.stepInfo).publicComment ? (
														<p className='col-span-4 mt-5'>
															{`${t('public-comment')} :`}
															<br />
															{`${
																step.stepInfo
																	? JSON.parse(step.stepInfo).publicComment
																	: ''
															}`}
														</p>
													) : null
												) : null}
												{showMore[index] ? (
													step.fileLinks.length ? (
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

export default EvidenceStepInfo;
