import 'server-only';
import { cookies } from 'next/headers';
import ProfileEditBlock from '@/app/profile/[profileId]/_block';
import { getAPIUrl } from '@/lib/utils';
import update from 'immutability-helper';
import { set, uniqueId } from 'lodash';

export default async function ProfileEdit(props) {
	const { profileId } = props.params;

	const res = await fetch(`${getAPIUrl()}/profile/${profileId}`, {
		method: 'GET',
		headers: {
			Cookie: cookies().toString()
		}
	});

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
