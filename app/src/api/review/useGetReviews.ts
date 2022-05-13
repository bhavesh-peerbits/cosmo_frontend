import { useQuery } from 'react-query';

const useGetReviews = () => {
	return [
		{
			id: 'Review1',
			narrativeName: 'aNarrative 1',
			applicationName: 'Application1',
			analyst: 'Name Surname',
			startDate: new Date(2022, 4, 7),
			dueDate: new Date(2022, 7, 7)
		},
		{
			id: 'Review2',
			narrativeName: 'Narrative 2',
			applicationName: 'bApplication2',
			analyst: 'Name Surname',
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2022, 6, 7)
		}
	];
};

export default () => useQuery(['reviewApps'], useGetReviews);
