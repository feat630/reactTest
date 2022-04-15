import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { socketClient } from '../App'

const Write = () => {

	const [owner, setOwner] = useState();
	const [title, setTitle] = useState();
	const [content, setContent] = useState();

	const dataInsert = async() => {

		await axios.post('http://localhost:4000/insert-post',{
			method:'POST',
			data: {'data': [
				owner,
				title, 
				content]
			},
			headers: new Headers()
		});
		console.log('insert');
		socketClient.emit('post')
	}

	const getValue = (e) => {
		const { name, value } = e.target;
    	if(name === 'owner') {
			setOwner(value);
		} else if (name === 'title'){
			setTitle(value);
		} else {
			setContent(value);
		}
	}

	return (
		<>
			<Link to="/">유저 게시판</Link>
			<form>
				<div>이름</div>
				<input 
					className="owner-input"
					type='text'
					placeholder='이름'
					onChange={getValue}
					name='owner'
				/>
				<div>제목</div>
				<input 
					className="title-input"
					type='text'
					placeholder='제목'
					onChange={getValue}
					name='title'
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
			<Link to="/user"><button onClick={() => {dataInsert()}}>write</button></Link>
		</>
	)
}

export default Write;
