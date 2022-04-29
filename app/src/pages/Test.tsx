import useGetExample from '@api/useGetExample';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Test = () => {
	const { t } = useTranslation('test');
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
	return (
		<div>
			<div>{t('date', { date: new Date() })}</div>
			<div>{JSON.stringify(data)}</div>
		</div>
	);
};
export default Test;
