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
	Stack,
	TextInput,
	Theme
} from '@carbon/react';
import useAuthStore from '@hooks/useAuthStore';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useNoHeader from '@hooks/useNoHeader';

interface LoginForm {
	username: string;
	password: string;
	rememberMe: boolean;
}

const errorCodes = ['error-login', 'authentication-needed'] as const;
type ErrorCode = typeof errorCodes[number];

const Login = () => {
	useNoHeader();
	const { t } = useTranslation('login');
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors }
	} = useForm<LoginForm>({ mode: 'onBlur' });
	const { auth, login } = useAuthStore();
	const [params] = useSearchParams();
	const error = params.get('error') as ErrorCode | undefined;

	if (auth.authenticated) {
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
				rememberMe: data.rememberMe
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
				id='login'
				style={{ backgroundImage: `url('${loginUrl}')` }}
				className='h-full w-full bg-cover bg-center bg-no-repeat'
			>
				<Grid className='ml-1 h-1/2 items-end'>
					<Column lg={6} sm={4} md={4}>
						<Form onSubmit={handleSubmit(formLogin)}>
							{error && errorCodes.includes(error) && (
								<div className='my-3 w-full bg-text-error px-2 py-1 text-heading-2'>
									{t(error)}
								</div>
							)}
							<Stack gap={6}>
								<div className='flex items-end space-x-5'>
									<span className='text-heading-7'>CoSMo</span>
									<span className='text-body-2'>by aizoOn</span>
								</div>
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
								<Button
									disabled={isSubmitting}
									type='submit'
									kind='secondary'
									className='w-full max-w-full'
								>
									{isSubmitting ? <InlineLoading description='Logging in...' /> : 'Login'}
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
				<Grid fullWidth className='h-1/2 items-end p-6'>
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
