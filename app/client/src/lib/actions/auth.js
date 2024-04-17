'use server';

import cookie from 'cookie';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAPIUrl } from '../utils';

export async function login(_, formData) {
	const submitData = {
		email: formData.get('email'),
		password: formData.get('password')
	};

	const response = await fetch(`${getAPIUrl()}/auth/login/password`, {
		method: 'POST',
		body: JSON.stringify(submitData),
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { error, data, message } = await response.json();

	if (error) {
		return { message };
	}

	const cConfig = {
		httpOnly: true
	};

	response.headers
		.getSetCookie()
		.map(c => cookie.parse(c))
		.forEach(c => {
			Object.entries(c).forEach(([key, value]) => {
				if (key === 'connect.sid') {
					cConfig.name = key;
					cConfig.value = value;
				} else if (key === 'Expires') {
					cConfig.expires = new Date(value);
				} else {
					cConfig[key] = value;
				}
			});
		});

	cookies().set(cConfig);

	const { profileId } = data;

	return redirect(`/profile/${profileId}`);
}

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
