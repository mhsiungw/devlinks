'use client';

import { useEffect, useRef, useState } from 'react';
import update from 'immutability-helper';
import { set } from 'lodash';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';
import Button from '@/components/button';
import { showToast } from '@/components/toast/utils';
import EditLinkBlock from '@/app/profile/[profileId]/_block/editLink';
import EditDetail from '@/app/profile/[profileId]/_block/editDetail';
import Illustration from '@/app/profile/[profileId]/_components/illustration';
import { getImageDimension, getBase64, getStorageProfile } from '@/lib/utils';

const defaultProfile = {
	profileId: null,
	firstName: null,
	lastName: null,
	email: null,
	avatarUrl: null,
	links: []
};

export default function Profile({ profile: _profile = defaultProfile }) {
	const formRef = useRef();
	const tab = useAppSelector(state => state.tab);
	const router = useRouter();

	const [profile, setProfile] = useState(_profile);

	const { links, firstName, lastName, email, avatarUrl } = profile;

	useEffect(() => {
		const storageProfile = getStorageProfile();

		if (storageProfile) {
			setProfile(storageProfile);
		}
	}, []);

	const handleFormChange = async e => {
		if (e.target.id === 'avatarFile') {
			const { width, height } = await getImageDimension(
				e.target.files[0]
			);

			if (width > 1024 || height > 1024) {
				const dt = new DataTransfer();

				if (profile?.avatarFile) {
					dt.items.add(profile?.avatarFile);
				}

				e.target.value = '';

				e.target.files = dt.files;

				showToast(null, 'Image is too big!');
				return;
			}
		}

		const newState = new FormData(formRef.current)
			.entries()
			.filter(d => !d[0].includes('$ACTION_'))
			.reduce((acc, [key, value]) => {
				if (e.target.id === 'avatarFile' && key === 'avatarFile') {
					acc.avatarFile = value;
					acc.avatarUrl = URL.createObjectURL(value);
				} else {
					set(acc, key, value);
				}

				return acc;
			}, {});

		setProfile(prev =>
			update(prev, {
				$merge: newState
			})
		);
	};

	return (
		<div className='flex flex-1 gap-6 w-full'>
			<div className='basis-[38%] hidden md:block'>
				<Illustration
					avatarUrl={avatarUrl}
					firstName={firstName}
					lastName={lastName}
					email={email}
					links={links}
				/>
			</div>
			<div className='flex-1 relative'>
				<div className='bg-white p-10 absolute top-0 bottom-0 left-0 right-0 overflow-y-auto'>
					<form
						noValidate
						ref={formRef}
						onInput={handleFormChange}
						onSubmit={e => e.preventDefault()}
					>
						<div className='flex flex-col gap-24'>
							<div>
								<div
									className={`${
										tab === 'edit-link' ? 'block' : 'hidden'
									}`}
								>
									<EditLinkBlock
										links={links}
										onChange={setProfile}
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
									<Button
										onClick={async () => {
											const newProfile = {
												...profile
											};

											if (
												profile.avatarFile instanceof
													File &&
												profile.avatarFile.size !== 0
											) {
												const imageBase64 =
													await getBase64(
														profile.avatarFile
													);

												set(
													newProfile,
													'avatarFile',
													imageBase64
												);
												set(
													newProfile,
													'avatarUrl',
													imageBase64
												);
											} else {
												set(
													newProfile,
													'avatarFile',
													profile.avatarUrl
												);
											}

											localStorage.setItem(
												'profile',
												JSON.stringify(newProfile)
											);

											router.push('signup');
										}}
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
	);
}
