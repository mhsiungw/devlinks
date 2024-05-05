'use server';

import { getAPIUrl } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export async function signup(_, formData) {
	const submitData = {
		email: formData.get('email'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword')
	};

	const { error, message } = await fetch(`${getAPIUrl()}/auth/signup`, {
		method: 'POST',
		body: JSON.stringify(submitData),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json());

	return { error, message };
}
