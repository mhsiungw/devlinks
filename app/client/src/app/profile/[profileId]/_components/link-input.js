import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import IconDragAndDrop from '@/images/icon-drag-and-drop.svg';
import IconLink from '@/images/icon-link.svg';
import Input from '@/components/input';

const dndType = 'draggable-item';

export default function LinkInput({
	id,
	type,
	url,
	index,
	moveCard,
	onRemove
}) {
	const ref = useRef(null);
	const iconRef = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: dndType,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 3;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			// eslint-disable-next-line no-param-reassign
			item.index = hoverIndex;
		}
	});
	const [{ isDragging }, drag, preview] = useDrag({
		type: dndType,
		item: () => ({ index }),
		collect: monitor => ({
			isDragging: monitor.isDragging()
		})
	});
	drag(iconRef);
	drop(ref);
	preview(ref);

	return (
		<div
			ref={ref}
			className={`${isDragging ? 'opacity-0' : 'opacity-100'}`}
		>
			<div
				data-handler-id={handlerId}
				className='bg-light-grey text-grey p-5 space-y-3'
			>
				<div className='flex justify-between'>
					<div className='flex items-center gap-2'>
						<div ref={iconRef} className='cursor-move'>
							<IconDragAndDrop />
						</div>
						Link#{index + 1}
					</div>
					<div
						className='cursor-pointer'
						onClick={() => onRemove(index)}
					>
						Remove
					</div>
				</div>
				<input
					readOnly
					className='hidden'
					type='text'
					name={`links[${index}].id`}
					value={id}
				/>
				<Input
					label='Platform'
					name={`links[${index}].type`}
					type='text'
					defaultValue={type}
					placeholder='e.g. alex@email.com'
				/>
				<Input
					label='Link'
					name={`links[${index}].url`}
					Icon={IconLink}
					defaultValue={url}
					placeholder='e.g. https://www.github.com/johnappleseed'
					type='text'
				/>
			</div>
		</div>
	);
}
