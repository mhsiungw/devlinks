'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import { useZorm } from 'react-zorm';
import { login } from '@/lib/actions/auth';
import { showToast } from '@/components/toast/utils';
import IconEmail from '@/images/icon-email.svg';
import IconPassword from '@/images/icon-password.svg';
import Form from '@/components/form';
import Input from '@/components/input';
import SubmitButton from '@/components/submit-button';
import ErrorMessage from '@/components/error-message';

const Schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export default function LoginForm() {
	const zo = useZorm('login', Schema);
	const [state, formAction] = useFormState(login, null);

	useEffect(() => {
		if (state) {
			showToast(null, state.message);
		}
	}, [state]);

	return (
		<Form action={formAction} ref={zo.ref}>
			<div className='space-y-6'>
				<Input
					label='Email address'
					name={zo.fields.email()}
					type='email'
					Icon={IconEmail}
					placeholder='e.g. alex@email.com'
				/>
				<ErrorMessage>{zo.errors.email(e => e.message)}</ErrorMessage>
				<Input
					label='Password'
					name={zo.fields.password()}
					Icon={IconPassword}
					placeholder='Enter your password'
					type='password'
				/>
				<ErrorMessage>
					{zo.errors.password(e => e.message)}
				</ErrorMessage>
				<SubmitButton>Login</SubmitButton>
			</div>
		</Form>
	);
}
