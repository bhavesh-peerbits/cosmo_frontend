import loginUrl from '@images/login.svg';
import { ReactComponent as StellantisLogo } from '@images/stellantis-logo.svg';

import { Button, Checkbox, Column, Form, Grid, Stack, TextInput } from '@carbon/react';
import { useState } from 'react';

const Login = () => {
	const [rememberMe, setRememberMe] = useState(false);
	return (
		<div
			style={{ backgroundImage: `url('${loginUrl}')` }}
			className='h-full w-full bg-cover bg-center bg-no-repeat text-[white]'
		>
			<Grid className='h-1/2 items-end'>
				<Column lg={{ span: 6 }} sm={{ span: 4 }} md={4}>
					<Form>
						<Stack gap={6}>
							<div className='flex items-end space-x-5'>
								<span className='text-heading-7'>CoSMo</span>
								<span className='text-body-2'>by aizoOn</span>
							</div>
							<TextInput
								className='text-[white]'
								id='username'
								invalidText='Invalid error message.'
								labelText='Username'
								placeholder='mail@aizoongroup.com'
							/>
							<TextInput
								id='password'
								type='password'
								invalidText='Invalid error message.'
								labelText='Password'
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
				<Column />
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
	);
};
export default Login;
