import {
	Accordion,
	AccordionItem,
	Button,
	Checkbox,
	DatePicker,
	DatePickerInput,
	Form
} from '@carbon/react';
import useEvidenceRequests from '@hooks/evidence-request/useEvidenceRequests';
import { useTranslation } from 'react-i18next';
import { Reset } from '@carbon/react/icons';

const EvidenceRequestFilters = ({ view }: { view: string }) => {
	const { filtersAvailable, filters, setFilters } = useEvidenceRequests();
	const { t } = useTranslation('evidenceRequest');
	const handleCheckFilter = (
		filter: string,
		action: 'add' | 'remove',
		property: keyof Omit<typeof filters, 'query'>
	) => {
		(property === 'creator' || property === 'status') &&
			setFilters(old => ({
				[property]:
					action === 'add'
						? [...(old[property] ?? []), filter]
						: (old[property] ?? []).filter((f: string) => f !== filter)
			}));
	};

	const handleCheckCurrentStepFilter = (filter: number, action: 'add' | 'remove') => {
		setFilters(old => ({
			currentStep:
				action === 'add'
					? [...(old.currentStep ?? []), filter]
					: (old.currentStep ?? []).filter((f: number) => `${f}` !== `${filter}`)
		}));
	};

	const handleDateFilter = (
		filter: string,
		property: 'minDueDate' | 'maxDueDate' | 'minCompDate' | 'maxCompDate'
	) => {
		setFilters(old => ({
			...old,
			[property]: filter
		}));
	};

	return (
		<div className='flex flex-col'>
			<Accordion className='divide-y'>
				<AccordionItem title={t('creator')} className='border-0'>
					<Checkbox
						labelText={t('all')}
						id='owner-all'
						checked={filtersAvailable.creator.every(f => f.enabled)}
						onChange={(_, { checked }) =>
							setFilters({
								creator: checked
									? filtersAvailable.creator.map(({ creator }) => creator)
									: []
							})
						}
					/>
					{filtersAvailable.creator.map(filter => (
						<Checkbox
							key={filter.creator}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilter(id, checked ? 'add' : 'remove', 'creator')
							}
							id={filter.creator}
							labelText={filter.creator}
						/>
					))}
				</AccordionItem>
				<AccordionItem title={t('due-date')} className='border-0 '>
					<Form>
						<DatePicker
							id='date-picker'
							datePickerType='single'
							dateFormat='d/m'
							onChange={e => handleDateFilter(e[0].toDateString(), 'minDueDate')}
							maxDate={
								filters.maxDueDate
									? new Date(filters.maxDueDate).toLocaleDateString()
									: new Date('1/1/3000')
							}
							value={
								filters.minDueDate
									? new Date(filters.minDueDate).toLocaleDateString().slice(0, -5)
									: null
							}
						>
							<DatePickerInput labelText='min' id='min' size='sm' autoComplete='off' />
						</DatePicker>
						<DatePicker
							id='date-picker'
							datePickerType='single'
							dateFormat='d/m'
							onChange={e => handleDateFilter(e[0]?.toDateString(), 'maxDueDate')}
							minDate={
								filters.minDueDate
									? new Date(filters.minDueDate).toLocaleDateString()
									: new Date(0)
							}
							value={
								filters.maxDueDate
									? new Date(filters.maxDueDate).toLocaleDateString().slice(0, -5)
									: null
							}
						>
							<DatePickerInput labelText='max' id='max' size='sm' autoComplete='off' />
						</DatePicker>

						<Button
							type='reset'
							kind='tertiary'
							className='mt-3 w-full max-w-[212px]'
							renderIcon={Reset}
							size='sm'
							onClick={() => {
								setFilters(() => ({
									maxDueDate: undefined,
									minDueDate: undefined
								}));
							}}
						>
							Reset
						</Button>
					</Form>
				</AccordionItem>
				{view === 'Closed' && (
					<AccordionItem title={t('completion-date')} className='border-0 '>
						<Form>
							<DatePicker
								id='date-picker'
								datePickerType='single'
								dateFormat='d/m'
								onChange={e => handleDateFilter(e[0]?.toDateString(), 'minCompDate')}
								maxDate={
									filters.maxCompDate
										? new Date(filters.maxCompDate).toLocaleDateString()
										: new Date('1/1/3000')
								}
								value={
									filters.minCompDate
										? new Date(filters.minCompDate).toLocaleDateString().slice(0, -5)
										: null
								}
							>
								<DatePickerInput
									labelText='min'
									id='minCompDate'
									size='sm'
									autoComplete='off'
								/>
							</DatePicker>
							<DatePicker
								id='date-picker'
								datePickerType='single'
								dateFormat='d/m'
								onChange={e => handleDateFilter(e[0]?.toDateString(), 'maxCompDate')}
								minDate={
									filters.minCompDate
										? new Date(filters.minCompDate).toLocaleDateString()
										: new Date(0)
								}
								value={
									filters.maxCompDate
										? new Date(filters.maxCompDate).toLocaleDateString().slice(0, -5)
										: null
								}
							>
								<DatePickerInput
									labelText='max'
									id='maxCompDate'
									size='sm'
									autoComplete='off'
								/>
							</DatePicker>

							<Button
								type='reset'
								kind='tertiary'
								className='mt-3 w-full max-w-[212px]'
								renderIcon={Reset}
								size='sm'
								onClick={() => {
									setFilters(() => ({
										maxCompDate: undefined,
										minCompDate: undefined
									}));
								}}
							>
								Reset
							</Button>
						</Form>
					</AccordionItem>
				)}
				{view === 'Closed' && (
					<AccordionItem title={t('status')} className='border-0'>
						<Checkbox
							labelText={t('all')}
							id='status-all'
							checked={filtersAvailable.status.every(f => f.enabled)}
							onChange={(_, { checked }) =>
								setFilters({
									status: checked
										? filtersAvailable.status.map(({ status }) => status)
										: []
								})
							}
						/>
						{filtersAvailable.status.map(filter => (
							<Checkbox
								key={filter.status}
								checked={filter.enabled}
								onChange={(_, { checked, id }) =>
									handleCheckFilter(id, checked ? 'add' : 'remove', 'status')
								}
								id={filter.status}
								labelText={filter.status}
							/>
						))}
					</AccordionItem>
				)}
				{view === 'OnGoing' && (
					<AccordionItem title={t('current-step')} className='border-0'>
						<Checkbox
							labelText={t('all')}
							id='current-step-all'
							checked={filtersAvailable.currentStep.every(f => f.enabled)}
							onChange={(_, { checked }) =>
								setFilters({
									currentStep: checked
										? filtersAvailable.currentStep.map(({ currentStep }) => currentStep)
										: []
								})
							}
						/>
						{filtersAvailable.currentStep.map(filter => (
							<Checkbox
								key={filter.currentStep}
								checked={filter.enabled}
								onChange={(_, { checked, id }) =>
									handleCheckCurrentStepFilter(+id, checked ? 'add' : 'remove')
								}
								id={`${filter.currentStep}`}
								labelText={filter.currentStep}
							/>
						))}
					</AccordionItem>
				)}
			</Accordion>
		</div>
	);
};

export default EvidenceRequestFilters;
