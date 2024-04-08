'use client';

import Link from 'next/link';

export default function Error({ error }) {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<div>Something went wrong!</div>
			<div>Reason: {error.message}</div>
			<Link className='text-bold text-blue-500' href='/profile/new'>
				Get a new profile?
			</Link>
		</div>
	);
}
