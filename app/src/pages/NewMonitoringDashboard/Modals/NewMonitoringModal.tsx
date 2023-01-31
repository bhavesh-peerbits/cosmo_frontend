/* eslint-disable no-nested-ternary */
import { Dispatch, SetStateAction, useState } from 'react';
import {
	RadioButton,
	RadioButtonGroup,
	Form,
	Toggle,
	TextInput,
	Accordion,
	AccordionItem,
	Search,
	Tag,
	InlineNotification
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import useCreateDraftMonitoring from '@api/change-monitoring-analyst/useCreateMonitoringDraft';
import { useForm } from 'react-hook-form';
import useGetAllMonitoringDraftNames from '@api/change-monitoring-analyst/useGetAllMonitoringDraftNames';
import { useNavigate } from 'react-router-dom';
import ApiError from '@api/ApiError';
import useMonitoringForNewDraft from '@hooks/new-monitoring/useMonitoringForNewDraft';
import Centered from '@components/Centered';
import NoDataMessage from '@components/NoDataMessage';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import NewMonitoringFilters from '../Components/NewMonitoringFilters';

type NewMonitoringForm = {
	name: string;
	type: string;
	monitoringSelectedId: string;
};
type NewMonitoringModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const NewMonitoringModal = ({ isOpen, setIsOpen }: NewMonitoringModalProps) => {
	const { t } = useTranslation([
		'changeMonitoring',
		'management',
		'modals',
		'applicationInfo'
	]);
	const {
		setValue,
		getValues,
		handleSubmit,
		reset,
		register,
		formState: { errors, isValid }
	} = useForm<NewMonitoringForm>({ mode: 'onChange' });

	const navigate = useNavigate();
	const { mutate, error, isError } = useCreateDraftMonitoring();
	const { data: draftNames } = useGetAllMonitoringDraftNames();
	const { monitorings, filters, setFilters } = useMonitoringForNewDraft();

	const [isCopySelected, setIsCopySelected] = useState(false);
	const [selectedMonitoring, setSelectedMonitoring] = useState<string | number>('');

	const cleanUp = () => {
		setIsCopySelected(false);
		setIsOpen(false);
		reset();
		setFilters({ application: [], controlCode: [], q: undefined });
	};

	const createDraft = (data: NewMonitoringForm) => {
		return mutate(
			{
				name: data.name,
				type: data.type === 'automatic',
				copyMonitoringId: isCopySelected ? +selectedMonitoring : undefined
			},
			{
				onSuccess: newDraft => {
					navigate(`/new-monitoring/${newDraft.id}`);
				}
			}
		);
	};

	return (
		<TearsheetNarrow
			title={t('changeMonitoring:new-monitoring')}
			open={isOpen}
			onClose={cleanUp}
			hasCloseIcon
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-new-monitoring'
				},
				{
					label: t('modals:create'),
					id: 'create-new-monitoring',
					disabled: !isValid,
					onClick: handleSubmit(createDraft)
				}
			]}
		>
			<>
				<Form className='space-y-5 px-5 pt-5'>
					<RadioButtonGroup
						name='monitoring-type'
						legendText={`${t('changeMonitoring:monitoring-type')} *`}
						defaultSelected='manual'
						valueSelected={getValues('type')}
						onChange={value => setValue('type', value.toString())}
					>
						<RadioButton labelText={t('changeMonitoring:manual')} value='manual' />
						<RadioButton
							labelText={t('changeMonitoring:automatic')}
							value='automatic'
							disabled
						/>
					</RadioButtonGroup>
					<TextInput
						id='monitoring-name'
						labelText={`${t('changeMonitoring:monitoring-name')} *`}
						placeholder={t('changeMonitoring:monitoring-name-placeholder')}
						invalidText={errors.name?.message}
						invalid={Boolean(errors.name)}
						{...register('name', {
							required: {
								value: true,
								message: `${t('modals:field-required')}`
							},
							validate: name =>
								!draftNames
									?.map(existingName => existingName.toLowerCase())
									.includes(name.toLowerCase()) || t('applicationInfo:name-exists')
						})}
					/>
					{(monitorings.length > 0 || (!monitorings.length && filters)) && (
						<Toggle
							id='copy-monitoring-toggle'
							labelText={t('changeMonitoring:copy-monitoring')}
							labelA='No'
							labelB={t('changeMonitoring:copy')}
							aria-label='Copy monitoring type'
							toggled={isCopySelected}
							onToggle={() => setIsCopySelected(!isCopySelected)}
						/>
					)}
					{isCopySelected && (
						<div className='mt-3 space-y-5'>
							<div className='flex space-x-5'>
								<Search
									labelText=''
									placeholder={t('changeMonitoring:search-monitoring-name')}
									value={filters.q ?? ''}
									onChange={e =>
										setFilters(old => ({ ...old, q: e.currentTarget?.value }))
									}
								/>
								<CosmoFiltersPanel buttonSize='md'>
									<NewMonitoringFilters />
								</CosmoFiltersPanel>
							</div>

							<div className='space-x-3'>
								<span className='text-heading-1'>{t('management:filters')}:</span>
								{filters.application.length > 0 && (
									<Tag
										filter
										onClose={() => setFilters(old => ({ ...old, application: [] }))}
									>
										{`${filters.application.length} `}
										{t('management:applications')}
									</Tag>
								)}
								{filters.controlCode.length > 0 && (
									<Tag
										filter
										onClose={() => setFilters(old => ({ ...old, controlCode: [] }))}
									>
										{`${filters.controlCode.length} `}
										{t('changeMonitoring:controls')}
									</Tag>
								)}
							</div>
							{monitorings.length ? (
								<Accordion>
									{monitorings.map(monitoring => (
										<AccordionItem
											key={monitoring.id}
											title={
												// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
												<div
													className='flex w-fit justify-start'
													onClick={e => e.stopPropagation()}
												>
													<RadioButton
														labelText={
															<span className='text-productive-heading-2'>
																{monitoring.name}
															</span>
														}
														value={monitoring.id}
														onChange={value => setSelectedMonitoring(value)}
														checked={selectedMonitoring === monitoring.id}
													/>
												</div>
											}
										>
											<div className='flex flex-col'>
												<div className='flex space-x-1'>
													<span className='text-heading-1'>
														{t('changeMonitoring:completed-runs')}:
													</span>
													<span>
														{monitoring.status !== 'TERMINATED'
															? monitoring.currentRun
																? monitoring.currentRun - 1
																: 0
															: monitoring.scheduling.totalRuns}
													</span>
												</div>
												<div className='flex space-x-1'>
													<span className='text-heading-1'>
														{t('changeMonitoring:scheduling')}:
													</span>
													<span>{monitoring.scheduling.frequency}</span>
												</div>
												<div className='mt-3 flex space-x-1'>
													<span className='text-heading-1'>Path:</span>
													<span>
														{
															monitoring.monitoringAssets.map(el =>
																el.paths.map(path => path)
															).length
														}
													</span>
												</div>
											</div>
										</AccordionItem>
									))}
								</Accordion>
							) : (
								<Centered>
									<NoDataMessage title={t('changeMonitoring:no-monitoring')} />
								</Centered>
							)}
						</div>
					)}
				</Form>
				{isError && (
					<InlineNotification
						kind='error'
						title='Error'
						hideCloseButton
						subtitle={
							(error as ApiError)?.message ||
							'An error has occurred, please try again later'
						}
					/>
				)}
			</>
		</TearsheetNarrow>
	);
};
export default NewMonitoringModal;
