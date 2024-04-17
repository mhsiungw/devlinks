'use client';

// how to set value after item click
// how to set defautValue & display value
// how to style the parent component
// how to onBlur

import { useEffect, useState, useRef } from 'react';
import { range } from 'lodash';
import { getIconConfig } from '@/lib/utils';

const defaultOptions = range(1, 15).map(type => {
	const { Icon, title } = getIconConfig(type);
	return {
		Icon,
		label: title,
		value: type
	};
});

export default function Select({
	name = '',
	defaultValue = defaultOptions[0].value,
	options = defaultOptions
}) {
	const inputRef = useRef(null);
	const [hidden, setHidden] = useState(true);
	const [
		{ Icon: DisplayIcon, label: displayLable },
		setInternalDisplayValue
	] = useState(options.find(o => +o.value === +defaultValue));
	const [internalValue, setInternalValue] = useState(defaultValue);

	useEffect(() => {
		document
			.getElementById(name)
			.dispatchEvent(new Event('input', { bubbles: true }));
	}, [name, internalValue]);

	return (
		<div
			tabIndex='1'
			className='w-full h-ful relative'
			onBlur={() => setHidden(true)}
		>
			<label htmlFor={name} className='text-xs mb-[2px] text-dark-gray'>
				Platform
			</label>
			<div
				className='flex bg-white items-center gap-3 p-3 border'
				onClick={() => (hidden ? setHidden(false) : setHidden(true))}
			>
				{DisplayIcon && <DisplayIcon />}
				{displayLable && displayLable}
			</div>
			<div
				className={`
					absolute 
					bg-white 
					z-50 
					w-full 
					overflow-scroll
					h-64
					${hidden && 'hidden'}
				`}
			>
				<ol className='divide-y divide-border'>
					{options.map(({ Icon, label, value }) => (
						<li
							className='hover:bg-grey flex items-center gap-3 p-3'
							key={value}
							onClick={() => {
								setInternalValue(value);
								setInternalDisplayValue({ Icon, label });
								setHidden(true);
							}}
						>
							{Icon && <Icon />}
							{label}
						</li>
					))}
				</ol>
			</div>
			<input
				aria-hidden
				readOnly
				ref={inputRef}
				id={name}
				name={name}
				type='text'
				value={internalValue}
				className='absolute top-0 bottom-0 left-0 right-0 -z-50 opacity-0'
			/>
		</div>
	);
}
