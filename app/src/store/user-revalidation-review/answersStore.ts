import { atomFamily, selectorFamily } from 'recoil';
import Answer from '@model/Answer';

export const answersDefault = atomFamily<Map<string, Answer>, string>({
	key: 'answersDefault',
	default: new Map()
});

const answersStore = atomFamily<Map<string, Answer>, string>({
	key: 'review-answers',
	default: selectorFamily({
		key: 'review-answers/Default',
		get:
			param =>
			({ get }) =>
				get(answersDefault(param))
	})
});

export const modifyAnswers = selectorFamily<Map<string, Answer>, string>({
	key: 'review-answers/Modify',
	get:
		param =>
		({ get }) => {
			const answers = get(answersStore(param));
			const defaultAnswers = get(answersDefault(param));
			const newAnswers = new Map();
			defaultAnswers.forEach((value, key) => {
				const modifiedAnswer = answers.get(key);
				const answerType = modifiedAnswer?.answerType;
				if (answerType && answerType !== value.answerType) {
					newAnswers.set(key, modifiedAnswer);
				}
			});
			return newAnswers;
		}
});

export default answersStore;
