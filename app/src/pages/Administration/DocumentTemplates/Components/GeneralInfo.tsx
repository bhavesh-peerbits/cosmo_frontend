import {
	Checkbox,
	Column,
	Grid,
	Layer,
	NumberInput,
	Select,
	SelectItem,
	TextInput,
	Tile,
	Toggle,
	Tooltip
} from '@carbon/react';
import { Information } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import { useEffect, useState } from 'react';
import {
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface GeneralInfoForm {
	generalInfo: {
		name: string;
		type: string;
		noticeOfExpiration: number;
		allowChanges: boolean;
		freeTextEnabled: boolean;
		freeTextRequired: boolean;
		applicationEnabled: boolean;
		applicationRequired: boolean;
	};
}

type GeneralInfoProps = {
	register: UseFormRegister<GeneralInfoForm>;
	errors: FieldErrors<GeneralInfoForm>;
	getValues?: UseFormGetValues<GeneralInfoForm>;
	watch?: UseFormWatch<GeneralInfoForm>;
	setValue: UseFormSetValue<GeneralInfoForm>;
};

const GeneralInfo = ({ register, errors, watch, setValue }: GeneralInfoProps) => {
	const [appNameList] = useState<string[]>([]);
	const allowChanges = watch ? watch('generalInfo.allowChanges') : undefined;
	const freeTextCheck = watch ? watch('generalInfo.freeTextEnabled') : undefined;
	const freeTextRequired = watch ? watch('generalInfo.freeTextRequired') : undefined;
	const applicationCheck = watch ? watch('generalInfo.applicationEnabled') : undefined;
	const applicationRequired = watch
		? watch('generalInfo.applicationRequired')
		: undefined;

	const templateTypes = [
		{ type: 'Policy', value: 'POLICY' },
		{ type: 'Baseline', value: 'BASELINE' },
		{ type: 'Standard', value: 'STANDARD' },
		{ type: 'Generic', value: 'GENERIC' }
	];
	const noticeOfExpiration = [
		{ type: 'weeks before', value: 'WEEKS_BEFORE' },
		{ type: 'days before', value: 'DAYS_BEFORE' },
		{ type: 'hours before', value: 'HOURS_BEFORE' }
	];

	const { t } = useTranslation('documentationAdmin');

	const [totalHours, setTotalHours] = useState({
		value: 2,
		before: 'WEEKS_BEFORE'
	});
	useEffect(() => {
		if (totalHours.before === 'WEEKS_BEFORE') {
			setValue('generalInfo.noticeOfExpiration', Number(totalHours.value) * 7 * 24);
		} else if (totalHours.before === 'DAYS_BEFORE') {
			setValue('generalInfo.noticeOfExpiration', Number(totalHours.value) * 24);
		} else {
			setValue('generalInfo.noticeOfExpiration', Number(totalHours.value));
		}
	}, [totalHours, setValue]);

	return (
		<Layer>
			<Grid fullWidth>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<TextInput
						className='w-full'
						id='name'
						invalidText={errors.generalInfo?.name?.message}
						labelText={`${t('template-name')} *`}
						placeholder={`${t('template-name-placeholder')}`}
						invalid={Boolean(errors.generalInfo?.name)}
						{...register('generalInfo.name', {
							required: {
								value: true,
								message: `${t('required')}`
							},
							validate: name =>
								!appNameList.includes(name.toLowerCase()) || `${t('name-exists')}`
						})}
					/>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<Select
						id='request-types'
						labelText={`${t('template-type')} *`}
						{...register('generalInfo.type', {
							required: true
						})}
					>
						{templateTypes.map(type => (
							<SelectItem text={type.type} value={type.value} key={type.value} />
						))}
					</Select>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5 flex'>
					<NumberInput
						id='notice-of-expiration'
						size='md'
						min={0}
						max={30}
						value={2}
						label={`${t('notice-of-expiration')} *`}
						onChange={(e, { value }) => setTotalHours({ ...totalHours, value })}
					/>
					<Select
						id='notice-of-expiration-type'
						onChange={e =>
							setTotalHours({
								...totalHours,
								before: e.currentTarget.value
							})
						}
					>
						{noticeOfExpiration.map(item => (
							<SelectItem text={item.type} value={item.value} key={item.value} />
						))}
					</Select>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<Toggle
						aria-label='Toggle Copy Procedure'
						labelA='No'
						labelB='Yes'
						id='allow-changes-toggle'
						toggled={allowChanges}
						onToggle={(val: boolean) => setValue('generalInfo.allowChanges', val)}
						labelText={
							<div className='flex'>
								<p className='text-label-1'>{t('allow-changes')}</p>
								<Tooltip align='top' label={t('allow-changes-info')}>
									<button type='button' onClick={e => e.preventDefault()}>
										<Information />
									</button>
								</Tooltip>
							</div>
						}
					/>
				</Column>
				<FullWidthColumn>
					<p className='mt-3 mb-3'>Additional information</p>
					<Layer className='h-full'>
						<Tile id='tile-1'>
							<div className='flex justify-start md:justify-between'>
								<h4 className='mb-5 text-productive-heading-3'>Free text</h4>
								<div>
									<Checkbox
										labelText=''
										id='freeText-check'
										checked={freeTextCheck}
										onChange={(e, { checked }) =>
											setValue('generalInfo.freeTextEnabled', checked)
										}
									/>
								</div>
							</div>
							<Toggle
								aria-label='Toggle Copy Procedure'
								title='Free text'
								labelA='Not required'
								labelB='Required'
								id='additional-info-freeText'
								toggled={freeTextRequired}
								onToggle={(val: boolean) => setValue('generalInfo.freeTextRequired', val)}
							/>
							<p className='mt-3 '>This is free text for general information</p>
						</Tile>
					</Layer>
				</FullWidthColumn>
				<br />
				<FullWidthColumn>
					<Layer className='h-full'>
						<Tile id='tile-1'>
							<div className='flex justify-start md:justify-between'>
								<h4 className='mb-5 text-productive-heading-3'>Application</h4>
								<div>
									<Checkbox
										labelText=''
										id='application-check'
										checked={applicationCheck}
										onChange={(e, { checked }) =>
											setValue('generalInfo.applicationEnabled', checked)
										}
									/>
								</div>
							</div>
							<Toggle
								aria-label='Toggle Copy Procedure'
								title='Free text'
								labelA='Not required'
								labelB='Required'
								id='additional-info-application'
								toggled={applicationRequired}
								onToggle={(val: boolean) =>
									setValue('generalInfo.applicationRequired', val)
								}
							/>
							<p className='mt-3'>This is application referenced by a document</p>
						</Tile>
					</Layer>
				</FullWidthColumn>
			</Grid>
		</Layer>
	);
};
export default GeneralInfo;
