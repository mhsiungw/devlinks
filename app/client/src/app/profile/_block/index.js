'use client';

import { useRef, useState } from 'react';
import update from 'immutability-helper';
import Image from 'next/image';
import { set } from 'lodash';
import MockupIllustrationPhone from '@/images/illustration-phone-mockup.svg';
import LinkBar from '@/components/link-bar';
import Button from '@/components/button';
import EditLinkBlock from '@/app/profile/_block/editLink';
import EditDetail from '@/app/profile/_block/editDetail';
import { useAppSelector } from '@/lib/store/hooks';
import { updateProfile } from '@/lib/actions/profile';

export default function ProfileEditBlock({ profile }) {
	const formRef = useRef();
	const tab = useAppSelector(state => state.tab);
	const [profileState, setProfileState] = useState(profile);

	const { links, profileId, firstName, lastName, email, avatarUrl } =
		profileState;

	const handleFormChange = () => {
		const newState = new FormData(formRef.current)
			.entries()
			.filter(d => !d[0].includes('$ACTION_'))
			.reduce((acc, [key, value]) => {
				if (key === 'avatarFile' && value.size) {
					acc.avatarUrl = URL.createObjectURL(value);
				} else {
					set(acc, key, value);
				}

				return acc;
			}, {});

		setProfileState(prev =>
			update(prev, {
				$merge: newState
			})
		);
	};

	return (
		<div className='flex flex-1'>
			<div className='flex gap-6 w-full'>
				<div className='min-w-[38%] bg-white rounded-xl relative'>
					<div className='absolute top-0 right-0 bottom-0 left-0 overflow-auto flex items-center justify-center'>
						<div className='relative'>
							<div className='absolute left-1/2 -translate-x-1/2 top-[64px] bg-white rounded-full overflow-hidden'>
								<Image
									className='w-24 h-24 object-cover'
									width='96'
									height='96'
									src={avatarUrl}
									alt='avatar'
								/>
							</div>
							<div className='absolute left-1/2 -translate-x-1/2 top-[182px] text-center w-52 bg-white space-x-1'>
								<span>{firstName}</span>
								<span>{lastName}</span>
							</div>
							<div className='absolute left-1/2 -translate-x-1/2 top-[208px] text-center w-52 bg-white'>
								{email}
							</div>
							{links.map(({ type, url }, index) => (
								<div
									key={type}
									style={{ top: 278 + index * 63 }}
									className='absolute left-9 w-60'
								>
									<LinkBar type={type} url={url} />
								</div>
							))}
							<MockupIllustrationPhone />
						</div>
					</div>
				</div>
				<div className='flex-1 relative'>
					<div className='bg-white p-10 absolute top-0 bottom-0 left-0 right-0 overflow-y-auto'>
						<form
							noValidate
							action={updateProfile.bind(null, profileId)}
							ref={formRef}
							onChange={handleFormChange}
						>
							<div className='flex flex-col gap-24'>
								<div>
									<div
										className={`${
											tab === 'edit-link'
												? 'block'
												: 'hidden'
										}`}
									>
										<EditLinkBlock
											links={links}
											onChange={setProfileState}
										/>
									</div>

									<div
										className={`${
											tab === 'edit-detail'
												? 'block'
												: 'hidden'
										}`}
									>
										<EditDetail
											profile={{
												firstName,
												lastName,
												email,
												avatarUrl
											}}
										/>
									</div>
								</div>
								<div className='border-t border-border flex justify-end py-10'>
									<div className='w-20'>
										<Button>Save</Button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
