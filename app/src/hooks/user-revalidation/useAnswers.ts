import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useUrlState from '@hooks/useUrlState';
import {
	answerList,
	answerUserNameFilters,
	filteredAnswers
} from '@store/user-revalidation/answersFilters';
import useGetAnswersForReview from '@api/user-revalidation/useGetAnswersForReview';
import Answer from '@model/Answer';

type UseAnswersProps = {
	campaignId: string;
	reviewId: string;
};

const useAnswers = ({ campaignId, reviewId }: UseAnswersProps) => {
	const [urlFilters, setUrlFilters] = useUrlState<{
		q: string | undefined;
	}>({
		q: undefined
	});
	const [filters, setFilters] = useRecoilState(answerUserNameFilters);
	const setAnswer = useSetRecoilState(answerList);
	const { answers } = useRecoilValue(filteredAnswers);
	const { data: list = new Map<string, Answer>() } = useGetAnswersForReview(
		campaignId,
		reviewId
	);

	useEffect(() => {
		list ? setAnswer([...list.values()]) : null;
	}, [list, setAnswer]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	return { answers, filters, setFilters: setUrlFilters };
};

export default useAnswers;
