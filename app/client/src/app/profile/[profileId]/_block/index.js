'use client';

import { useRef, useState } from 'react';
import update from 'immutability-helper';
import { set } from 'lodash';
import Button from '@/components/button';
import EditLinkBlock from '@/app/profile/[profileId]/_block/editLink';
import EditDetail from '@/app/profile/[profileId]/_block/editDetail';
import { useAppSelector } from '@/lib/store/hooks';
import { updateProfile } from '@/lib/actions/profile';
import Illustration from '../_components/illustration';

export default function ProfileEditBlock({ profile: _profile }) {
	const formRef = useRef();
	const tab = useAppSelector(state => state.tab);

	const [profile, setProfile] = useState(_profile);

	const { links, profileId, firstName, lastName, email, avatarUrl } = profile;

	const handleFormChange = e => {
		const newState = new FormData(formRef.current)
			.entries()
			.filter(d => !d[0].includes('$ACTION_'))
			.reduce((acc, [key, value]) => {
				if (
					e.target.id === 'avatarFile' &&
					key === 'avatarFile' &&
					value.size
				) {
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
			<div className='basis-[38%]'>
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
						action={updateProfile.bind(null, profileId)}
						ref={formRef}
						onChange={handleFormChange}
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
									<Button>Save</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
