import {
	Layer,
	Button,
	Form,
	MultiSelect,
	RadioButton,
	RadioButtonGroup,
	NumberInput
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import { useForm } from 'react-hook-form';
import DatePickerWrapper from '@components/DatePickerWrapper';
import useDocumentTemplates from '@hooks/document-templates/useDocumentTemplates';

type DocumentTemplatesFiltersForm = {
	type: string[];
	allowChanges: boolean;
	approvalSteps: number;
	totalChapters: number;
	usages: number;
	createdOnFrom: Date;
	createdOnTo: Date;
};
const DocumentTemplatesFilters = () => {
	const { t } = useTranslation(['userSelect', 'evidenceRequest', 'documentationAdmin']);
	const { setFilters } = useDocumentTemplates();

	const {
		control,
		reset,
		getValues,
		handleSubmit,
		formState: { isDirty }
	} = useForm<DocumentTemplatesFiltersForm>({
		defaultValues: {
			type: [],
			allowChanges: undefined,
			approvalSteps: undefined,
			totalChapters: undefined,
			usages: undefined,
			createdOnFrom: undefined,
			createdOnTo: undefined
		}
	});

	const saveFilters = (data: DocumentTemplatesFiltersForm) => {
		setFilters({
			type: data.type || [],
			allowChanges: data.allowChanges,
			approvalSteps: data.approvalSteps,
			totalChapters: data.totalChapters,
			usages: data.usages,
			createdOnFrom: data.createdOnFrom ? data.createdOnFrom.toDateString() : undefined,
			createdOnTo: data.createdOnTo ? data.createdOnTo.toDateString() : undefined
		});
	};

	const typeList = ['Policy', 'Baseline', 'Generic', 'Standard'];
	return (
		<CosmoFiltersPanel flipped>
			<Form
				onReset={() => {
					reset();
					setFilters({
						type: [],
						allowChanges: undefined,
						approvalSteps: undefined,
						totalChapters: undefined,
						usages: undefined,
						createdOnFrom: undefined,
						createdOnTo: undefined
					});
				}}
			>
				<Layer className='space-y-5'>
					<p className='text-body-short-2'>{t('userSelect:filters')}:</p>
					<MultiSelect
						id='type'
						size='sm'
						label='types selected'
						titleText='Type'
						name='type'
						items={typeList}
						itemToString={item => item}
						initialSelectedItems={[]}
					/>
					<RadioButtonGroup
						legendText='Changes'
						name='allowChanges'
						onChange={(value, group) => setFilters({ [group]: value || undefined })}
					>
						<RadioButton labelText='Allowed' value='true' id='allowed' />
						<RadioButton labelText='Not Allowed' value='false' id='not-allowed' />
					</RadioButtonGroup>
					<NumberInput
						id='approver-total-steps'
						size='md'
						min={0}
						allowEmpty
						value={1}
						label='Total approval steps'
						name='approvalSteps'
						onChange={(e, { value }) => setFilters({ approvalSteps: Number(value) })}
					/>
					<NumberInput
						id='approver-chapters'
						size='md'
						min={0}
						allowEmpty
						value={1}
						label='Total chapters'
						name='totalChapters'
						onChange={(e, { value }) => setFilters({ totalChapters: Number(value) })}
					/>
					<NumberInput
						id='approver-usage'
						size='md'
						min={0}
						allowEmpty
						value={1}
						label='Total usage'
						name='usages'
						onChange={(e, { value }) => setFilters({ usages: Number(value) })}
					/>
					<DatePickerWrapper
						control={control}
						name='createdOnFrom'
						minDate={getValues('createdOnFrom')}
						label={t('documentationAdmin:created-on-from')}
					/>
					<DatePickerWrapper
						control={control}
						name='createdOnTo'
						maxDate={getValues('createdOnTo')}
						label={t('documentationAdmin:created-on-to')}
					/>

					<div>
						<div className='space-y-3'>
							<div className='w-full'>
								<Button
									className='w-full'
									size='sm'
									kind='secondary'
									type='reset'
									disabled={!isDirty}
								>
									Reset
								</Button>
							</div>
							<div className='w-full'>
								<Button
									className='w-full'
									size='sm'
									onClick={handleSubmit(saveFilters)}
									disabled={!isDirty}
								>
									{t('evidenceRequest:save')}
								</Button>
							</div>
						</div>
					</div>
				</Layer>
			</Form>
		</CosmoFiltersPanel>
	);
};

export default DocumentTemplatesFilters;
