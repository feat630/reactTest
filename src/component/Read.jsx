import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { socketClient } from '../App'

const Read = ({match}) => {

	const {index} = useParams();
	const [read, setRead] = useState([]);
	const [owner, setOwner] = useState();
	const [content, setContent] = useState();
	const [num, setNum] = useState();
	const [reply, setReply] = useState([]);

	const fetchDatas = async() => {
		const reponse = await axios.get(`http://localhost:4000/get-one/${index}`);
		setRead(reponse.data);
		setNum(reponse.data[0].board_num);
	}

	const replyDatas = async() => {
		const reponse = await axios.get(`http://localhost:4000/get-reply/${index}`);
		setReply(reponse.data);
		console.log(reply);
	}
	
	const dataInsert = async() => {
		await axios.post('http://localhost:4000/insert-reply',{
			method:'POST',
			data: {'data': [
				owner,
				content,
				num]
			},
			headers: new Headers()
		});
		replyDatas();
		setOwner('');
		setContent('');
	}

	const countInsert = async() => {
		await axios.post('http://localhost:4000/add-count-reply',{
			method:'POST',
			data: {'data': [num]},
			headers: new Headers()
		});
		replyDatas();
	}

	const replyData = () => {
		dataInsert();
		countInsert();
		socketClient.emit('post')
		//react_board테이블의 board_reply_count를 +1 하는 쿼리api
	}

	const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'owner') {
			setOwner(value);
		} else {
			setContent(value);
		}
	}

	useEffect( ()=> {
		fetchDatas();
		replyDatas();
		socketClient.on("reload post", () => {
			replyDatas();
		});
	},[])
	
	return (
		<>
		<Link to="/">Home</Link>
			{read.map((v, i) => (
				<table>
					<tbody>
					<tr>
						<td colSpan='3' key={v+i}>제목: {v.board_title}</td>
						
					</tr>
					<tr>
					<td key={v+i}>글쓴이: {v.board_owner}</td>
					<td key={v+i+v}>날짜: {v.board_date}</td>
					<td key={v+v+i}>글번호: {v.board_num}</td>
					</tr>
					<tr>
					<td colSpan='3' key={v+v+v+i}>내용: {v.board_content}</td>
					</tr>
					</tbody>
				</table>
				))
			}

			<hr/>
			<form>
			<div>이름</div>
				<input 
					className="owner-input"
					type='text'
					placeholder='이름'
					onChange={getValue}
					name='owner'
				/>
				<div>내용</div>
				<input 
					className="content-input"
					type='text'
					placeholder='내용'
					onChange={getValue}
					name='content'
				/>
				
				<br/>
			</form>
			<button onClick={() => {replyData()}}>write</button>
			<hr/>
			<div>댓글목록</div>
			{reply.map((v, i) => (
				<table>
					<tbody>
					<tr>
						<td colSpan='2' key={v+i}>내용: {v.reply_content}</td>
						
					</tr>
					<tr>
					<td key={v+i}>글쓴이: {v.reply_owner}</td>
					<td key={v+i+v}>날짜: {v.reply_date}</td>
					</tr>
					</tbody>
				</table>
				))
			}
		</>
	)
}

export default Read;



