import { useEffect } from 'react';
import usePreviousValue from '@hooks/usePreviousValue';
import { useRecoilState, useRecoilValue } from 'recoil';
import firstLastIncludedStepStore from '@store/create-tearsheet/firstLastIncludedStepStore';
import stepDataStore from '@store/create-tearsheet/stepDataStore';

interface IUseResetCreateComponent {
	open: boolean | undefined;
	initialStep: number | undefined;
}

const useResetCreateComponent = ({ open, initialStep }: IUseResetCreateComponent) => {
	const { firstIncludedStep } = useRecoilValue(firstLastIncludedStepStore); // selector
	const [{ currentStep, stepData }, setState] = useRecoilState(stepDataStore); // atom

	const previousState = usePreviousValue({ currentStep, open });
	const totalSteps = stepData.length;

	useEffect(() => {
		if (!previousState?.open && open) {
			if (
				initialStep &&
				totalSteps &&
				Number(initialStep) <= Number(totalSteps) &&
				Number(initialStep) > 0
			) {
				setState(old => ({ ...old, currentStep: Number(initialStep) }));
			} else {
				// default should be fist includedStep instead of just 1
				setState(old => ({ ...old, currentStep: firstIncludedStep }));
			}

			// An invalid initialStep value was provided, we'll default to rendering the first step in this scenario
			if (
				(initialStep && totalSteps && Number(initialStep) > Number(totalSteps)) ||
				Number(initialStep) <= 0
			) {
				setState(old => ({ ...old, currentStep: Number(initialStep) }));
				// invalid initialStep  prop should be a number that is greater than 0 or less than or equal to the number of steps
			}
		}
	}, [firstIncludedStep, initialStep, open, previousState?.open, setState, totalSteps]);
};

export default useResetCreateComponent;
