'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import { getAPIUrl } from '@/lib/utils';

const publicPaths = /^\/login$|^\/profile$|^\/\d$/;

export default function AuthModal() {
	const dialogRef = useRef();
	const pathName = usePathname();
	const isAuthModalOpen = useAppSelector(({ authModal }) => authModal.open);

	useEffect(() => {
		fetch(`${getAPIUrl()}/auth/login/pin`, {
			credentials: 'include'
		})
			.then(res => res.json())
			.then(({ data: { isAuthenticated } }) => {
				if (!isAuthenticated && !publicPaths.test(pathName)) {
					return dialogRef.current.showModal();
				}

				if (!isAuthenticated && isAuthModalOpen) {
					return dialogRef.current.showModal();
				}

				return dialogRef.current.close();
			});
	}, [isAuthModalOpen, pathName]);
	return (
		<dialog ref={dialogRef} className='rounded-lg'>
			<div className='p-5'>
				<Link href='/signup'>
					<span className='text-purple font-bold'>Sign up</span>
				</Link>{' '}
				or&nbsp;
				<Link href='/login'>
					<span className='text-purple font-bold'>login</span>
				</Link>
				&nbsp;before creating your own link profile!
			</div>
		</dialog>
	);
}
