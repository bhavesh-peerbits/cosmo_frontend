import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
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
	Tag
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import Application from '@model/Application';
import useCreateDraftMonitoring from '@api/change-monitoring/useCreateMonitoringDraft';
import { useForm } from 'react-hook-form';
import useGetAllMonitoringDraftNames from '@api/change-monitoring/useGetAllMonitoringDraftNames';
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

	const { mutate } = useCreateDraftMonitoring();
	const { data: draftNames } = useGetAllMonitoringDraftNames();

	const [isCopySelected, setIsCopySelected] = useState(false);
	const [selectedMonitoring, setSelectedMonitoring] = useState<string | number>('');

	const [selectedItemsFilters, setSelectedItemsFilters] = useState<{
		applications: Application[];
		controls: { id: string; name: string }[];
	}>({ applications: [], controls: [] });

	const cleanUp = () => {
		setIsCopySelected(false);
		setIsOpen(false);
		reset();
	};

	const createDraft = (data: NewMonitoringForm) => {
		return mutate({
			name: data.name,
			type: data.type === 'automatic',
			copyMonitoringId: isCopySelected ? +selectedMonitoring : undefined
		});
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
			<Form className='space-y-5 px-5'>
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
				<Toggle
					id='copy-monitoring-toggle'
					labelText={t('changeMonitoring:copy-monitoring')}
					labelA='No'
					labelB={t('changeMonitoring:copy')}
					aria-label='Copy monitoring type'
					toggled={isCopySelected}
					onToggle={() => setIsCopySelected(!isCopySelected)}
				/>
				{isCopySelected && (
					<div className='mt-3 space-y-5'>
						<div className='flex'>
							<Search
								labelText=''
								placeholder={t('changeMonitoring:search-monitoring-name')}
							/>
							<CosmoFiltersPanel>
								<NewMonitoringFilters
									setSelectedItems={setSelectedItemsFilters}
									selectedItems={selectedItemsFilters}
								/>
							</CosmoFiltersPanel>
						</div>
						{(selectedItemsFilters.applications.length > 0 ||
							selectedItemsFilters.controls.length > 0) && (
							<div className='space-x-3'>
								<span className='text-heading-1'>{t('management:filters')}:</span>
								{selectedItemsFilters.applications.length > 0 && (
									<Tag
										filter
										onClose={() =>
											setSelectedItemsFilters(old => ({ ...old, applications: [] }))
										}
									>
										{`${selectedItemsFilters.applications.length} `}
										{t('management:applications')}
									</Tag>
								)}
								{selectedItemsFilters.controls.length > 0 && (
									<Tag
										filter
										onClose={() =>
											setSelectedItemsFilters(old => ({ ...old, controls: [] }))
										}
									>
										{`${selectedItemsFilters.controls.length} `}
										{t('changeMonitoring:controls')}
									</Tag>
								)}
							</div>
						)}

						<Accordion>
							<AccordionItem
								key='c'
								title={
									// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
									<div
										className='flex w-fit justify-start'
										onClick={e => e.stopPropagation()}
									>
										<RadioButton
											labelText={
												<span className='text-productive-heading-2'>Monitoring Name</span>
											}
											value='value'
											onChange={value => setSelectedMonitoring(value)}
											checked={selectedMonitoring === 'value'}
										/>
									</div>
								}
							>
								<div className='flex flex-col'>
									<div className='flex space-x-1'>
										<span className='text-heading-1'>
											{t('changeMonitoring:completed-runs')}:
										</span>
										<span>5</span>
									</div>
									<div className='flex space-x-1'>
										<span className='text-heading-1'>
											{t('changeMonitoring:scheduling')}:
										</span>
										<span>On Demand</span>
									</div>
									<div className='mt-3 flex space-x-1'>
										<span className='text-heading-1'>Path:</span>
										<span>Path</span>
									</div>
								</div>
							</AccordionItem>
						</Accordion>
					</div>
				)}
			</Form>
		</TearsheetNarrow>
	);
};
export default NewMonitoringModal;
