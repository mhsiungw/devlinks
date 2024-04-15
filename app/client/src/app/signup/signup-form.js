'use client';

import z from 'zod';
import { useZorm } from 'react-zorm';
import { useFormState } from 'react-dom';
import IconEmail from '@/images/icon-email.svg';
import IconPassword from '@/images/icon-password.svg';
import { signup } from '@/lib/actions/auth';
import Form from '@/components/form';
import Input from '@/components/input';
import { showToast } from '@/components/toast/utils';
import SubmitButton from '@/components/submit-button';
import ErrorMessage from '@/components/error-message';
import { useEffect } from 'react';

const Schema = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6)
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export default function SignupForm() {
	const [state, formAction] = useFormState(signup, null);
	const zo = useZorm('register', Schema);

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
					label='Create Password'
					name={zo.fields.password()}
					Icon={IconPassword}
					placeholder='At least 6 characters'
					type='password'
				/>
				<ErrorMessage>
					{zo.errors.password(e => e.message)}
				</ErrorMessage>
				<Input
					label='Confirm Password'
					name={zo.fields.confirmPassword()}
					Icon={IconPassword}
					placeholder='At least 6 characters'
					type='password'
				/>
				<ErrorMessage>
					{zo.errors.confirmPassword(e => e.message)}
				</ErrorMessage>
				<div className='text-gray text-xs'>
					Password must contain at least 8 characters
				</div>
				<SubmitButton>Create new account</SubmitButton>
			</div>
		</Form>
	);
}
