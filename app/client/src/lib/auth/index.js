'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAPIUrl } from '../utils';
import { useAppDispatch } from '../store/hooks';
import { updateUser } from '../store/features/auth/authSlice';

export default function Auth({ children }) {
	const pathName = usePathname();
	const dispatch = useAppDispatch();

	useEffect(() => {
		fetch(`${getAPIUrl()}/auth/login/pin`, { credentials: 'include' })
			.then(res => res.json())
			.then(({ data: { user } }) => {
				dispatch(updateUser({ user }));
			});
	}, [pathName, dispatch]);

	return children;
}
