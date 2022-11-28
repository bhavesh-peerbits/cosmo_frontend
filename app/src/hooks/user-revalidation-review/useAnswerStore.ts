import {
	useRecoilState,
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState
} from 'recoil';
import answersStore, {
	answersDefault,
	modifyAnswers
} from '@store/user-revalidation-review/answersStore';
import Answer from '@model/Answer';
import { AnswerApiTypeEnum } from 'cosmo-api/src';
import { useCallback } from 'react';

const useAnswerStore = (reviewId: string) => {
	const setDefaultAnswers = useSetRecoilState(answersDefault(reviewId));
	const [answers, setAnswers] = useRecoilState(answersStore(reviewId));
	const modifiedAnswers = useRecoilValue(modifyAnswers(reviewId));
	const resetAnswers = useResetRecoilState(answersStore(reviewId));

	const modifyAnswer = useCallback(
		(selected: Answer[], answerType: AnswerApiTypeEnum, note?: string) => {
			setAnswers(old => {
				const newAnswers = new Map(old);
				selected.forEach(s => newAnswers.set(s.id, { ...s, answerType, note }));
				return newAnswers;
			});
		},
		[setAnswers]
	);

	return {
		answers,
		modifiedAnswers,
		resetAnswers,
		setDefaultAnswers,
		modifyAnswer
	};
};

export default useAnswerStore;
