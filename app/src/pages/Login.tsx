import loginUrl from '@images/login.svg';
import '@style/login.scss';
import { ReactComponent as StellantisLogo } from '@images/stellantis-logo.svg';

import {
	Button,
	Checkbox,
	Column,
	Form,
	Grid,
	PasswordInput,
	Stack,
	TextInput,
	Theme
} from '@carbon/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const { t } = useTranslation('login');

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
				<Grid className='h-1/2 items-end'>
					<Column lg={6} sm={4} md={4}>
						<Form>
							<Stack gap={6}>
								<div className='flex items-end space-x-5'>
									<span className='text-heading-7'>CoSMo</span>
									<span className='text-body-2'>by aizoOn</span>
								</div>
								<TextInput
									id='username'
									invalidText={t('invalidUsername')}
									labelText='Username'
									invalid
									placeholder='mail@aizoongroup.com'
								/>
								<PasswordInput
									id='password'
									invalidText='Invalid error message.'
									labelText='Password'
									invalid
									placeholder='**********'
								/>
								<Button kind='secondary' className='w-full max-w-full'>
									Login
								</Button>
								<Checkbox
									id='remember'
									checked={rememberMe}
									onChange={(e, { checked }) => setRememberMe(checked)}
									labelText='Remember me'
								/>
							</Stack>
						</Form>
					</Column>
				</Grid>
				<Grid className='h-1/2 items-end p-6'>
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
