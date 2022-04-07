import loginUrl from '@images/login.svg';
import '@style/login.scss';
import { ReactComponent as StellantisLogo } from '@images/stellantis-logo.svg';
import { Navigate } from 'react-router-dom';

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

interface LoginForm {
	username: string;
	password: string;
	rememberMe: boolean;
}

const Login = () => {
	// const { t } = useTranslation('login');
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors }
	} = useForm<LoginForm>({ mode: 'onBlur' });
	const { auth, login } = useAuthStore();

	if (auth.authenticated) {
		return <Navigate replace to='/home' />;
	}

	const formLogin = async (data: LoginForm) => {
		login({
			username: data.username,
			password: data.password,
			rememberMe: data.rememberMe
		});
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
											message: 'Username must be at least 3 characters'
										},
										required: {
											value: true,
											message: 'Username is required'
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
											message: 'Password is required'
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
									labelText='Remember me'
									{...register('rememberMe')}
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
