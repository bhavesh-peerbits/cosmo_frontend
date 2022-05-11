import { selector } from 'recoil';
import stepDataStore from '@store/create-tearsheet/stepDataStore';

const firstLastIncludedStepStore = selector({
	key: 'firstLastIncludedStep',
	get: ({ get }) => {
		const { stepData } = get(stepDataStore);
		const firstItem = stepData.findIndex(item => item?.shouldIncludeStep) + 1;
		const lastItem = stepData.map(s => s?.shouldIncludeStep).lastIndexOf(true);
		return { firstIncludedStep: firstItem, lastIncludedStep: lastItem + 1 };
	}
});

export default firstLastIncludedStepStore;
