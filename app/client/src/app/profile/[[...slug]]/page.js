import 'server-only';
import { cookies } from 'next/headers';
import { getAPIUrl } from '@/lib/utils';
import update from 'immutability-helper';
import { set, uniqueId } from 'lodash';
import { redirect } from 'next/navigation';
import ProfileEditBlock from './_block';

export default async function Profile(props) {
	const { slug: [profileId] = [null] } = props.params;

	if (!profileId) {
		return <ProfileEditBlock />;
	}

	const res = await fetch(`${getAPIUrl()}/profile/${profileId}`, {
		method: 'GET',
		headers: {
			Cookie: cookies().toString()
		}
	});

	if (res.status === 401) {
		redirect('/login');
	}

	const { data } = await res.json();

	if (!data) {
		throw new Error(`Profile ID-${profileId} doesn't exist`);
	}
	const { links: _links } = data;

	const links = _links
		? _links.map(l => {
				const id = uniqueId('server');
				set(l, 'id', id);
				return l;
		  })
		: [];

	const dataWithId = update(data, {
		links: {
			$set: links
		}
	});

	return <ProfileEditBlock profile={dataWithId} />;
}
