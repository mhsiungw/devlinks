'use client';

import LogoDevlinksLarge from '@/images/logo-devlinks-large.svg';
import IconLink from '@/images/icon-link.svg';
import IconProfileDetailsHeader from '@/images/icon-profile-details-header.svg';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { toggle } from '@/lib/store/features/profile/profileSlice';

const returnClassName = shouldReturn =>
	shouldReturn
		? `bg-light-purple
text-purple
stroke-purple`
		: null;

export default function ProfileLayout({ children }) {
	const dispatch = useAppDispatch();
	const tab = useAppSelector(state => state?.tab);

	return (
		<div className='p-6 h-full flex flex-col'>
			<div className='pb-6'>
				<div className='flex justify-between p-6 bg-white rounded-xl'>
					<LogoDevlinksLarge />
					<div className='flex'>
						<div className='min-w-28'>
							<button
								className={`w-full text-grey rounded-lg p-3 flex justify-center items-center gap-2 hover:bg-light-purple hover:text-purple hover:stroke-purple font-medium 
									${returnClassName(tab === 'edit-link')}`}
								onClick={() => dispatch(toggle())}
							>
								<IconLink />
								<span>Links</span>
							</button>
						</div>

						<div className='min-w-28'>
							<button
								className={`w-full text-grey rounded-lg p-3 flex justify-center items-center gap-2 hover:bg-light-purple hover:text-purple hover:stroke-purple font-medium ${returnClassName(
									tab === 'edit-detail'
								)}`}
								onClick={() => dispatch(toggle())}
							>
								<IconProfileDetailsHeader />
								<span>Profile Details</span>
							</button>
						</div>
					</div>

					<div className='w-28'>
						<button className='w-full text-purple font-medium rounded-lg p-3 border border-purple'>
							<span>Preview</span>
						</button>
					</div>
				</div>
			</div>
			{children}
		</div>
	);
}
