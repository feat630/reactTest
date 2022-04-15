import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { socketClient } from '../App'



const GetPost = () => {
	const [read, setRead] = useState([]);

	const fetchDatas = async() => {
		const reponse = await axios.get('http://localhost:4000/get-post/');
		setRead(reponse.data);
		console.log('render');
	}

	// const oneDatas = async() => {
	// 	const reponse = await axios.get('http://localhost:4000/get-one');
	// 	setRead(reponse.data);
	// 	console.log('render');
	// }

	useEffect( ()=> {
		fetchDatas();
		socketClient.on("reload post", () => {
			fetchDatas();
		});
	},[]);

	// useEffect( ()=> {
	// 	const interval = setInterval(() => {
	// 		fetchDatas();
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// },[])

	// const url = `/myPiscine/view/${index}-${i}`;



	return (
		<>
		<table className="user-page">
			<thead>
				<tr>
					<th>글번호</th>
					<th>글제목</th>
					<th>작성자</th>
					<th>작성일</th>
				</tr>
			</thead>
			<tbody>
				{read.map((v, i) => (				
				<tr>
					<td key={v.board_num+'number'}>{v.board_num}</td>
					<td key={v.board_num+'title'}>
						<Link to={`/read/${v.board_num}`}>
							{v.board_title}[{v.board_reply_count}]
						</Link>
					</td>
					<td key={v.board_num+'owner'}>{v.board_owner}</td>
					<td key={v.board_num+'date'}>{v.board_date}</td>
				</tr>	
				))
			}
			</tbody>
		</table>
		<Link to="/write"><button>글쓰기</button></Link>
		</>
	)
}

export default GetPost;



