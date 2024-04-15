'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, onClick }) {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			type='submit'
			onClick={onClick}
			className='bg-purple w-full text-white rounded-lg py-3 disabled:opacity-75'
		>
			<span className='font-bold'>{children}</span>
		</button>
	);
}
