'use server';

import { cookies } from 'next/headers';
import { getAPIUrl } from '../utils';

export async function updateProfile(profileId, formData) {
	if (!profileId) {
		return null;
	}

	try {
		const res = await fetch(`${getAPIUrl()}/profile/${[profileId]}`, {
			method: 'PUT',
			body: formData,
			headers: {
				Cookie: cookies().toString()
			}
		});

		const { error, message, data } = await res.json();

		return { error, message, data };
	} catch (err) {
		return {
			error: true,
			message: 'Something went wrong'
		};
	}
}

export async function openProfile(profileId) {
	const {
		data: { openProfileId }
	} = await fetch(`${getAPIUrl()}/profile/share/${profileId}`, {
		headers: {
			Cookie: cookies().toString()
		}
	}).then(res => res.json());

	return openProfileId;
}
