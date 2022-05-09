import { Column, Grid, TextInput, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';
import User from '@model/User';
import SingleUserSelect from '@components/SingleUserSelect';
import MultipleUserSelect from '@components/MultipleUserSelect';
import IconPicker, { icons } from '@components/IconPicker';
import TiptapEditor from '@components/tiptap/TiptapEditor';

export interface GeneralInfoForm {
	generalInfo: {
		name: string;
		icon: keyof typeof icons;
		codeName: string;
		owner: User;
		description: string;
		delegates: User[];
		appMaintenance: string;
		operationSupplier: string;
	};
}

type GeneralInfoProps = {
	register: UseFormRegister<GeneralInfoForm>;
	errors: FieldErrors<GeneralInfoForm>;
	control: Control<GeneralInfoForm>;
};

const GeneralInfo = ({ register, errors, control }: GeneralInfoProps) => {
	const {
		field: { onChange, value }
	} = useController({
		control,
		name: 'generalInfo.icon',
		rules: {
			required: true
		}
	});

	return (
		<Tile href='ApplicationName' className='w-full bg-layer-accent-1 pb-7'>
			<Grid fullWidth className='space-y-7'>
				<FullWidthColumn data-toc-id='general-info' className='text-productive-heading-3'>
					General Information
				</FullWidthColumn>
				<FullWidthColumn>
					<Grid fullWidth>
						<FullWidthColumn>
							<IconPicker icon={value} onChange={onChange} />
						</FullWidthColumn>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='name'
								invalidText={errors.generalInfo?.name?.message}
								labelText='Name *'
								placeholder='Name'
								helperText='Application name'
								invalid={Boolean(errors.generalInfo?.name)}
								{...register('generalInfo.name', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='code'
								invalidText={errors.generalInfo?.codeName?.message}
								labelText='Code *'
								placeholder='Code'
								helperText='Acronym for the application name'
								invalid={Boolean(errors.generalInfo?.codeName)}
								{...register('generalInfo.codeName', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</Column>
						<FullWidthColumn className='mb-5'>
							<SingleUserSelect
								control={control}
								label='Owner *'
								name='generalInfo.owner'
								rules={{
									required: true
								}}
							/>
						</FullWidthColumn>
						<FullWidthColumn className='mb-5'>
							<MultipleUserSelect
								control={control}
								label='Owner Delegates'
								name='generalInfo.delegates'
							/>
						</FullWidthColumn>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='application-maintenance-supplier'
								labelText='Application Maintenance Supplier'
								placeholder='Application maintenance supplier'
								{...register('generalInfo.appMaintenance')}
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='operation-supplier'
								labelText='Operation Supplier'
								placeholder='Operation supplier'
								{...register('generalInfo.operationSupplier')}
							/>
						</Column>
						<FullWidthColumn>
							<div>
								<p className='mb-3 text-text-secondary text-label-1'> Description </p>
								<TiptapEditor />
							</div>
						</FullWidthColumn>
					</Grid>
				</FullWidthColumn>
			</Grid>
		</Tile>
	);
};
export default GeneralInfo;
