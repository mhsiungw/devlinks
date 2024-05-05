'use server';

import { cookies } from 'next/headers';
import { set } from 'lodash';
import { getAPIUrl } from '../utils';

export async function updateProfile(profileId, _, formData) {
	const sanitizedData = Array.from(formData)
		.filter(d => !d[0].includes('$ACTION_'))
		.reduce((acc, [key, value]) => {
			if (value instanceof File && value.size === 0) {
				return acc;
			}
			set(acc, key, value);
			return acc;
		}, {});

	const newFormData = new FormData();

	Object.entries(sanitizedData).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			newFormData.append(key, JSON.stringify(value));
		} else {
			newFormData.append(key, value);
		}
	});

	try {
		const res = await fetch(`${getAPIUrl()}/profile/${[profileId]}`, {
			method: 'PUT',
			body: newFormData,
			headers: {
				Cookie: cookies().toString()
			}
		});

		const { error, message, data } = await res.json();

		return { error, message, data };
	} catch (err) {
		return {
			error: true,
			message: 'Something went wrong',
			data: newFormData
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
