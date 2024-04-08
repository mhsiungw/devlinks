'use client';

import { useRef, useState } from 'react';
import update from 'immutability-helper';
import Image from 'next/image';
import MockupIllustrationPhone from '@/images/illustration-phone-mockup.svg';
import LinkBar from '@/components/link-bar';
import Button from '@/components/button';
import EditLinkBlock from '@/app/profile/_block/editLink';
import EditDetail from '@/app/profile/_block/editDetail';
import { useAppSelector } from '@/lib/store/hooks';
import { updateProfile } from '@/lib/actions/profile';

// TODO: mv to packages/utils
function chunk(array, size) {
	// 宣告新陣列
	const chunked = [];

	// 創建一個迴圈，從 0 的 Math.ceil(array.length / size)
	for (let i = 0; i < Math.ceil(array.length / size); i += 1) {
		const start = i * size;
		const end = start + size;

		// 使用 slice 把陣列區塊取出來並 push 到新陣列
		chunked.push(array.slice(start, end));
	}

	// 返回新陣列
	return chunked;
}

export default function ProfileEditBlock({ profile }) {
	const formRef = useRef();
	const tab = useAppSelector(state => state.tab);
	const [profileState, setProfileState] = useState(profile);

	const { links, profileId, firstName, lastName, email, avatarUrl } =
		profileState;

	const handleFormChange = () => {
		const formData = new FormData(formRef.current).entries();

		if (tab === 'edit-link') {
			const newLinks = chunk(
				Array.from(formData)
					.filter(d => !d[0].includes('$'))
					.map(([, value]) => value),
				2
			).map(([type, url]) => ({ type, url }));

			setProfileState(prevProfile =>
				update(prevProfile, {
					links: {
						$set: newLinks
					}
				})
			);
		}

		if (tab === 'edit-detail') {
			const newProfile = Array.from(formData).reduce(
				(acc, [key, value]) => {
					acc[key] = value;
					return acc;
				},
				{}
			);

			setProfileState(prevProfile =>
				update(prevProfile, {
					$merge: newProfile
				})
			);
		}
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
							ref={formRef}
							onSubmit={e => {
								e.preventDefault();
							}}
							onChange={handleFormChange}
						>
							<div className='flex flex-col gap-24'>
								<div>
									{tab === 'edit-link' ? (
										<EditLinkBlock
											links={links}
											onChange={setProfileState}
										/>
									) : (
										<EditDetail
											profile={{
												firstName,
												lastName,
												email
											}}
										/>
									)}
								</div>
								<div className='border-t border-border flex justify-end py-10'>
									<div className='w-20'>
										<Button
											onClick={() =>
												updateProfile(profileId, {
													firstName,
													lastName,
													email,
													links
												})
											}
										>
											Save
										</Button>
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
