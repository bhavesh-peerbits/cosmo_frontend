import '@style/login.scss';
import { ReactComponent as CosmoLogo } from '@images/cosmo-logo.svg';
import {
	Button,
	PasswordInput,
	TextInput,
	Theme,
	Grid,
	Column,
	Select,
	SelectItem,
	Checkbox,
	Form,
	InlineLoading,
	InlineNotification
} from '@carbon/react';
import { useEffect, useRef, useState } from 'react';
import removeLoadingScreen from '@hooks/removeLoadingScreen';
import { ReactComponent as StellantisLogo } from '@images/stellantis-logo.svg';
import useLoginStore from '@hooks/auth/useLoginStore';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useCleanSession from '@api/user/useCleanSession';
import useLoginConfig from '@api/providers/useLoginConfig';
import { ExpressiveCard } from '@carbon/ibm-products';

interface LoginForm {
	username: string;
	password: string;
	tenant: string;
	rememberMe: boolean;
}

const errorCodes = ['error-login', 'authentication-needed'] as const;
type ErrorCode = typeof errorCodes[number];
const tenants = import.meta.env.COSMO_TENANTS.split(', ');

const Login = () => {
	const [cosmoForm, setCosmoForm] = useState(tenants.length > 1);
	const { removeLoading, showErrorDuringLoading } = removeLoadingScreen();
	const {
		data: providersData = [],
		isLoading,
		error: configError
	} = useLoginConfig(tenants[0]);
	const {
		mutate: performCleanup,
		isLoading: isCleanupLoading,
		error: cleanupError
	} = useCleanSession();

	const loginRef = useRef<HTMLDivElement>(null);

	const { t } = useTranslation('login');
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors }
	} = useForm<LoginForm>({
		mode: 'onBlur',
		defaultValues: {
			tenant: tenants[0]
		}
	});
	const { auth, login } = useLoginStore();
	const [params] = useSearchParams();
	const error = params.get('error') as ErrorCode | undefined;
	const isAuthenticated = auth.authenticated;

	useEffect(() => {
		if (!(isLoading || isCleanupLoading) && !(configError || cleanupError)) {
			removeLoading();
		} else if (configError || cleanupError) {
			loginRef.current?.remove();
			showErrorDuringLoading();
		}
	}, [
		cleanupError,
		configError,
		isCleanupLoading,
		isLoading,
		removeLoading,
		showErrorDuringLoading
	]);

	useEffect(() => {
		removeLoading();
	}, [removeLoading]);

	useEffect(() => {
		if (!isAuthenticated) {
			performCleanup({ tenant: tenants[0] });
		}
	}, [isAuthenticated, performCleanup]);

	if (isAuthenticated) {
		return <Navigate replace to='/home' />;
	}
	const rememberMe = localStorage.getItem('rememberMe') === 'true';
	const saveRememberMe = (checked: boolean) => {
		localStorage.setItem('rememberMe', `${checked}`);
	};

	const formLogin = async (data: LoginForm) => {
		try {
			return await login({
				user: data.username,
				password: data.password,
				rememberMe: data.rememberMe,
				tenant: data.tenant
			});
		} catch (e) {
			return navigate(
				{
					pathname: '/',
					search: '?error=error-login'
				},
				{ replace: true }
			);
		}
	};
	return (
		<Theme theme='white' className='custom-login-theme h-full'>
			<Grid fullWidth condensed className=' h-full bg-[#033C53] p-0' ref={loginRef}>
				<Column sm={4} md={4} lg={6} className='flex h-full flex-col bg-background'>
					{/* TODO REMOVE */}
					<ExpressiveCard
						label='Label'
						mediaRatio={null}
						primaryButtonText='Primary'
						title='Title'
					>
						<p>
							expressive card body content block. description inviting the user to take
							action on the card.
						</p>
					</ExpressiveCard>
					<div className='flex h-[calc(100%-50px-32px)]   items-center justify-center'>
						{!cosmoForm ? (
							<div className='w-7/10 mt-[82px] '>
								<div className='mb-3  text-productive-heading-5'>Log in</div>
								<div className='mb-6 text-text-secondary text-caption-1'>
									Click the button below to log in with Tenant single sign on
								</div>
								{error && errorCodes.includes(error) && (
									<InlineNotification className='my-3 w-full px-2 py-1'>
										{t(error)}
									</InlineNotification>
								)}
								{providersData.length > 0 &&
									providersData.map(p => (
										<>
											<Button
												kind='secondary'
												className='mt-5 w-full max-w-full justify-center p-0 shadow-md shadow-shadow'
												key={p.id}
												href={p.url}
											>
												Login with {p.name} SSO Service
											</Button>
											<div className='mt-7 text-text-secondary text-body-short-1'>
												You have no {p.name} credentials?
											</div>
										</>
									))}
								<div
									className='mt-3 cursor-pointer text-link-primary text-body-1 hover:text-link-primary-hover'
									onClick={() => setCosmoForm(true)}
									onKeyDown={() => setCosmoForm(true)}
									role='menuitem'
									tabIndex={-1}
								>
									Login with COSMO credentials
								</div>
							</div>
						) : (
							<Form onSubmit={handleSubmit(formLogin)}>
								<div className='w-7/10 mt-[82px]'>
									<div className='mb-3  text-productive-heading-5'>Log in</div>
									<div className='mb-6 text-text-secondary text-caption-1'>
										Click the button below to log in with Cosmo credentials
									</div>
									{error && errorCodes.includes(error) && (
										<InlineNotification className='my-3 w-full px-2 py-1'>
											{t(error)}
										</InlineNotification>
									)}
									<TextInput
										id='username'
										invalidText={errors.username?.message}
										labelText='Username'
										className='mb-3'
										invalid={Boolean(errors.username)}
										placeholder='name.surname'
										{...register('username', {
											minLength: {
												value: 3,
												message: t('usernameAtLeast', { chars: 3 })
											},
											required: {
												value: true,
												message: t('usernameRequired')
											}
										})}
									/>
									<PasswordInput
										id='password'
										invalidText={errors.password?.message}
										labelText='Password'
										invalid={Boolean(errors.password)}
										placeholder='**********'
										{...register('password', {
											required: {
												value: true,
												message: t('passwordRequired')
											}
										})}
									/>
									{tenants.length > 1 && (
										<Select
											className='mt-4'
											id='tenant'
											defaultValue='cosmo'
											labelText='Tenant'
											{...register('tenant', { required: true })}
										>
											{tenants.map(tenant => (
												<SelectItem
													key={tenant}
													value={tenant}
													text={tenant.replace(
														/^(\w)(.+)/,
														(match, p1, p2) => p1.toUpperCase() + p2
													)}
												/>
											))}
										</Select>
									)}
									<Button
										disabled={isSubmitting}
										type='submit'
										className='mt-5 w-full max-w-none'
									>
										{isSubmitting ? (
											<InlineLoading description={`${t('logging-in')}...`} />
										) : (
											'Login'
										)}
									</Button>
									<Checkbox
										id='rememberMe'
										className='mt-3'
										labelText={t('rememberMe')}
										{...register('rememberMe', { value: rememberMe })}
										onChange={(_, { checked }) => saveRememberMe(checked)}
									/>
									<div className='mt-7 text-text-secondary text-body-short-1'>
										You have no COSMO credentials?
									</div>
									<div
										className='mt-3 cursor-pointer text-link-primary text-body-1 hover:text-link-primary-hover'
										onClick={() => setCosmoForm(false)}
										onKeyDown={() => setCosmoForm(false)}
										role='menuitem'
										tabIndex={-1}
									>
										Login with SSO service
									</div>
								</div>
							</Form>
						)}
					</div>
					<StellantisLogo className='flex h-[50px] w-[236.11px]  items-end self-center ' />
				</Column>
				<Column
					sm={4}
					md={4}
					lg={10}
					className='  flex h-full  items-center bg-[#033C53]'
				>
					<CosmoLogo className='h-[310px] w-full ' />
				</Column>
			</Grid>
		</Theme>
	);
};

export default Login;
