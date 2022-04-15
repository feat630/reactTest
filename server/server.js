// express 모듈 호출
const express = require('express');
const cors = require('cors');
const app = express();
const maria = require('./maria');
const api = require('./routes/index');
const bodyParser = require('body-parser');
const PORT =process.env.PORT || 4000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => {
	console.log('server socket on'); 
  });
  httpServer.listen(3001);

const whitelist = ["http://localhost:3000"];
const corsOptions = {
	origin: function(origin, callback) {
		if(whitelist.indexOf(origin) !== -1) {
			callback(null. true);
		} else {
			callback(new Error("Not Allowed Origin!"));
		}
	},
};

maria.connect();


app.use(cors());


io.on("connection", (socket) => {
	console.log('server socket connect');
	socket.on('post', () => {
		io.emit('reload post')
		console.log('reload')
	})
  });


// api 처리는 './routes/index'에서 일괄처리
app.use(bodyParser.json());

app.get('/get-post', (req, res)=> 
	maria.query('select board_title, board_owner, date_format(board_date, "%Y-%m-%d %T") as board_date, board_num, board_reply_count from react_board order by board_num desc limit 0, 20', function(err, rows, fields) {
		if(!err) {
			res.send(rows);
		} else {
			console.log("err: " + err);
			res.send(err);
		}
	})
);

app.get('/get-one/:idx', (req, res)=> {
	var idx = req.params;
	maria.query('select board_title, board_owner, date_format(board_date, "%Y-%m-%d %T") as board_date, board_num, board_content from react_board where board_num=?', [idx.idx], function(err, rows, fields) {
		if(!err) {
			res.send(rows);
			console.log(idx);
		} else {
			console.log("err: " + err);
			res.send(err);
			console.log(idx);
		}
	})}
);

app.get('/get-reply/:idx', (req, res)=> {
	var idx = req.params;
	maria.query('select reply_content, reply_owner, date_format(reply_date, "%Y-%m-%d %T") as reply_date from react_reply where board_num=?', [idx.idx], function(err, rows, fields) {
		if(!err) {
			res.send(rows);
			console.log(idx);
		} else {
			console.log("err: " + err);
			res.send(err);
			console.log(idx);
		}
	})}
);

app.get('/count-reply/:idx', (req, res)=> {
	var idx = req.params;
	maria.query('select reply_content, reply_owner, date_format(reply_date, "%Y-%m-%d %T") as reply_date from react_reply where board_num=?', [idx.idx], function(err, rows, fields) {
		if(!err) {
			res.send(rows);
			console.log(idx);
		} else {
			console.log("err: " + err);
			res.send(err);
			console.log(idx);
		}
	})}
);

app.get('/dnd', (req, res)=> 
	maria.query('select id, name, list, sort_num from react_kanban where list = 1 order by sort_num', function(err, rows, fields) {
		if(!err) {
			res.send(rows);
			// console.log(rows[0].id)
		} else {
			console.log("err: " + err);
			res.send(err);
		}
	})
);

app.get('/dnd2', (req, res)=> 
	maria.query('select id, name, list, sort_num from react_kanban where list = 2 order by sort_num', function(err, rows, fields) {
		if(!err) {
			res.send(rows);
		} else {
			console.log("err: " + err);
			res.send(err);
		}
	})
);

app.post('/insert-post', (req, res)=> {
	var board_owner = req.body.data.data[0];
	var board_title = req.body.data.data[1];
	var board_content = req.body.data.data[2];
	
	maria.query('insert into react_board( board_owner, board_title, board_content ) values (?, ?, ?);', [board_owner, board_title, board_content], function(err, rows, fields) {
		if(!err) {
			res.send('success');
			console.log(board_owner);
			console.log(board_title);
			console.log(board_content);
		} else {
			res.send("err: " + err);
		}
	})
});

app.post('/insert-reply', (req, res)=> {
	var reply_owner = req.body.data.data[0];
	var reply_content = req.body.data.data[1];
	var board_num = req.body.data.data[2];
	
	maria.query('insert into react_reply( reply_owner, reply_content, board_num ) values (?, ?, ?);', [reply_owner, reply_content, board_num], function(err, rows, fields) {
		if(!err) {
			res.send('success');
			console.log(reply_owner);
			console.log(reply_content);
			console.log(board_num);
		} else {
			res.send("err: " + err);
		}
	})
});

app.post('/add-count-reply', (req, res)=> {
	var board_num = req.body.data.data[0];
	
	maria.query('UPDATE react_board SET board_reply_count = board_reply_count+1 WHERE board_num = ?;', [board_num], function(err, rows, fields) {
		if(!err) {
			res.send('success');
		} else {
			res.send("err: " + err);
		}
	})
});

app.post('/insert-dnd', (req, res)=> {
	var dnd_text = req.body.data.data[0];
	var dnd_idx = req.body.data.data[1];
	
	maria.query('insert into react_dnd( text, idx_num ) values (?, ?);', [dnd_text, dnd_idx], function(err, rows, fields) {
		if(!err) {
			res.send('success');
			console.log(reply_owner);
			console.log(reply_content);
			console.log(board_num);
		} else {
			res.send("err: " + err);
		}
	})
}); 

app.post('/list-sort', (req, res)=> {
	var ori_listId = req.body.data.data[0];
	var cha_listId = req.body.data.data[1];
	var id = req.body.data.data[2];

	// maria.query('create TEMPORARY  table IF NOT EXISTS tb_tmp select id, lag(sort_num) over (order by sort_num)as before_sort, sort_num, lead(sort_num) over (order by sort_num) as after_sort  from react_kanban where list = 1;', [cha_listId, id], function(err, rows, fields) {
	// 	if(!err) {
	// 		res.send('success');
	// 		console.log(rows)
	// 	} else {
	// 		res.send("err: " + err);
	// 	}
	// })

	// console.log('원래 리스트'+ori_listId);
	// console.log('옮긴 리스트'+cha_listId);
	// console.log('데이터식별번호'+id);
	
	maria.query('update react_kanban set list = ? where id = ?;', [cha_listId, id], function(err, rows, fields) {
		if(!err) {
			res.send('success');
		} else {
			res.send("err: " + err);
		}
	})
}); 
 
app.post('/re-sort', (req, res)=> {
	var ori_listId = req.body.data.data[0];
	var cha_listId = req.body.data.data[1];
	var id = req.body.data.data[2];

	maria.query('create TEMPORARY  table IF NOT EXISTS tb_tmp select id, lag(sort_num) over (order by sort_num)as before_sort, sort_num, lead(sort_num) over (order by sort_num) as after_sort  from react_kanban where list = ?;', [ori_listId], function(err, rows, fields) {
		if(!err) {
			res.send('success');
		} else {
			res.send("err: " + err);
		}
	})
	// query('select * from tb_tmp ;', function(err, rows, fields) {
	// 	if(!err) {
	// 		res.send('success');
	// 		console.log(rows)
	// 	} else {
	// 		res.send("err: " + err);
	// 	}
	// })
}); 

app.post('/select-tmp', (req, res)=> {
	var ori_listId = req.body.data.data[0];
	var cha_listId = req.body.data.data[1];
	var id = req.body.data.data[2];
	var toIndex = req.body.data.data[3];

	maria.query('select * from tb_tmp;', [id], function(err, rows, fields) {
		if(!err) {
			console.log(toIndex)
			res.send('success');
			console.log(rows[toIndex].before_sort)
			console.log(rows[toIndex].sort_num)
			console.log(rows[toIndex].after_sort)
		} else {
			res.send("err: " + err);
		}
	})
});

app.post('/delete-tmp', (req, res)=> {
	var ori_listId = req.body.data.data[0];
	var cha_listId = req.body.data.data[1];
	var id = req.body.data.data[2];
	var toIndex = req.body.data.data[3];

	maria.query('drop TEMPORARY TABLE if exists tb_tmp;', [id], function(err, rows, fields) {
		if(!err) {
			res.send('success');
		} else {
			res.send("err: " + err);
		}
	})
});

// server port 4000 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})
