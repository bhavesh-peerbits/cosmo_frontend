import { useQuery } from 'react-query';
import axios from 'axios';
import ApiError from '@api/ApiError';

async function getExample(): Promise<string[]> {
	try {
		const response = await axios.get('https://gorest.co.sin/public/v2/posts');
		return response.data;
	} catch (e) {
		throw new ApiError(400, 'Error');
	}
}

export default () => useQuery('example', getExample);
