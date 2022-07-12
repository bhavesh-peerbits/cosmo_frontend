import loginUrl from '@images/login.svg';
import '@style/login.scss';
import { ReactComponent as StellantisLogo } from '@images/stellantis-logo.svg';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import {
	Button,
	Checkbox,
	Column,
	Form,
	Grid,
	InlineLoading,
	PasswordInput,
	Select,
	SelectItem,
	Stack,
	TextInput,
	Theme
} from '@carbon/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useLoginStore from '@hooks/auth/useLoginStore';
import removeLoadingScreen from '@hooks/removeLoadingScreen';
import useLoginConfig from '@api/providers/useLoginConfig';
import { useEffect, useRef } from 'react';
import useCleanSession from '@api/user/useCleanSession';
import { ReactComponent as CosmoLogo } from '@images/cosmo-logo.svg';

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
	} = useForm<LoginForm>({ mode: 'onBlur' });
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
		<Theme
			theme='white'
			className='
		custom-login-theme h-full'
		>
			<div
				ref={loginRef}
				id='login'
				style={{ backgroundImage: `url('${loginUrl}')` }}
				className='h-full w-full bg-cover bg-center bg-no-repeat'
			>
				<Grid className='ml-1 h-2/3 items-end'>
					<Column lg={6} sm={4} md={4}>
						<Form onSubmit={handleSubmit(formLogin)}>
							{error && errorCodes.includes(error) && (
								<div className='my-3 w-full bg-text-error px-2 py-1 text-heading-2'>
									{t(error)}
								</div>
							)}
							<Stack gap={5}>
								<div className='mt-5 flex items-start'>
									<CosmoLogo
										width={96}
										className='flex h-[156px] w-full items-start justify-start'
									/>
								</div>

								{providersData.length > 0 && (
									<>
										<div className='flex justify-center'>
											<p>{t('use-sso')}</p>
										</div>
										<div className='flex flex-col'>
											{providersData.map(p => (
												<Button
													kind='secondary'
													className='mt-5 w-full max-w-full justify-center p-0 shadow-md shadow-shadow'
													key={p.id}
													href={p.url}
												>
													{p.name}
												</Button>
											))}
										</div>
										<div className='flex items-center'>
											<hr className='w-full' />
											<p className='px-5'>{t('or')}</p>
											<hr className='w-full' />
										</div>
										<div className='flex justify-center'>
											<p>{t('login')}</p>
										</div>
									</>
								)}
								<TextInput
									id='username'
									invalidText={errors.username?.message}
									labelText='Username'
									invalid={Boolean(errors.username)}
									placeholder='mail@aizoongroup.com'
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
									kind='secondary'
									className='mt-8 w-full max-w-full'
								>
									{isSubmitting ? (
										<InlineLoading description={`${t('logging-in')}...`} />
									) : (
										'Login'
									)}
								</Button>
								<Checkbox
									id='rememberMe'
									labelText={t('rememberMe')}
									{...register('rememberMe', { value: rememberMe })}
									onChange={(_, { checked }) => saveRememberMe(checked)}
								/>
							</Stack>
						</Form>
					</Column>
				</Grid>
				<Grid fullWidth className='h-1/3 items-end p-6'>
					<Column sm={2} md={4} lg={8}>
						<span className='text-caption-1'>Copyright © aizoOn 2022.</span>
					</Column>
					<Column
						sm={{ span: 2, offset: 2 }}
						md={{ span: 2, offset: 6 }}
						lg={{ span: 3, offset: 13 }}
					>
						<StellantisLogo width={25} className='h-[30px] w-full' />
					</Column>
				</Grid>
			</div>
		</Theme>
	);
};
export default Login;
