export default function Input({
	label,
	name,
	Icon,
	type,
	placeholder,
}) {
	return (
		<div>
			<label htmlFor={label} className='text-xs mb-[2px] text-dark-gray'>
				{label}
			</label>
			<div className='flex items-center [&:has(input:focus)]:border-purple border border-border rounded-lg'>
				<div className='m-4'>
					<Icon />
				</div>
				<input
					className='outline-none w-full'
					id={label}
					name={name}
					type={type}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
