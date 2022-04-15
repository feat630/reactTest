import { Link } from "react-router-dom";
import GetPost from "./GetPost";

const AdminTable = () => {


	return (
		<>
			<Link to="/">관리자 게시판</Link>
			<GetPost/>
		</>
	)
}

export default AdminTable;
