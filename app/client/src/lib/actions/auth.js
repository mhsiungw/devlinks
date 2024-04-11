'use server';

import cookie from 'cookie';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAPIUrl } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export async function login(data) {
	const res = await fetch(`${getAPIUrl()}/auth/login/password`, {
		method: 'POST',
		body: JSON.stringify(data),
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const cConfig = {
		httpOnly: true
	};

	res.headers
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

	const {
		data: { profileId }
	} = await res.json();

	if (res.status >= 400) {
		const result = await res.json();

		return result.message;
	}

	return redirect(`/profile/${profileId}`);
}
