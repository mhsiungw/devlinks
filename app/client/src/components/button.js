export default function Button({ children }) {
	return (
		<button
			type='submit'
			className='bg-purple w-full text-white rounded-lg py-3'
		>
			<span className='font-bold'>{children}</span>
		</button>
	);
}
