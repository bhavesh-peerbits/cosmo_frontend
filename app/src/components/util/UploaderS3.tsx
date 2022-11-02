import { FileUploaderDropContainer, FileUploaderItem } from '@carbon/react';
import {
	FieldPath,
	FieldValues,
	PathValue,
	UnpackNestedValue,
	useController,
	UseControllerProps
} from 'react-hook-form';
import { useMemo } from 'react';

type CosmoFileUploaderProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends File[]
	? {
			label: string;
			name: TName;
			rules?: UseControllerProps<T, TName>['rules'];
			multiple?: boolean;
	  }
	: never;

const UploaderS3 = <T extends FieldValues, TName extends FieldPath<T>>({
	name,
	rules,
	label,
	multiple
}: CosmoFileUploaderProps<T, TName>) => {
	const {
		field: { onChange, onBlur, value: formValue },
		fieldState: { error }
	} = useController({
		name,
		rules
	});
	const files = formValue as File[];
	const errorObj = useMemo(
		() =>
			error?.types
				? Object.values(error.types)
						.map(value => JSON.parse(`${value}` || '{}'))
						.reduce((previousValue, currentValue) =>
							previousValue.map((val: boolean | string, index: number) =>
								val === true ? currentValue[index] : val
							)
						)
				: [],
		[error]
	);

	return (
		<div>
			<FileUploaderDropContainer
				labelText={label}
				accept={['.csv']}
				className='w-full'
				onBlur={onBlur}
				multiple={multiple}
				// onAddFiles={(e, { addedFiles }) => console.log(addedFiles)}
			/>
			{files?.map((file, index) => (
				<div className='mt-2' key={file.name}>
					<FileUploaderItem
						errorBody={errorObj[index]}
						name={file.name}
						onDelete={() => {
							files.length > 1
								? onChange(files.filter((_, i) => i !== index))
								: onChange(undefined);
						}}
						errorSubject='File not valid'
						invalid={errorObj[index] !== undefined && errorObj[index] !== true}
						status='edit'
					/>
				</div>
			))}
		</div>
	);
};

export default UploaderS3;
