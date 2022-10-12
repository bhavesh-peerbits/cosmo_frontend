/* eslint-disable no-nested-ternary */
import TableOfContents from '@components/TableOfContents';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { Grid, Tile, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import FileLink from '@model/FileLink';
import FileLinkTable from './FileLinkTable';

const EvidenceStepInfo = ({
	steps,
	currentStep,
	files
}: {
	steps: EvidenceRequestStep[];
	currentStep: number;
	files: FileLink[];
}) => {
	const { t } = useTranslation('evidenceRequest');
	let defaultShowMore = {};
	steps.forEach((_, i) => {
		defaultShowMore = { ...defaultShowMore, [i]: false };
	});
	const [showMore, setShowMore] = useState(defaultShowMore);
	return (
		<TableOfContents
			// stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
			tocStickyOffset={146}
		>
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
														{`Approvers : ${step.approvers
															.map(app => app.displayName)
															.join(', ')}`}
													</p>
												) : step.reviewer ? (
													<p className='col-span-3 mt-5'>{`Reviewer : ${step.reviewer.displayName}`}</p>
												) : step.stepInfo &&
												  JSON.parse(step.stepInfo).publicComment &&
												  !showMore[index as keyof typeof showMore] ? (
													<p className='col-span-3 mt-5 inline line-clamp-1 '>{`Public Comment : ${
														JSON.parse(step.stepInfo).publicComment
													}`}</p>
												) : (
													<p className='col-span-3' />
												)}
												<div className='mt-3 justify-self-end'>
													{!showMore[index as keyof typeof showMore] ? (
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
												{showMore[index as keyof typeof showMore] ? (
													step.stepInfo && JSON.parse(step.stepInfo).publicComment ? (
														<p className='col-span-4'>
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
												{showMore[index as keyof typeof showMore] ? (
													files.length ? (
														<div className='col-span-4'>
															<FileLinkTable files={files} />
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
