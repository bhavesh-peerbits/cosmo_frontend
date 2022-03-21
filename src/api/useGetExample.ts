import { useQuery } from 'react-query';

async function getExample(): Promise<string[]> {
	const response = await fetch('https://gorest.co.in/public/v2/posts');
	return response.json();
}

export default () => useQuery('example', getExample);
