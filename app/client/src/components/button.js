'use client';

export default function Button({ children, onClick }) {
	return (
		<button
			type='submit'
			onClick={onClick}
			className='bg-purple w-full text-white rounded-lg py-3'
		>
			<span className='font-bold'>{children}</span>
		</button>
	);
}
