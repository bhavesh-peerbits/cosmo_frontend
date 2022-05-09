export {};
// import {
// 	ClearIndicatorProps,
// 	components,
// 	ControlProps,
// 	DropdownIndicatorProps,
// 	LoadingIndicatorProps,
// 	MultiValueGenericProps
// } from 'react-select';
// import AsyncSelect from 'react-select/async';
// import { Loading, Search, Select as CarbonSelect, SelectItem, Tag } from '@carbon/react';
// import makeAnimated from 'react-select/animated';
// import './cosmo-select.scss';
// import classNames from 'classnames';
// import { forwardRef } from 'react';
// import { ChevronDown, Close, WarningAltFilled, WarningFilled } from '@carbon/react/icons';
//
// const animatedComponents = makeAnimated();
//
// const prefix = 'cds';
//
// const ClearIndicator = ({ innerProps }: ClearIndicatorProps<{ value: string }, true>) => {
// 	return (
// 		<div
// 			{...innerProps}
// 			role='button'
// 			className='flex h-full items-center fill-icon-primary p-3 transition hover:bg-field-hover-2'
// 		>
// 			<Close />
// 		</div>
// 	);
// };
//
// const Control = (props: ControlProps<{ value: string }, false>) => {
// 	const invalid = false;
// 	const disabled = false;
// 	const warn = false;
// 	const size = 'md';
// 	const id = 'id';
// 	const invalidText = 'invalidText';
// 	const warnText = 'warnText';
// 	const helperText = 'helperText';
// 	const labelText = 'labelText';
// 	const noLabel = false;
// 	const className = '';
// 	const selectClasses = classNames({
// 		[`${prefix}--select`]: true,
// 		[`${prefix}--select--invalid`]: invalid,
// 		[`${prefix}--select--disabled`]: disabled,
// 		[`${prefix}--select--warning`]: warn
// 	});
// 	const labelClasses = classNames(`${prefix}--label`, {
// 		[`${prefix}--label--disabled`]: disabled
// 	});
// 	const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
// 		[`${prefix}--form__helper-text--disabled`]: disabled
// 	});
//
// 	const errorId = `${id}-error-msg`;
// 	const errorText = (() => {
// 		if (invalid) {
// 			return invalidText;
// 		}
// 		if (warn) {
// 			return warnText;
// 		}
// 	})();
//
// 	const error =
// 		invalid || warn ? (
// 			<div className={`${prefix}--form-requirement`} id={errorId}>
// 				{errorText}
// 			</div>
// 		) : null;
//
// 	const helper = helperText ? (
// 		<div className={helperTextClasses}>{helperText}</div>
// 	) : null;
// 	const inputClasses = classNames('flex pr-0 outline', {
// 		[`${prefix}--select-input`]: true,
// 		[`${prefix}--select-input--${size}`]: size,
// 		'focus:outline-2': props.isFocused,
// 		'outline-focus': props.isFocused
// 	});
// 	return (
// 		<div className={classNames(`${prefix}--form-item`, className)}>
// 			<div className={selectClasses}>
// 				{!noLabel && (
// 					<label htmlFor={id} className={labelClasses}>
// 						{labelText}
// 					</label>
// 				)}
//
// 				<div
// 					className={`${prefix}--select-input__wrapper`}
// 					data-invalid={invalid || null}
// 				>
// 					<div {...props.innerProps} className={inputClasses}>
// 						{props.children}
// 					</div>
// 				</div>
// 				{error || helper}
// 			</div>
// 		</div>
// 	);
// };
//
// const DropdownIndicator = (props: DropdownIndicatorProps<{}, true>) => {
// 	const invalid = false;
// 	const warn = false;
// 	return (
// 		<components.DropdownIndicator {...props} className='mr-3 h-full'>
// 			{!invalid && !warn && (
// 				<ChevronDown
// 					className={`${prefix}--select__arrow`}
// 					style={{ position: 'inherit' }}
// 				/>
// 			)}
// 			{invalid && (
// 				<WarningFilled
// 					className={`${prefix}--select__invalid-icon`}
// 					style={{ position: 'inherit' }}
// 				/>
// 			)}
// 			{!invalid && warn && (
// 				<WarningAltFilled
// 					style={{ position: 'inherit' }}
// 					className={`${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`}
// 				/>
// 			)}
// 		</components.DropdownIndicator>
// 	);
// };
//
// const LoadingIndicator = (props: LoadingIndicatorProps) => {
// 	return <Loading withOverlay={false} small {...props} />;
// };
//
// const MultiValueContainer = (props: MultiValueGenericProps<{ value: string }>) => {
// 	return (
// 		<Tag onClick={e => e.preventDefault()}>
// 			<div className='flex'>{props.children}</div>
// 		</Tag>
// 	);
// };
//
// const CosmoSelect = forwardRef(
// 	(
// 		{
// 			className = '',
// 			id = 'select',
// 			labelText = 'label',
// 			disabled = false,
// 			children,
// 			noLabel = false,
// 			invalid = false,
// 			invalidText = '',
// 			helperText = '',
// 			size = 'md',
// 			warn = false,
// 			warnText = '',
// 			...other
// 		},
// 		ref
// 	) => {
// 		const selectClasses = classNames({
// 			[`${prefix}--select`]: true,
// 			[`${prefix}--select--invalid`]: invalid,
// 			[`${prefix}--select--disabled`]: disabled,
// 			[`${prefix}--select--warning`]: warn
// 		});
// 		const labelClasses = classNames(`${prefix}--label`, {
// 			[`${prefix}--label--disabled`]: disabled
// 		});
// 		const inputClasses = classNames({
// 			[`${prefix}--select-input`]: true,
// 			[`${prefix}--select-input--${size}`]: size
// 		});
// 		const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
// 			[`${prefix}--form__helper-text--disabled`]: disabled
// 		});
//
// 		const errorId = `${id}-error-msg`;
// 		const errorText = (() => {
// 			if (invalid) {
// 				return invalidText;
// 			}
// 			if (warn) {
// 				return warnText;
// 			}
// 		})();
//
// 		const error =
// 			invalid || warn ? (
// 				<div className={`${prefix}--form-requirement`} id={errorId}>
// 					{errorText}
// 				</div>
// 			) : null;
//
// 		const helper = helperText ? (
// 			<div className={helperTextClasses}>{helperText}</div>
// 		) : null;
//
// 		const ariaProps = invalid ? { 'aria-describedby': errorId } : {};
//
// 		const promiseOptions = (inputValue: string) =>
// 			new Promise(resolve => {
// 				setTimeout(() => {
// 					resolve([{ value: inputValue, label: 'label' }]);
// 				}, 1000);
// 			});
// 		return (
// 			<div>
// 				<Search labelText='sad' />
// 				<CarbonSelect id='carbon' warn invalid>
// 					<SelectItem value='cosmo' text='Cosmo' />
// 					<SelectItem value='aizoOn' text='AizoOn' />
// 				</CarbonSelect>
// 				<div className={classNames(`${prefix}--form-item`, className)}>
// 					<div className={selectClasses}>
// 						{!noLabel && (
// 							<label htmlFor={id} className={labelClasses}>
// 								{labelText}
// 							</label>
// 						)}
//
// 						<div
// 							className={`${prefix}--select-input__wrapper`}
// 							data-invalid={invalid || null}
// 						>
// 							<select
// 								{...other}
// 								{...ariaProps}
// 								id={id}
// 								className={inputClasses}
// 								disabled={disabled || undefined}
// 								aria-invalid={invalid || undefined}
// 								ref={ref}
// 							>
// 								{children}
// 							</select>
// 							<ChevronDown className={`${prefix}--select__arrow`} />
// 							{invalid && <WarningFilled className={`${prefix}--select__invalid-icon`} />}
// 							{!invalid && warn && (
// 								<WarningAltFilled
// 									className={`${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`}
// 								/>
// 							)}
// 						</div>
// 						{error || helper}
// 					</div>
// 				</div>
// 				<AsyncSelect
// 					className='w-full'
// 					classNamePrefix='cosmo-select'
// 					isClearable
// 					loadOptions={promiseOptions}
// 					components={{
// 						ClearIndicator,
// 						Control,
// 						DropdownIndicator,
// 						LoadingIndicator,
// 						MultiValueContainer,
// 						IndicatorSeparator: null
// 					}}
// 					isMulti
// 					options={[
// 						{ value: 'chocolate', label: 'Chocolate' },
// 						{ value: 'strawberry', label: 'Strawberry' },
// 						{ value: 'vanilla', label: 'Vanilla' }
// 					]}
// 				/>
// 			</div>
// 		);
// 	}
// );
// export default CosmoSelect;
