import update from 'immutability-helper';
import { useCallback } from 'react';
import LinkForm from '@/components/link-form';
import { uniqueId } from 'lodash';
import DraggableContainer from '@/components/draggable/draggable-container';

export default function EditLinkBlock({ links = [], onChange }) {
	const addLink = useCallback(() => {
		onChange(prevProfile => {
			// TODO: make it easy to debug
			if (prevProfile.length === 5) {
				return prevProfile;
			}

			return update(prevProfile, {
				links: { $push: [{ id: uniqueId(), url: '' }] }
			});
		});
	}, [onChange]);

	const removeLink = useCallback(
		index => {
			onChange(prevProfile =>
				update(prevProfile, {
					links: { $splice: [[index, 1]] }
				})
			);
		},
		[onChange]
	);

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			onChange(prevProfile => {
				const dragged = prevProfile.links[dragIndex];

				return update(prevProfile, {
					links: {
						$splice: [
							[dragIndex, 1],
							[hoverIndex, 0, dragged]
						]
					}
				});
			});
		},
		[onChange]
	);

	const renderForm = useCallback(
		// TODO: fix duplicate id
		({ id, type, url }, index) => (
			<LinkForm
				key={id}
				id={id}
				type={type}
				url={url}
				index={index}
				moveCard={moveCard}
				onRemove={removeLink}
			/>
		),
		[moveCard, removeLink]
	);

	return (
		<>
			<div className='mb-10 space-y-2'>
				<h2 className='text-3xl text-dark-gray'>
					Customize your links
				</h2>
				<div className='text-grey text-base'>
					Add/edit/remove links below and then share all your profiles
					with the world!
				</div>
			</div>
			<div className='mb-6'>
				<button
					className='w-full text-purple font-medium rounded-lg p-3 border border-purple'
					disabled={links.length === 5}
					onClick={addLink}
				>
					<span>+ Add new link</span>
				</button>
			</div>

			<div className='space-y-6'>
				<DraggableContainer>
					{links.map((data, index) => renderForm(data, index))}
				</DraggableContainer>
			</div>
		</>
	);
}
