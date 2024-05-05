import 'server-only';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import LinkBar from '@/components/link-bar';
import { getAPIUrl } from '@/lib/utils';
import { redirect } from 'next/navigation';
import OpenProfileButton from './open-profile-button';

export default async function Preview(props) {
	const { profileId } = props.params;

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

	const { links, firstName, lastName, email, avatarUrl } = data;

	return (
		<div className='h-full md:p-6 relative'>
			<div className='absolute top-0 left-0 rounded-b-3xl md:bg-purple h-1/3 w-full -z-50' />
			<div className='flex justify-between bg-white p-6 rounded-xl md:mb-20'>
				<div>
					<Link href={`/profile/${profileId}`}>
						<button className='w-full text-purple font-medium rounded-lg p-3 border border-purple'>
							<span>Back to Editor</span>
						</button>
					</Link>
				</div>
				<div className='w-32'>
					<OpenProfileButton profileId={profileId} />
				</div>
			</div>
			<div className='bg-white shadow-lg md:max-w-96 p-14 rounded-2xl md:mx-auto space-y-10'>
				<div className='flex flex-col items-center justify-center'>
					<Image
						className='w-24 h-24 object-cover rounded-full mb-6'
						width='96'
						height='96'
						src={avatarUrl}
						alt='avatar'
					/>

					<div className='bg-white space-x-1'>
						<span>{firstName}</span>
						<span>{lastName}</span>
					</div>
					<div className='bg-white'>{email}</div>
				</div>
				<div className='space-y-5'>
					{links?.map(({ type, url }) => (
						<div key={type}>
							<LinkBar type={type} url={url} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
