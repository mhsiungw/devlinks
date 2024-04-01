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

const Schema = z.object({
	email: z.string().email(),
	password: z.string(),
});

function signin(data) {
	return fetch('http://localhost:3000/api/v1/auth/login/password', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function Login() {
	const zo = useZorm('register', Schema, {
		onValidSubmit: async e => {
			e.preventDefault();
			const response = await signin(e.data);
			const result = await response.json();

			showToast(null, result.message);
		},
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
							Login
						</h2>
						<div className='text-gray text-base'>
							Add your details below to get back into the app
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
						<Input
							label='Password'
							name={zo.fields.password()}
							Icon={IconPassword}
							placeholder='Enter your password'
							type='password'
						/>
						<Button type='submit'>Login</Button>
					</Form>
					<div className='text-base mt-6 flex justify-center'>
						<span className='text-gray mr-1'>
							{"Don't"} have an account?
						</span>
						<Link className='text-purple' href='/signup'>
							Create account
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
