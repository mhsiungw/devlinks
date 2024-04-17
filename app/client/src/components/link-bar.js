import Link from 'next/link';
import IconArrowRight from '@/images/icon-arrow-right.svg';
import { getIconConfig } from '@/lib/utils';

export default function LinkBar({ type, url }) {
	const { Icon, title, color } = getIconConfig(type);

	return (
		<div
			style={{ backgroundColor: color }}
			className={`flex justify-between text-white p-[14px] rounded-lg`}
		>
			<div className='flex gap-1'>
				{Icon && <Icon className='fill-white' />}
				<span className='text-xs'>{title}</span>
			</div>
			<Link href={url} prefetch={false}>
				<IconArrowRight />
			</Link>
		</div>
	);
}
