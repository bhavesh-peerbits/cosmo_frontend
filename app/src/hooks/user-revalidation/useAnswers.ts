import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useMemo } from 'react';
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

	const data = useMemo(() => list, [list]);
	useEffect(() => {
		data ? setAnswer([...data.values()]) : null;
	}, [data, setAnswer]);

	useEffect(() => {
		setFilters({
			query: urlFilters.q
		});
	}, [urlFilters, setFilters]);

	return { answers, filters, setFilters: setUrlFilters };
};

export default useAnswers;
