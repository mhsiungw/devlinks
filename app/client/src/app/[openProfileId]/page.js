import 'server-only';
import Image from 'next/image';
import LinkBar from '@/components/link-bar';
import { getAPIUrl } from '@/lib/utils';

export default async function OpenProfile(props) {
	const { openProfileId } = props.params;

	const res = await fetch(`${getAPIUrl()}/open_profile/${openProfileId}`);

	const { data } = await res.json();

	if (!data) {
		throw new Error(`Profile ID-${openProfileId} doesn't exist`);
	}

	const { links, firstName, lastName, email, avatarUrl } = data;

	return (
		<div className='h-full p-6 relative'>
			<div className='absolute top-0 left-0 rounded-b-3xl bg-purple h-1/3 w-full -z-50' />
			<div className='max-w-96 relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
				<div className='bg-white shadow-lg p-14 rounded-2xl space-y-10'>
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
						{links.map(({ type, url }) => (
							<div key={type}>
								<LinkBar type={type} url={url} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
