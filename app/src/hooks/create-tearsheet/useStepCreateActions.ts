import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import firstLastIncludedStepStore from '@store/create-tearsheet/firstLastIncludedStepStore';
import stepDataStore from '@store/create-tearsheet/stepDataStore';

interface IUseStepCreateActions {
	onRequestSubmit: () => void;
	onClose: (() => void) | undefined;
	backButtonText: string;
	nextButtonText: string;
	submitButtonText: string;
}
interface ActionButtonProps {
	id: string;
	label: string;
	onClick: () => void;
	disabled?: boolean;
	kind: 'primary' | 'secondary';
	loading?: boolean;
}

const useStepCreateActions = ({
	onRequestSubmit,
	onClose,
	backButtonText,
	nextButtonText,
	submitButtonText
}: IUseStepCreateActions) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [tearsheetActions, setCreateComponentActions] = useState<ActionButtonProps[]>([]);

	const [{ currentStep, stepData, onNext, isSubmitDisabled }, setState] =
		useRecoilState(stepDataStore);
	const { firstIncludedStep, lastIncludedStep } = useRecoilValue(
		firstLastIncludedStepStore
	);

	const onUnmount = useCallback(() => {
		setIsSubmitting(false);
		onClose?.();
	}, [onClose]);

	const continueToNextStep = useCallback(() => {
		setIsSubmitting(false);
		setState(({ currentStep: cStep, stepData: cStepData, ...rest }) => {
			let prev = cStep;
			// Find next included step to render
			// There will always be a next step otherwise we will
			// have reach the onSubmit
			do {
				prev += 1;
			} while (!cStepData[prev - 1]?.shouldIncludeStep);

			return {
				...rest,
				stepData: cStepData,
				currentStep: prev
			};
		});
	}, [setState]);

	// useEffect to handle multi step logic
	useEffect(() => {
		const handleOnRequestSubmit = async () => {
			// check if onRequestSubmit returns a promise
			try {
				await onRequestSubmit();
				onUnmount();
			} catch (error) {
				setIsSubmitting(false);
				// submit error
			}
		};
		const handleNext = async () => {
			setIsSubmitting(true);
			if (typeof onNext === 'function') {
				try {
					await onNext();
					continueToNextStep();
				} catch (error) {
					setIsSubmitting(false);
					// onNextError
				}
			} else {
				continueToNextStep();
			}
		};

		const handleSubmit = async () => {
			setIsSubmitting(true);
			// last step should have onNext as well
			if (typeof onNext === 'function') {
				try {
					await onNext();
					await handleOnRequestSubmit();
				} catch (error) {
					setIsSubmitting(false);
					// onNextError
				}
			} else {
				await handleOnRequestSubmit();
			}
		};
		if (stepData?.length > 0) {
			const buttons = [];
			if (stepData?.length > 1) {
				buttons.push({
					id: 'create-action-button-back',
					label: backButtonText,
					onClick: () =>
						setState(({ currentStep: cStep, stepData: cStepData, ...rest }) => {
							// Find previous included step to render
							// There will always be a previous step otherwise we will
							// have disabled the back button since we have reached the first visible step
							let prev = cStep;
							do {
								prev -= 1;
							} while (!cStepData[prev - 1]?.shouldIncludeStep);
							return {
								...rest,
								stepData: cStepData,
								currentStep: prev
							};
						}),
					kind: 'secondary' as const,
					disabled: currentStep === firstIncludedStep
				});
			}
			buttons.push({
				id: 'create-action-button-submit',
				label: currentStep < lastIncludedStep ? nextButtonText : submitButtonText,
				onClick: currentStep < lastIncludedStep ? handleNext : handleSubmit,
				disabled: isSubmitDisabled,
				kind: 'primary' as const,
				loading: isSubmitting
			});
			setCreateComponentActions(buttons);
		}
	}, [
		backButtonText,
		continueToNextStep,
		currentStep,
		firstIncludedStep,
		isSubmitDisabled,
		isSubmitting,
		lastIncludedStep,
		nextButtonText,
		onNext,
		onRequestSubmit,
		onUnmount,
		setState,
		stepData?.length,
		submitButtonText
	]);

	return { tearsheetActions, currentStep, stepData, onUnmount };
};

export default useStepCreateActions;
