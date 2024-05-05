'use client';

import { z } from 'zod';
import { useZorm } from 'react-zorm';
import { getAPIUrl } from '@/lib/utils';
import { showToast } from '@/components/toast/utils';
import { useRouter } from 'next/navigation';
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
	const router = useRouter();
	const zo = useZorm('login', Schema, {
		onValidSubmit: async e => {
			e.preventDefault();

			try {
				const response = await fetch(
					`${getAPIUrl()}/auth/login/password`,
					{
						method: 'POST',
						body: JSON.stringify(e.data),
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json'
						}
					}
				);

				const { data, message } = await response.json();
				if (!response.ok) {
					throw Error({ message });
				}

				const { profileId } = data;

				router.push(`/profile/${profileId}`);
			} catch (err) {
				showToast(null, err.message);
			}
		}
	});

	return (
		<Form ref={zo.ref}>
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
