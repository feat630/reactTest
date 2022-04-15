import React from 'react'; 
import { Link } from 'react-router-dom'; 
const Main = () => {

	return (
		<>
			<div>사용자 유형</div>
			<Link to="/user"><button>사용자</button></Link>
			<Link to="/admin"><button>관리자</button></Link>
			<Link to="/dnd"><button>RDB 칸반테스트</button></Link>
			<Link to="/rbd"><button>RDB 리스트테스트</button></Link>
			<Link to="/card"><button>card</button></Link>
			<Link to="/test"><button>Test</button></Link>
			<Link to="/reduceraxios"><button>reducer test</button></Link>
		</>
	)
} 

export default Main;

