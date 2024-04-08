import Link from 'next/link';

export default function Profile() {
	return (
		<div>
			<Link href={`/profile/${1}`}>Profile 1</Link>
		</div>
	);
}
