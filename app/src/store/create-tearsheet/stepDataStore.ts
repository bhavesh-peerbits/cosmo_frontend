import { atom } from 'recoil';
import { ReactNode } from 'react';

interface StepItem {
	key: string;
	introStep?: boolean;
	secondaryLabel?: string;
	shouldIncludeStep?: boolean;
	title?: ReactNode;
}

interface StepData {
	currentStep: number;
	stepData: StepItem[];
	onNext: (() => void) | undefined;
	isSubmitDisabled: boolean | undefined;
}

const stepDataStore = atom<StepData>({
	key: 'stepData',
	default: {
		currentStep: 0,
		stepData: [],
		onNext: () => {},
		isSubmitDisabled: false
	}
});

export default stepDataStore;
