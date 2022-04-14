import { FC } from 'react';
import useAuthStore from '@hooks/useAuthStore';
import { Navigate } from 'react-router-dom';

const Authenticated: FC = ({ children }) => {
	const { auth, logout } = useAuthStore();

	if (auth.authenticated) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}

	logout(true);
	return <Navigate replace to='/' />;
};

export default Authenticated;
