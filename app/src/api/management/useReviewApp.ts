import { useMutation } from 'react-query';
import User from '@model/User';

interface ReviewAppParams {
	reviewer: User;
	expireDate: Date;
	description: string;
}

const reviewApp = ({ reviewer, expireDate, description }: ReviewAppParams) => {
	return new Promise(resolve => {
		setTimeout(() => resolve({ reviewer, expireDate, description }), 1000);
	});
};

const useReviewApp = (appId: string) => {
	return useMutation(['reviewApp', appId], reviewApp);
};

export default useReviewApp;
