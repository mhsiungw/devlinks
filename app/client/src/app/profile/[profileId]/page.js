import 'server-only';
import { cookies } from 'next/headers';
import ProfileEditBlock from '@/app/profile/_block';

export default async function ProfileEdit(props) {
	const { profileId } = props.params;

	const res = await fetch(`${process.env.APP_API_URL}/profile/${profileId}`, {
		method: 'GET',
		headers: {
			Cookie: cookies().toString()
		}
	});

	const { data } = await res.json();

	if (!data) {
		throw new Error(`Profile ID-${profileId} doesn't exist`);
	}

	return <ProfileEditBlock profile={data} />;
}
