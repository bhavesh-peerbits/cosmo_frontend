import {
	Header as CarbonHeader,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderName
} from '@carbon/react';
import { Moon } from '@carbon/react/icons';
import { useNavigate } from 'react-router-dom';
import { useBoolean, useMount, useUnmount } from 'ahooks';
import useUiStore from '@hooks/useUiStore';
import routes from '@routes/routes-const';
import UserProfileImage from '@components/UserProfileImage';
import useLoginStore from '@hooks/auth/useLoginStore';
import UserPanel from '@components/UserPanel';
import { useRef } from 'react';
import CosmoSideNav from '@components/CosmoSideNav';
import { ReactComponent as CosmoLogo } from '@images/cosmo-logo-horizontal.svg';

type HeaderProps = {
	isSideNavExpanded: boolean;
	onClickSideNavExpand: () => void;
};
const Header = ({ isSideNavExpanded, onClickSideNavExpand }: HeaderProps) => {
	const { auth } = useLoginStore();
	const { setTheme } = useUiStore();
	const navigate = useNavigate();
	const userButtonRef = useRef<HTMLButtonElement>(null);
	const [userExpanded, { toggle: toggleUser, setFalse: setCloseUser }] =
		useBoolean(false);

	useMount(() => {
		document.body.classList.add('fix-height');
	});

	useUnmount(() => {
		document.body.classList.remove('fix-height');
	});

	return (
		<CarbonHeader aria-label='Cosmo' className='bg-background'>
			<HeaderMenuButton
				aria-label='Open menu'
				onClick={onClickSideNavExpand}
				isActive={isSideNavExpanded}
			/>
			<HeaderName
				as='div'
				className='cursor-pointer'
				onClick={() => navigate(routes.HOME)}
				prefix=''
			>
				<CosmoLogo width={50} className='h-[36px] w-full' />
			</HeaderName>

			<HeaderGlobalBar>
				<HeaderGlobalAction
					aria-label='Theme'
					onClick={() => {
						setTheme(old => (old === 'white' ? 'g100' : 'white'));
					}}
				>
					<Moon />
				</HeaderGlobalAction>

				<HeaderGlobalAction
					ref={userButtonRef}
					aria-label={auth?.user?.displayName}
					isActive={userExpanded}
					onClick={() => toggleUser()}
					tooltipAlignment='end'
				>
					<UserProfileImage
						backgroundColor='light-gray'
						initials={auth?.user?.displayName}
						imageDescription={auth?.user?.username}
						size='md'
					/>
				</HeaderGlobalAction>
			</HeaderGlobalBar>
			<CosmoSideNav {...{ onClickSideNavExpand, isSideNavExpanded }} />
			<UserPanel
				expanded={userExpanded}
				user={auth?.user}
				onClickOutside={e =>
					e.target !== userButtonRef.current &&
					!userButtonRef.current?.contains(e.target as Node) &&
					setCloseUser()
				}
			/>
		</CarbonHeader>
	);
};

export default Header;
