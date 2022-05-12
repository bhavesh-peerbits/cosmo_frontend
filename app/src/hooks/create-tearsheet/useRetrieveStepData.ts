import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import stepDataStore from '@store/create-tearsheet/stepDataStore';

interface IUseRetrieveStepData {
	stepNumber: number;
	introStep: boolean | undefined;
	includeStep: boolean;
	secondaryLabel: string | undefined;
	title: ReactNode;
	key: string;
}

const useRetrieveStepData = ({
	key,
	stepNumber,
	introStep,
	includeStep,
	secondaryLabel,
	title
}: IUseRetrieveStepData) => {
	const [{ currentStep }, setState] = useRecoilState(stepDataStore); // atom

	useEffect(() => {
		setState(({ stepData: prev, ...rest }) => {
			const stepItem = {
				key,
				title,
				secondaryLabel,
				introStep,
				shouldIncludeStep: includeStep
			};
			const previousItem = prev[stepNumber - 1];
			if (
				previousItem?.key !== stepItem?.key ||
				previousItem?.title !== stepItem.title ||
				previousItem?.secondaryLabel !== stepItem.secondaryLabel ||
				previousItem?.introStep !== stepItem.introStep ||
				previousItem?.shouldIncludeStep !== stepItem.shouldIncludeStep
			) {
				const clone = [...prev];
				clone[stepNumber - 1] = stepItem;
				return {
					...rest,
					stepData: clone
				};
			}
			return {
				...rest,
				stepData: prev
			};
		});
	}, [includeStep, introStep, key, secondaryLabel, setState, stepNumber, title]);

	return { currentStep, setState };
};

export default useRetrieveStepData;
