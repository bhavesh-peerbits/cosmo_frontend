import { ReactComponent as UnauthorizedImg } from '@images/unauthorized.svg';
import { NavLink } from 'react-router-dom';
import HTTPError from '@components/HTTPError';
import { useTranslation } from 'react-i18next';

const Forbidden = () => {
	const { t } = useTranslation('httpError');

	return (
		<HTTPError
			errorCode={t('errorCode403')}
			errorTitle={t('errorTitle403')}
			errorDescription={t('errorMessage403')}
			errorImage={<UnauthorizedImg className='bottom-0 h-full w-full' />}
			link={
				<NavLink to='/home' replace>
					{t('goToHomePage')}
				</NavLink>
			}
		/>
	);
};

export default Forbidden;
