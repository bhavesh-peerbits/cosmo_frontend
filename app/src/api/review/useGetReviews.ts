import { useQuery } from 'react-query';

const useGetReviews = () => {
	return [
		{
			id: 'Review1',
			narrativeName: 'Narrative 1',
			applicationName: 'Application1',
			analyst: 'Name Surname1',
			startDate: undefined,
			dueDate: new Date(2023, 7, 7)
		},
		{
			id: 'Review2',
			narrativeName: 'Narrative 2',
			applicationName: 'Application2',
			analyst: 'Name Surname1',
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2024, 6, 7)
		},
		{
			id: 'Review3',
			narrativeName: 'Narrative 3',
			applicationName: 'Application3',
			analyst: 'Name Surname1',
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2025, 1, 7)
		},
		{
			id: 'Review4',
			narrativeName: 'Narrative 4',
			applicationName: 'Application4',
			analyst: 'Name Surname2',
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2022, 6, 7)
		},
		{
			id: 'Review5',
			narrativeName: 'Narrative 5',
			applicationName: 'Application5',
			analyst: 'Name Surname2',
			startDate: new Date(2022, 5, 7),
			dueDate: new Date(2022, 6, 8)
		}
	];
};

export default () => useQuery(['reviewApps'], useGetReviews);
