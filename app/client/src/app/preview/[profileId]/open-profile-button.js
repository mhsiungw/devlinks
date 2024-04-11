'use client';

import { openProfile } from '@/lib/actions/profile';
import Button from '@/components/button';

export default function OpenProfileButton({ profileId }) {
	return (
		<Button
			onClick={async () => {
				const openProfileId = await openProfile(profileId);

				navigator.clipboard.writeText(
					// TODO: add getBaseURL
					`http://localhost:3001/${openProfileId}`
				);
			}}
		>
			Share Link
		</Button>
	);
}
