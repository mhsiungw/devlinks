import MockupIllustrationPhone from '@/images/illustration-phone-mockup.svg';
import LinkBlock from './link-bar';

export default function PreviewMockUp({ cards }) {
	return (
		<div className='relative'>
			{cards.map(({ id, type, url }, index) => (
				<div
					key={id}
					style={{ top: 278 + index * 63 }}
					className='absolute left-9 w-60'
				>
					<LinkBlock type={type} url={url} />
				</div>
			))}
			<MockupIllustrationPhone />
		</div>
	);
}
