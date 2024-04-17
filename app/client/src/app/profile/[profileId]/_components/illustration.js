import Image from 'next/image';
import LinkBar from '@/components/link-bar';
import MockupIllustrationPhone from '@/images/illustration-phone-mockup.svg';

export default function Illustration({
	avatarUrl,
	firstName,
	lastName,
	email,
	links
}) {
	return (
		<div className='bg-white rounded-xl relative w-full h-full'>
			<div className='absolute top-0 right-0 bottom-0 left-0 overflow-auto flex items-center justify-center'>
				<div className='relative'>
					<div className='absolute left-1/2 -translate-x-1/2 top-[64px] bg-white rounded-full overflow-hidden'>
						{avatarUrl && (
							<Image
								className='w-24 h-24 object-cover'
								width='96'
								height='96'
								src={avatarUrl}
								alt='avatar'
							/>
						)}
					</div>
					<div className='absolute left-1/2 -translate-x-1/2 top-[182px] text-center w-52 bg-white space-x-1'>
						<span>{firstName}</span>
						<span>{lastName}</span>
					</div>
					<div className='absolute left-1/2 -translate-x-1/2 top-[208px] text-center w-52 bg-white'>
						{email}
					</div>
					{links.map(({ id, type, url }, index) => (
						<div
							key={id}
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
	);
}
