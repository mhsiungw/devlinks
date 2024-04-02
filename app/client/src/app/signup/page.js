'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useZorm } from 'react-zorm';
import LogoDevlinksLarge from '@/images/logo-devlinks-large.svg';
import IconEmail from '@/images/icon-email.svg';
import IconPassword from '@/images/icon-password.svg';
import Form from '@/components/form';
import Input from '@/components/input';
import Button from '@/components/button';
import { showToast } from '@/components/toast/utils';
import ErrorMessage from '@/components/error-message';

const Schema = (
	z
		.object({
			email: z.string().email(),
			password: z.string().min(6),
			confirmPassword: z.string().min(6)
		})
		.refine(({ password, confirmPassword }) => password === confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword']
		})
);

function signup(data) {
	return fetch('http://localhost:3000/api/v1/auth/signup', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

export default function Register() {
	const zo = useZorm('register', Schema, {
		onValidSubmit: async e => {
			e.preventDefault();
			const response = await signup(e.data);
			const result = await response.json();

			showToast(null, result.message);
		}
	});

	return (
		<div className='flex justify-center items-center h-full'>
			<div className='w-1/3 min-w-[425px]'>
				<div className='flex justify-center mb-14'>
					<LogoDevlinksLarge />
				</div>
				<div className='bg-white p-10 rounded-xl'>
					<div className='mb-10'>
						<h2 className='text-dark-gray text-3xl font-bold mb-2'>
							Create account
						</h2>
						<div className='text-gray text-base'>
							{"Let's"} get you started sharing your links!
						</div>
					</div>
					<Form ref={zo.ref}>
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
						<ErrorMessage>{zo.errors.password(e => e.message)}</ErrorMessage>
						<Input
							label="Confirm Password"
							name={zo.fields.confirmPassword()}
							Icon={IconPassword}
							placeholder='At least 6 characters'
							type='password'
						/>
						<ErrorMessage>{zo.errors.confirmPassword(e => e.message)}</ErrorMessage>
						<div className='text-gray text-xs'>Password must contain at least 8 characters</div>
						<Button>Create new account</Button>
					</Form>
					<div className='text-base mt-6 flex justify-center'>
						<span className='text-gray mr-1'>
							Already have an account?
						</span>
						<Link className='text-purple' href='/login'>
							Login
						</Link>
						<Link className='text-purple' href='/'>
							Root
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
