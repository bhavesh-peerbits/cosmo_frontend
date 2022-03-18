import { useQuery } from 'react-query';

async function getExample(): Promise<string[]> {
	const response = await fetch('https://test-api.com/2');
	return response.json();
}

export default () => useQuery('example', getExample);
