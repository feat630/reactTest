//https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
import React, { useState, useCallback, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import produse from 'immer';
import { data, data1 } from './DndDataFile'
import produce from "immer";

import { socketClient } from '../App'
import axios from 'axios';


// const dragReducer = produce((draft, action) => {
// 	switch (action.type) {
// 		case "MOVE": {
// 			draft[action.from] = draft[action.from] || [];
// 			draft[action.to] = draft[action.to] || [];
// 			const [removed] = draft[action.from].splice(action.fromIndex, 1);//items배열을 복사해온 draft에서 원래인덱스값(fromIndex)를 지운다
// 		  // console.log([removed]+'1')
// 			draft[action.to].splice(action.toIndex, 0, removed);
// 		  return;
// 		}
// 	}
//   });

  function reducer(state, action) {
	switch (action.type) {
		case "MOVE": {
			console.log('원래 위치: '+action.from)
			console.log('이동한 위치: '+action.to)
			console.log('원래 탭: '+action.fromIndex)
			console.log('이동한 탭: '+action.toIndex)
			console.log(action)

			// (action.from).splice(action.fromIndex, 1);//items배열을 복사해온 draft에서 원래인덱스값(fromIndex)를 지운다
			// action.to.splice(action.toIndex, 0, (action.from).splice(action.fromIndex, 1));
		  return{
			// loading: false,
			// data: action.data,
			// error: null
		  };
		}
		case 'DATA':
			return {
			  	data1: action.data1,
				data2:action.data2
			};

	//   case "MOVE": {
	// 	  return{
	// 		  from: action.from,
	// 		  to: action.to,
	// 		  fromIndex:action.fromIndex,
	// 		  toIndex:action.toIndex,
	// 		  removed:action.from.splice(action.fromIndex, 1),
	// 		  add:action.to.splice(action.toIndex, 0, action.from.splice(action.fromIndex, 1))
	// 	  }
	// 	}
	  default:
		throw new Error(`Unhandled action type: ${action.type}`);
	}
  }

const Dnd = () => {

	
	const [state, dispatch] = useReducer(reducer, {
		
	  });
	
	//   const [state2, dispatch2] = useReducer(dragReducer, {
	// 	item: null
	//   });

	const fetchDatas = async() => {
		try {
		  const response = await axios.get(
			'http://localhost:4000/dnd'
		  );
		  const response2 = await axios.get(
			'http://localhost:4000/dnd2'
		  );
		  dispatch({ type: 'DATA', data1:response.data, data2: response2.data });
		} catch (e) {
		  dispatch({ type: 'ERROR', error: e });
		}
	}

	// const listChange = async() => {
		
	// }

	// const fetchDatas2 = async() => {
	// 	try {
	// 	  const response2 = await axios.get(
	// 		'http://localhost:4000/dnd2'
	// 	  );
	// 	  dispatch({ type: 'DATA2', data: response2.data });
	// 	} catch (e) {
	// 	  dispatch({ type: 'ERROR', error: e });
	// 	}
	// }



	useEffect( ()=> {
		fetchDatas();
		// fetchDatas2();
		socketClient.on("reload post", () => {
			fetchDatas();
			// fetchDatas2();
			console.log('socket')
		});
	},[]);

	const onDragEnd = useCallback((result) => {
		if (result.reason === "DROP") {
		  if (!result.destination) {
			return;
		  }
		  dispatch({
			type: "MOVE",
			from: result.source.droppableId,
			to: result.destination.droppableId,
			fromIndex: result.source.index,
			toIndex: result.destination.index,
			});
			axios.post('http://localhost:4000/list-sort',{
				method:'POST',
				data: {'data': [
					result.source.droppableId,
					result.destination.droppableId,
					result.draggableId]
				}});
			axios.post('http://localhost:4000/re-sort',{
				method:'POST',
				data: {'data': [
					result.source.droppableId,
					result.destination.droppableId,
					result.draggableId]
				}});
				axios.post('http://localhost:4000/select-tmp',{
					method:'POST',
					data: {'data': [
						result.source.droppableId,
						result.destination.droppableId,
						result.draggableId,
						result.destination.index]
					}});
				// console.log('두번던져지나 테스트')
				axios.post('http://localhost:4000/delete-tmp',{
					method:'POST',
					data: {'data': [
						result.source.droppableId,
						result.destination.droppableId,
						result.draggableId,
						result.destination.index]
					}});
		  socketClient.emit('post')
		  console.log(result)
		}
	  }, []);

	  const { data1:users, data2:users2  } = state;
	//   console.log(users)
	//   console.log(users2)

	//   if (error) return <div>에러가 발생했습니다</div>;
	//   if (!users) return null;

	return (
		<>
			<Link to="/">RBD테스트</Link>
			
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='1' type="PERSON">
					{ (provided, snapshot) => (
						<div className="board" {...provided.droppableProps} ref={provided.innerRef}>
							{users?.map((user, index) => {
								return (
									<Draggable key={user.id} draggableId={user.id} index={index}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										{user.name}/{user.sort_num}/{user.list}
										</div>
									)}
									</Draggable>)})}
						{provided.placeholder}			
						</div>	
					)}
				</Droppable><br/>
				<Droppable droppableId="2" type="PERSON">
					{ (provided, snapshot) => (
						<div className="board" {...provided.droppableProps} ref={provided.innerRef}>
							{users2?.map((user, index) => {
								return (
									<Draggable key={user.id} draggableId={user.id} index={index}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										{user.name}/{user.sort_num}/{user.list}
										</div>
									)}
									</Draggable>)})}
						{provided.placeholder}			
						</div>
					)}
				</Droppable>
			</DragDropContext><br/>
			<div>DRAG LIST</div>
		</>
	)
}  

export default Dnd;
