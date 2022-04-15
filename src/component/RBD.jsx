import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export const Rbd = () => {

	const finalSpaceCharacters = [ 
		{ id: '1', name: '1 Goodspeed' },
		{ id: '2', name: '2 Goodspeed' },
		{ id: '3', name: '3 Goodspeed' },
		{ id: '4', name: '4 Goodspeed' },
		{ id: '5', name: '5 Goodspeed' },
		{ id: '6', name: '6 Goodspeed' },
		{ id: '7', name: '7 Goodspeed' },
		{ id: '8', name: '8 Goodspeed' },
		{ id: '9', name: '9 Goodspeed' },
		{ id: '10', name: '10 Goodspeed' },
	]

	const [characters, updateCharacters] = useState(finalSpaceCharacters);

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const items = Array.from(characters);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		console.log(items)
		updateCharacters(items);	
		
	}

	return (
		<>
			<Link to="/">RBD테스트</Link>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='charecters'>
					{ (provided) => (
						<ul className="charecters" {...provided.droppableProps} ref={provided.innerRef}>
							{characters.map(({id, name}, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
									{(provided) => (
										<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										{name}
										</li>
									)}
									</Draggable>)})}
						{provided.placeholder}			
						</ul>	
					)}
				</Droppable>
			</DragDropContext>
			<div>DRAG LIST</div>
		</>
	)
} 

export default Rbd;
