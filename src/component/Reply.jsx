// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { socketClient } from '../App'
// import { replyDatas } from './GetPost'

// const Reply = ({match}) => {

// 	const [reply, setReply] = useState([]);

// 	const dataInsert = async() => {
// 		await axios.post('http://localhost:4000/insert-reply',{
// 			method:'POST',
// 			data: {'data': [
// 				owner,
// 				content,
// 				num]
// 			},
// 			headers: new Headers()
// 		});
// 		replyDatas();
// 	}

// 	const countInsert = async() => {
// 		await axios.post('http://localhost:4000/add-count-reply',{
// 			method:'POST',
// 			data: {'data': [num]},
// 			headers: new Headers()
// 		});
// 		replyDatas();
// 	}

// 	const replyData = () => {
// 		dataInsert();
// 		countInsert();
// 		socketClient.emit('post')
// 		//react_board테이블의 board_reply_count를 +1 하는 쿼리api
// 	}

// 	const getValue = (e) => {
// 		const { name, value } = e.target;
//     	if(name === 'owner') {
// 			setOwner(value);
// 		} else {
// 			setContent(value);
// 		}
// 	}

// 	useEffect( ()=> {
// 		fetchDatas();
// 		replyDatas();
// 		socketClient.on("reload post", () => {
// 			replyDatas();
// 		});
// 	},[])
	
// 	return (
// 		<>
// 			<hr/>
// 			<form>
// 			<div>이름</div>
// 				<input 
// 					className="owner-input"
// 					type='text'
// 					placeholder='이름'
// 					onChange={getValue}
// 					name='owner'
// 				/>
// 				<div>내용</div>
// 				<input 
// 					className="content-input"
// 					type='text'
// 					placeholder='내용'
// 					onChange={getValue}
// 					name='content'
// 				/>
// 				<br/>
// 			</form>
// 			<button onClick={() => {replyData()}}>write</button>
// 		</>
// 	)
// }

// export default Reply;



