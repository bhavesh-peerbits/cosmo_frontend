import { ReactNode } from 'react';
import cx from 'classnames';
import { ProgressIndicator, ProgressStep } from '@carbon/react';

const CreateInfluencer = ({
	className,
	currentStep,
	stepData
}: CreateInfluencerProps) => {
	// renders the step progression components in the left influencer area
	const renderProgressSteps = () => {
		const extractedSteps = stepData?.filter(item => !item?.introStep);
		const progressSteps = extractedSteps?.filter(item => item?.shouldIncludeStep);

		// To get the ProgressIndicator's `currentIndex`, accounting for dynamic steps,
		// we need to subtract the number of !shouldIncludeStep/s before the current step
		// which we get from `getNumberOfDynamicStepsBeforeCurrentStep()`
		const totalDynamicSteps =
			stepData
				?.slice(0, currentStep - 1)
				?.filter(step => step.shouldIncludeStep === false)?.length || 0;

		return (
			<div className='col-span-full row-span-full overflow-y-auto'>
				{currentStep === 1 && stepData?.[0]?.introStep ? null : (
					<ProgressIndicator
						currentIndex={
							stepData?.[0]?.introStep
								? currentStep - totalDynamicSteps - 2 // minus 2 because we need to account for the intro step in addition to `currentIndex` being 0 index based and our steps being 1 index based
								: currentStep - totalDynamicSteps - 1 // minus 1 because ProgressIndicator currentIndex prop is 0 index based, but our steps are 1 index based
						}
						spaceEqually
						vertical
						className='p-6'
					>
						{progressSteps?.map(step => {
							return (
								<ProgressStep
									label={step.title}
									key={step.key}
									secondaryLabel={step.secondaryLabel}
								/>
							);
						})}
					</ProgressIndicator>
				)}
			</div>
		);
	};

	return (
		<div className={cx('grid h-full grid-cols-[100%] grid-rows-[1fr_auto]', className)}>
			{renderProgressSteps()}
		</div>
	);
};

interface CreateInfluencerProps {
	/**
	 * Provide an optional class to be applied to the containing node.
	 */
	className?: string;
	/**
	 * Used to mark the current step on the ProgressIndicator component
	 */
	currentStep: number;

	/**
	 * The step data that renders the progress items
	 */
	stepData?: Array<{
		key: string;
		introStep?: boolean;
		secondaryLabel?: string;
		shouldIncludeStep?: boolean;
		title?: ReactNode;
	}>;
}

export default CreateInfluencer;
