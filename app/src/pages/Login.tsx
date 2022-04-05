import loginUrl from '@images/login.svg';
import { Form, Stack, TextInput } from '@carbon/react';

const Login = () => (
	<div
		style={{ backgroundImage: `url('${loginUrl}')` }}
		className='h-full w-full bg-cover bg-center bg-no-repeat'
	>
		<Form>
			<Stack gap={6}>
				<TextInput
					helperText='Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)'
					id='test2'
					invalidText='Invalid error message.'
					labelText='Text input label'
					placeholder='Placeholder text'
				/>
				<TextInput
					helperText='Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)'
					id='test2'
					invalidText='Invalid error message.'
					labelText='Text input label'
					placeholder='Placeholder text'
				/>
			</Stack>
		</Form>
	</div>
);
export default Login;
