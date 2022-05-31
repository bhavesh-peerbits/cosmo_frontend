import routes from '@routes/routes-const';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectRouteProps {
	children: ReactNode;
	canNavigate: boolean;
}

const ProtectRoute = ({ children, canNavigate }: ProtectRouteProps) => {
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{canNavigate ? children : <Navigate replace to={routes.FORBIDDEN} />}</>;
};

export default ProtectRoute;
