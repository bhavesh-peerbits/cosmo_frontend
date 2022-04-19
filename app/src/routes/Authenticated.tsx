import useAuthStore from '@hooks/useAuthStore';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

type AuthenticatedProps = {
	children: ReactNode;
};

const Authenticated = ({ children }: AuthenticatedProps) => {
	const { auth, logout } = useAuthStore();

	if (auth.authenticated) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}

	logout(true);
	return <Navigate replace to='/?error=authentication-needed' />;
};

export default Authenticated;
