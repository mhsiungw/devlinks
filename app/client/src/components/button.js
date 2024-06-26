'use client';

function Button({ type = 'submit', children, disabled, onClick }) {
	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className='bg-purple w-full text-white rounded-lg py-3 disabled:opacity-75'
		>
			<span className='font-bold'>{children}</span>
		</button>
	);
}

export default Button;
