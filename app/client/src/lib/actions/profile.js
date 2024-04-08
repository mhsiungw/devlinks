'use server';

import { cookies } from 'next/headers';

// eslint-disable-next-line import/prefer-default-export
export async function updateProfile(profileId, data) {
	const res = await fetch(
		`${process.env.APP_API_URL}/profile/${[profileId]}`,
		{
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookies().toString()
			}
		}
	);

	const result = await res.json();

	return result;
}
