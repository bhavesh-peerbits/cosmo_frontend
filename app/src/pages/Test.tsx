import useGetExample from '@api/useGetExample';
import { useEffect, useState } from 'react';

const Test = () => {
	const { data } = useGetExample();
	const [error, setError] = useState(false);
	setTimeout(() => {
		setError(true);
	}, 2000);
	useEffect(() => {
		if (error) {
			throw new Error('Test Error');
		}
	}, [error]);
	return <div>{JSON.stringify(data)}</div>;
};
export default Test;
