const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MYSQL 연결 설정
const connection = mysql.createConnection({
        host :'192.168.1.96', // 데이터베이스 호스트
        user : 'alli_admin',     // 데이터베이스 사용자 이름
        port : 3307,
        password : '250801', //데이터베이스 비밀번호
        database : 'alli_core' // 사용할 데이터베이스 이름
});

// 데이터베이스 연결
connection.connect(err => {
        if (err) {
                console.error('MYSQL 연결 오류:', err);
                return;
        }
        console.log('MYSQL에 성공적으로 연결되었습니다');
});

app.get('/', (req, res) => {
        //간단한 쿼리 실행 예제
        connection.query('SELECT * FROM user', (error, results) => {
                if (error) {
                        res.status(500).send('데이터베이스 오류');
                        return;
                }
                res.json(results);
        });
});

app.post('/add-user', (req, res) => {
 const { id, username, email, password} = req.body;
 const query = 'INSERT INTO USER_INFO (id, username, email, password) VALUES (?, ?, ?, ?)';


 connection.query(query, [id, username, email, password], (error, results) => {
        if (error) {
                res.status(500).send('데이터베이스 오류');
                return;
        }
        res.send('사용자가 성공적으로 추가되었습니다.');
 });
});


app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`)
});

