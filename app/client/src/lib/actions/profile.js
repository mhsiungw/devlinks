'use server';

import { cookies } from 'next/headers';
import { set } from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export async function updateProfile(profileId, formData) {
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

	const res = await fetch(
		`${process.env.APP_API_URL}/profile/${[profileId]}`,
		{
			method: 'PUT',
			body: newFormData,
			headers: {
				Cookie: cookies().toString()
			}
		}
	);

	const result = await res.json();

	return result;
}
