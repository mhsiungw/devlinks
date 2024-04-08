export default function Input({
	label,
	name,
	defaultValue,
	Icon,
	type,
	placeholder
}) {
	const renderLabel = () => {
		if (!label) {
			return null;
		}

		return (
			<label htmlFor={name} className='text-xs mb-[2px] text-dark-gray'>
				{label}
			</label>
		);
	};

	return (
		<div>
			{renderLabel()}
			<div className='flex items-center [&:has(input:focus)]:border-purple border border-border rounded-lg p-3 gap-2'>
				{Icon && <Icon />}
				<input
					className='outline-none w-full bg-transparent'
					id={name}
					name={name}
					type={type}
					defaultValue={defaultValue}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
