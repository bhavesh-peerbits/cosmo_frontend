import { forwardRef, ReactNode, useContext, useEffect } from 'react';
import cx from 'classnames';
import { Column, FormGroup, Grid } from '@carbon/react';
import { StepNumberContext } from '@components/CreateTearsheet/index';
import useRetrieveStepData from '@hooks/create-tearsheet/useRetrieveStepData';

const CreateTearsheetStep = forwardRef<HTMLDivElement, CreateTearsheetStepProps>(
	(
		{
			keyValue,
			children,
			className,
			description,
			disableSubmit,
			fieldsetLegendText,
			hasFieldset = true,
			includeStep = true,
			introStep,
			onNext,
			onMount,
			secondaryLabel,
			subtitle,
			title,

			// Collect any other property values passed in.
			...rest
		},
		ref
	) => {
		const stepNumber = useContext(StepNumberContext);

		const { currentStep, setState } = useRetrieveStepData({
			key: keyValue,
			stepNumber,
			introStep,
			includeStep,
			secondaryLabel,
			title
		});

		// Whenever we are the current step, supply our disableSubmit and onNext values to the
		// steps container context so that it can manage the 'Next' button appropriately.
		useEffect(() => {
			if (stepNumber === currentStep) {
				setState(old => ({
					...old,
					isSubmitDisabled: disableSubmit,
					onNext
				}));
			}
		}, [stepNumber, disableSubmit, onNext, currentStep, setState]);

		return (
			<div
				{
					// Pass through any other property values as HTML attributes.
					...rest
				}
				className={cx(className, {
					hidden: stepNumber !== currentStep,
					'create-tearsheet__visible-step': stepNumber === currentStep
				})}
				ref={ref}
			>
				<Column xlg={12} lg={12} md={8} sm={8}>
					<h4 className='mb-5 text-productive-heading-3'>{title}</h4>
					{subtitle && <h6 className='mb-3 text-productive-heading-1'>{subtitle}</h6>}
					{description && <p className='mb-6 text-body-long-1'>{description}</p>}
				</Column>
				<Column xlg={12} lg={12} md={8} sm={8}>
					{hasFieldset ? (
						<FormGroup
							legendText={<div className='mb-4'>{fieldsetLegendText}</div>}
							className='mb-0'
						>
							<Grid>
								<Column max={5} lg={8} md={8} sm={4}>
									{children}
								</Column>
							</Grid>
						</FormGroup>
					) : (
						<Grid>
							<Column max={5} lg={8} md={8} sm={4}>
								{children}
							</Column>
						</Grid>
					)}
				</Column>
			</div>
		);
	}
);

interface CreateTearsheetStepProps {
	keyValue: string;

	/**
	 * Content that shows in the tearsheet step
	 */
	children: ReactNode;

	/**
	 * Sets an optional className to be added to the tearsheet step
	 */
	className?: string;

	/**
	 * Sets an optional description on the step component
	 */
	description?: string;

	/**
	 * This will conditionally disable the submit button in the multi step Tearsheet
	 */
	disableSubmit?: boolean;

	/**
	 * This is the required legend text that appears above a fieldset html element for accessibility purposes.
	 * You can set the `hasFieldset` prop to false if you have multiple fieldset elements or want to control the children of your Full Page's step content.
	 * Otherwise, use CSS to hide/remove this label text.
	 */
	fieldsetLegendText?: string;

	/**
	 * This optional prop will render your form content inside of a fieldset html element
	 * and is defaulted to true.
	 * You can set this prop to `false` if you have multiple fieldset elements or want to control the children of your Full Page's step content.
	 */
	hasFieldset?: boolean;

	/**
	 * This prop is used to help track dynamic steps. If this value is `false` then the step is not included in the visible steps or the ProgressIndicator
	 * steps. If this value is `true` then the step will be included in the list of visible steps, as well as being included in the ProgressIndicator step list
	 */
	includeStep?: boolean;

	/**
	 * This prop can be used on the first step to mark it as an intro step, which will not render the progress indicator steps
	 */
	introStep?: boolean;

	/**
	 * Optional function to be called on initial mount of a step.
	 * For example, this can be used to fetch data that is required on a particular step.
	 */
	onMount?: () => void;

	/**
	 * Optional function to be called on a step change.
	 * For example, this can be used to validate input fields before proceeding to the next step.
	 * This function can _optionally_ return a promise that is either resolved or rejected and the CreateTearsheet will handle the submitting state of the next button.
	 */
	onNext?: () => Promise<void>;

	/**
	 * Sets the optional secondary label on the progress step component
	 */
	secondaryLabel?: string;

	/**
	 * Sets an optional subtitle on the step component
	 */
	subtitle?: string;

	/**
	 * Sets the title text for a tearsheet step
	 */
	title: ReactNode;
}

export default CreateTearsheetStep;
