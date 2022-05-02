import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import useLoginStore from '@hooks/auth/useLoginStore';
import useLogout from '@hooks/auth/useLogout';

type AuthenticatedProps = {
	children: ReactNode;
};

const Authenticated = ({ children }: AuthenticatedProps) => {
	const { auth } = useLoginStore();
	const { logout } = useLogout();

	if (auth.authenticated) {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}

	logout(true);
	return <Navigate replace to='/?error=authentication-needed' />;
};

export default Authenticated;
