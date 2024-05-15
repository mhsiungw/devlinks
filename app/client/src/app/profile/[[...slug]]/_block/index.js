'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import update from 'immutability-helper';
import { isArray, mergeWith, set } from 'lodash';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { openAuthModal } from '@/lib/store/features/auth-modal/authModalSlice';
import { updateProfile } from '@/lib/actions/profile';
import Button from '@/components/button';
import { showToast } from '@/components/toast/utils';
import {
	getImageDimension,
	getStorageProfile,
	storeProfileToLocalStorage
} from '@/lib/utils';
import Illustration from '../_components/illustration';
import EditLinkBlock from './editLink';
import EditDetail from './editDetail';

const defaultProfile = {
	profileId: null,
	firstName: null,
	lastName: null,
	email: null,
	avatarUrl: null,
	links: []
};

export default function ProfileEditBlock({
	profile: _profile = defaultProfile
}) {
	const formRef = useRef();
	const tab = useAppSelector(({ profile }) => profile?.tab);
	const user = useAppSelector(({ auth }) => auth?.user);
	const profileId = user?.profileId;
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [profile, setProfile] = useState(_profile);

	const { links, firstName, lastName, email, avatarUrl } = profile;

	const [state, formAction] = useFormState(
		updateProfile.bind(
			null,
			profileId,
			['links', 'firstName', 'lastName', 'email', 'avatarFile'].reduce(
				(formData, key) => {
					if (Array.isArray(profile[key])) {
						formData.append(key, JSON.stringify(profile[key]));
					} else {
						formData.append(key, profile[key]);
					}

					return formData;
				},
				new FormData()
			)
		),
		null
	);

	useEffect(() => {
		if (profileId) {
			router.push(`/profile/${profileId}`);
		}
	}, [profileId, router]);

	useEffect(() => {
		const storageProfile = getStorageProfile();		if (storageProfile) {
			setProfile(() =>
				update(
					{},
					{
						$merge: mergeWith(
							{},
							storageProfile,
							(objVal, srcVal) => {
								if (isArray(objVal) && !objVal.length) {
									return srcVal;
								}

								if (!objVal) {
									return srcVal;
								}
								return objVal;
							}
						)
					}
				)
			);
		}
	}, [_profile]);

	useEffect(() => {
		if (state?.message) {
			showToast(null, state.message);
		}
	}, [state]);

	const handleFormChange = async e => {
		const newState = { ...profile };

		if (e.target.id === 'avatarFile') {
			const { width, height } = await getImageDimension(
				e.target.files[0]
			);

			if (width > 1024 || height > 1024) {
				showToast(null, 'Image is too big!');
				e.target.value = '';
				set(newState, e.target.name, null);
				if (!avatarUrl.includes('s3')) {
					set(newState, 'avatarUrl', null);
				}
			} else {
				set(newState, e.target.name, e.target.files[0]);
				set(
					newState,
					'avatarUrl',
					URL.createObjectURL(e.target.files[0])
				);
			}
		} else {
			set(newState, e.target.name, e.target.value);
		}

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
						action={formAction}
						onInput={handleFormChange}
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
											if (!profileId) {
												storeProfileToLocalStorage(
													profile
												);
												dispatch(openAuthModal());
											}
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
