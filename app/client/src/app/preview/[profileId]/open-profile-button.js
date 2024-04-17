'use client';

import { openProfile } from '@/lib/actions/profile';
import { showToast } from '@/components/toast/utils';
import { getClientUrl } from '@/lib/utils';
import Button from '@/components/button';

export default function OpenProfileButton({ profileId }) {
	return (
		<Button
			onClick={async () => {
				const openProfileId = await openProfile(profileId);

				await navigator.clipboard.writeText(
					// TODO: add getBaseURL
					`${getClientUrl()}/${openProfileId}`
				);

				showToast(null, 'The linked has been copied to clipboard');
			}}
		>
			Share Link
		</Button>
	);
}
