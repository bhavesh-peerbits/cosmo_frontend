import { atom, selector } from 'recoil';
import { GetRecoilType } from '@store/util';
import Answer from '@model/Answer';

type Filters = {
	query: string | undefined;
};

const answerUserNameFilters = atom<Filters>({
	key: 'answerUserNameFilters',
	default: {
		query: ''
	}
});

const answerList = atom<Answer[]>({
	key: 'answers',
	default: []
});

const applyFilters = (
	answers: GetRecoilType<typeof answerList>,
	filters: GetRecoilType<typeof answerUserNameFilters>
) => {
	const filteredAnswers = answers
		// filter by query term string
		.filter(answer =>
			filters.query
				? answer.revalidationUser?.displayName
						?.toLowerCase()
						?.trim()
						?.includes(filters.query.toLowerCase().trim())
				: true
		);

	return filteredAnswers;
};

const filteredAnswers = selector({
	key: 'filteredAnswers',
	get: ({ get }) => {
		const filters = get(answerUserNameFilters);
		const answers = get(answerList);
		return {
			answers: applyFilters(answers, filters)
		};
	}
});

export { answerUserNameFilters, answerList, filteredAnswers };
