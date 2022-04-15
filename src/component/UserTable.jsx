import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import GetPost from "./GetPost";

const UserTable = () => {


	return (
		<>
			<Link to="/">유저게시판</Link>
			<GetPost/>
		</>
	)
}

export default UserTable;