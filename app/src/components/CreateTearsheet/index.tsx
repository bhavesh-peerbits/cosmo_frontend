import React, { createContext, forwardRef, ReactNode } from 'react';
import { Form, Grid } from '@carbon/react';
import CreateInfluencer from '@components/CreateTearsheet/CreateInfluencer';
import Tearsheet from '@components/Tearsheet';
import FullWidthColumn from '@components/FullWidthColumn';
import useResetCreateComponent from '@hooks/create-tearsheet/useResetCreateComponent';
import useStepCreateActions from '@hooks/create-tearsheet/useStepCreateActions';
import './create-tearsheet.scss';

// This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps
export const StepNumberContext = createContext(-1);

export const CreateTearsheet = forwardRef<HTMLDivElement, CreateTearsheetProps>(
	(
		{
			// The component props, in alphabetical order (for consistency).

			backButtonText,
			cancelButtonText,
			children,
			className,
			description,
			influencerWidth = 'narrow',
			initialStep,
			label,
			nextButtonText,
			onClose,
			onRequestSubmit,
			open,
			submitButtonText,
			title,

			// Collect any other property values passed in.
			...rest
		},
		ref
	) => {
		useResetCreateComponent({
			open,
			initialStep
		});

		const { tearsheetActions, currentStep, stepData, onUnmount } = useStepCreateActions({
			backButtonText,
			onClose,
			onRequestSubmit,
			submitButtonText,
			nextButtonText
		});

		const onCloseEffect = (byCancel: boolean) => {
			if (byCancel) {
				onUnmount();
			} else {
				onClose?.();
			}
		};

		return (
			<Tearsheet
				{...rest}
				actions={tearsheetActions}
				description={description}
				hasCloseIcon={false}
				influencer={<CreateInfluencer currentStep={currentStep} stepData={stepData} />}
				influencerPosition='left'
				influencerWidth={influencerWidth}
				label={label}
				isRail
				onClose={onCloseEffect}
				open={open}
				title={title}
				ref={ref}
			>
				<div className='h-full overflow-x-hidden p-6'>
					<Grid>
						<FullWidthColumn>
							<Form>
								{React.Children.map(children, (child, index) => (
									<StepNumberContext.Provider value={index + 1}>
										{child}
									</StepNumberContext.Provider>
								))}
							</Form>
						</FullWidthColumn>
					</Grid>
				</div>
			</Tearsheet>
		);
	}
);

interface CreateTearsheetProps {
	/**
	 * The back button text
	 */
	backButtonText: string;

	/**
	 * The cancel button text
	 */
	cancelButtonText: string;

	/**
	 * The main content of the tearsheet
	 */
	children: ReactNode;

	/**
	 * An optional class or classes to be added to the outermost element.
	 */
	className?: string;

	/**
	 * A description of the flow, displayed in the header area of the tearsheet.
	 */
	description?: ReactNode;

	/**
	 * Used to set the size of the influencer
	 */
	influencerWidth?: 'narrow' | 'wide';

	/**
	 * This can be used to open the component to a step other than the first step.
	 * For example, a create flow was previously in progress, data was saved, and
	 * is now being completed.
	 */
	initialStep?: number;

	/**
	 * A label for the tearsheet, displayed in the header area of the tearsheet
	 * to maintain context for the tearsheet (e.g. as the title changes from page
	 * to page of a multi-page task).
	 */
	label?: ReactNode;

	/**
	 * The next button text
	 */
	nextButtonText: string;

	/**
	 * An optional handler that is called when the user closes the tearsheet (by
	 * clicking the close button, if enabled, or clicking outside, if enabled).
	 * Returning `false` here prevents the modal from closing.
	 */
	onClose?: () => void;

	/**
	 * Specify a handler for submitting the multi step tearsheet (final step).
	 * This function can _optionally_ return a promise that is either resolved or rejected and the CreateTearsheet will handle the submitting state of the create button.
	 */
	onRequestSubmit: () => void;

	/**
	 * Specifies whether the tearsheet is currently open.
	 */
	open?: boolean;

	/**
	 * The submit button text
	 */
	submitButtonText: string;

	/**
	 * The main title of the tearsheet, displayed in the header area.
	 */
	title?: ReactNode;
}
