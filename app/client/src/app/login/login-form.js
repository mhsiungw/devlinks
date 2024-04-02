'use client';

import { z } from 'zod';
import { useZorm } from 'react-zorm';
import { login } from '@/lib/actions/auth';
import { showToast } from '@/components/toast/utils';
import IconEmail from '@/images/icon-email.svg';
import IconPassword from '@/images/icon-password.svg';
import Form from '@/components/form';
import Input from '@/components/input';
import Button from '@/components/button';

const Schema = z.object({
	email: z.string().email(),
	password: z.string().min(1)
});

export default function LoginForm() {
	const zo = useZorm('register', Schema, {
		onValidSubmit: async e => {
			e.preventDefault();
			const message = await login(e.data);
			showToast(null, message);
		}
	});

	return (
		<Form ref={zo.ref}>
			<Input
				label='Email address'
				name={zo.fields.email()}
				type='email'
				Icon={IconEmail}
				placeholder='e.g. alex@email.com'
			/>
			<Input
				label='Password'
				name={zo.fields.password()}
				Icon={IconPassword}
				placeholder='Enter your password'
				type='password'
			/>
			<Button type='submit'>Login</Button>
		</Form>
	);
}
