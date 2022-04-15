//쿼리관련
//분석하고 파일 지우기
// Add todo
app.post('/add-todos', async (req, res) => {
	// value of todo task//전달받은 입력값
	const todo = req.body.todo;
  
	try {
	  // Get and return the maximum value of index_number
	  // if there is no data in the table, return 0
	  const results = await util.promisify(connection.query).bind(connection)(
		`SELECT IFNULL((SELECT index_number FROM todo ORDER BY index_number DESC LIMIT 1) ,0) as max_index_number;`
	  );//max_index_number이 null일때 IFNULL안에 있는 쿼리 실행
	  // Add a new task
	  // Put the contents of the task and the value obtained in the above query + 1024 into VALUES
	  await util.promisify(connection.query).bind(connection)(
		`INSERT INTO todo(todo, index_number) VALUES('${todo}', ${results[0].max_index_number}+1024)`
	  );// 입력한 값과 테이블의 max_index_number+1024의 값을 index_number로 갖는 칼럼 삽입
	  res.redirect('/');
	} catch (e) {
	  res.status(500).send({ e });
	}
  });
  
  // Change order of todo
  app.post('/order-todos/:id', async (req, res) => {
	const id = req.params.id;
	// 링크로 넘어온 id값 저장
	let prevElIndexNumber = req.body.prevElIndexNumber;
	let nextElIndexNumber = req.body.nextElIndexNumber;
	let currElIndexNumber;
	//드랍한 위치의 위,아래의 정보(정렬데이터)를 가져와서 저장함

	if (prevElIndexNumber === undefined) {
	  currElIndexNumber = nextElIndexNumber - 512;
	} else if (nextElIndexNumber === undefined) {
	  currElIndexNumber = prevElIndexNumber + 512;
	//위, 혹은 아래의 정렬데이터가 없다면 + - 512를 한다
	} else {
	  currElIndexNumber = Math.floor((prevElIndexNumber + nextElIndexNumber) / 2);
	}
	//두 데이터 모두 있다면 두 데이터의 합/2를 한 값을 따로 저장한다
  
	try {
	  // Update currElIndexNumber as the index_number of the new task
	  await util.promisify(connection.query).bind(connection)(
		`UPDATE todo SET index_number = ${currElIndexNumber} where id = ${id}`
	  );
  
	  // When index_number overlaps
	  if (
		Math.abs(currElIndexNumber - prevElIndexNumber) <= 1 ||
		Math.abs(currElIndexNumber - nextElIndexNumber) <= 1
	  ) {
		// Get index_number in ascending order from 1~ (= orderedData), then update the table
		const orderedData = await util.promisify(connection.query).bind(connection)(
		  `SELECT *, ROW_NUMBER() OVER (ORDER BY index_number) as orderedData FROM todo;`
		);
		await Promise.all(
		  orderedData.map(async (element) => {
			await util.promisify(connection.query).bind(connection)(
			  `UPDATE todo SET index_number = ${element.orderedData}*1024 where id = ${element.id}`
			);
		  })
		);
	  }
	  res.end();
	} catch (e) {
	  res.status(500).send({ e });
	}
  });
  