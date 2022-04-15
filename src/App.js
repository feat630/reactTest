import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminTable from './component/AdminTable';
import Main from './component/Main'
import Read from './component/Read';
import UserTable from './component/UserTable';
import Write from './component/Write';
import Dnd from './component/Dnd'
import io from "socket.io-client";
import Rbd from './component/RBD';
import Container from './component/Container'

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Test from './component/Test';
import ReducerAxios from './component/ReducerAxios';

export const socketClient = io("http://localhost:3001", {transports: ['websocket']});

socketClient.on("connect", () => {
	console.log('socket1 connect'); 
	// socketClient.emit('post')
	// console.log('post complete')
  });





function App() {
	
  	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main/>}></Route>
					<Route path="/user" element={<UserTable/>}></Route>
					<Route path="/admin" element={<AdminTable/>}></Route>
					<Route path="/write" element={<Write/>}></Route>
					<Route path="/read/:index" element={<Read/>}></Route>
					<Route path="/dnd" element={<Dnd/>}></Route>
					<Route path="/rbd" element={<Rbd/>}></Route>
					<Route path="/card" element={<Container/>}></Route>
					<Route path="/test" element={<Test/>}></Route>
					<Route path="/reduceraxios" element={<ReducerAxios/>}></Route>
					ReducerAxios
				</Routes>
			</BrowserRouter>
			<div className='cc'>익스프레스 연동테스트</div>

		</div>
	);
}

export default App;
