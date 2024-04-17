'use client';

import { openProfile } from '@/lib/actions/profile';
import { showToast } from '@/components/toast/utils';
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

				showToast(null, 'The linked has been copied to clipboard');
			}}
		>
			Share Link
		</Button>
	);
}
